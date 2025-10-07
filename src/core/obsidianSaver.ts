import * as JSZip from "jszip";
import { LexType, TokenType } from "./tokenTypes";

// ============= 1. 全局状态管理 =============

// 全局变量存储弹框元素和当前选择的文件夹
let obsidianModal: HTMLElement | null = null;
let selectedVaultHandle: FileSystemDirectoryHandle | null = null;
let rootVaultHandle: FileSystemDirectoryHandle | null = null; // 存储最初选择的根路径
let currentSelectedPath: string = ''; // 存储当前选择的相对路径

// 扩展 FileSystemDirectoryHandle 类型以包含 entries 方法
declare global {
    interface FileSystemDirectoryHandle {
        entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
    }
}

// ============= 2. 弹框生命周期管理 =============

/**
 * 注入 Obsidian 选择弹框到页面
 */
function injectObsidianModal(): void {
    if (obsidianModal) {
        return; // 已经注入过了
    }

    // 创建弹框容器
    obsidianModal = document.createElement('div');
    obsidianModal.id = 'zhihu-obsidian-modal';
    obsidianModal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>选择 Obsidian Vault</h3>
                    <button class="close-btn" type="button">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="folder-selection">
                        <div id="selected-folder-info" class="selected-folder-info">
                            未选择文件夹
                        </div>
                        <button id="select-folder-btn" type="button" class="select-folder-btn">
                            选择文件夹
                        </button>
                    </div>
                    <div class="folder-structure" id="folder-structure">
                        <!-- 文件夹结构将在这里显示 -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="confirm-save-btn" type="button" class="confirm-btn" disabled>
                        确认保存
                    </button>
                    <button id="cancel-btn" type="button" class="cancel-btn">
                        取消
                    </button>
                </div>
            </div>
        </div>
    `;

    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        #zhihu-obsidian-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: none;
        }
        
        #zhihu-obsidian-modal .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #zhihu-obsidian-modal .modal-content {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        
        #zhihu-obsidian-modal .modal-header {
            background-color: rgb(221, 232, 249);
            padding: 16px 20px;
            border-bottom: 1px solid rgb(23, 114, 246);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        #zhihu-obsidian-modal .modal-header h3 {
            margin: 0;
            color: black;
            font-size: 18px;
            font-weight: 600;
        }
        
        #zhihu-obsidian-modal .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: black;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #zhihu-obsidian-modal .close-btn:hover {
            background-color: rgba(23, 114, 246, 0.1);
            border-radius: 4px;
        }
        
        #zhihu-obsidian-modal .modal-body {
            padding: 20px;
            flex: 1;
            overflow-y: auto;
        }
        
        #zhihu-obsidian-modal .folder-selection {
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        #zhihu-obsidian-modal .selected-folder-info {
            background-color: rgb(221, 232, 249);
            border: 1px solid rgb(23, 114, 246);
            border-radius: 4px;
            padding: 12px;
            color: black;
            font-size: 14px;
            min-height: 20px;
            flex: 1;
        }
        
        #zhihu-obsidian-modal .select-folder-btn {
            background-color: rgb(23, 114, 246);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 0.2s;
            white-space: nowrap;
        }
        
        #zhihu-obsidian-modal .select-folder-btn:hover {
            background-color: rgb(21, 101, 217);
        }
        
        #zhihu-obsidian-modal .select-folder-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        
        #zhihu-obsidian-modal .folder-structure {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            padding: 16px;
            min-height: 200px;
            max-height: 300px;
            overflow-y: auto;
            font-family: monospace;
            font-size: 14px;
            color: black;
            white-space: pre-wrap;
            line-height: 1.4;
        }
        
        #zhihu-obsidian-modal .folder-item {
            cursor: pointer;
            padding: 2px 4px;
            border-radius: 3px;
            transition: background-color 0.2s;
        }
        
        #zhihu-obsidian-modal .folder-item:hover {
            background-color: rgba(23, 114, 246, 0.1);
        }
        
        #zhihu-obsidian-modal .folder-item.selected {
            background-color: rgb(221, 232, 249);
            font-weight: bold;
        }
        
        #zhihu-obsidian-modal .modal-footer {
            background-color: rgb(221, 232, 249);
            padding: 16px 20px;
            border-top: 1px solid rgb(23, 114, 246);
            display: flex;
            gap: 12px;
            justify-content: center;
        }
        
        #zhihu-obsidian-modal .confirm-btn {
            background-color: rgb(23, 114, 246);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        }
        
        #zhihu-obsidian-modal .confirm-btn:hover:not(:disabled) {
            background-color: rgb(21, 101, 217);
        }
        
        #zhihu-obsidian-modal .confirm-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        
        #zhihu-obsidian-modal .cancel-btn {
            background-color: white;
            color: black;
            border: 1px solid rgb(23, 114, 246);
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        }
        
        #zhihu-obsidian-modal .cancel-btn:hover {
            background-color: rgb(221, 232, 249);
        }
    `;

    // 将样式和弹框添加到页面
    document.head.appendChild(style);
    document.body.appendChild(obsidianModal);

    // 绑定事件监听器
    bindModalEvents();
}

/**
 * 绑定弹框事件监听器
 */
function bindModalEvents(): void {
    if (!obsidianModal) return;

    // 关闭按钮
    const closeBtn = obsidianModal.querySelector('.close-btn');
    closeBtn?.addEventListener('click', hideObsidianModal);

    // 取消按钮
    const cancelBtn = obsidianModal.querySelector('#cancel-btn');
    cancelBtn?.addEventListener('click', hideObsidianModal);

    // 选择文件夹按钮
    const selectFolderBtn = obsidianModal.querySelector('#select-folder-btn');
    selectFolderBtn?.addEventListener('click', async () => {
        try {
            selectedVaultHandle = await selectObsidianVaultInternal();
            if (selectedVaultHandle) {
                rootVaultHandle = selectedVaultHandle; // 保存根路径
                currentSelectedPath = ''; // 重置为根路径
                updateSelectedFolderInfo();
                updateFolderStructure();
                enableConfirmButton();
            }
        } catch (error) {
            console.error('选择文件夹失败:', error);
        }
    });

    // 确认保存按钮的事件监听器将在 selectObsidianVault 函数中动态添加

    // 点击遮罩层关闭弹框
    const overlay = obsidianModal.querySelector('.modal-overlay');
    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) {
            hideObsidianModal();
        }
    });
}

/**
 * 显示 Obsidian 选择弹框
 */
export function showObsidianModal(): void {
    if (!obsidianModal) {
        injectObsidianModal();
    }
    if (obsidianModal) {
        obsidianModal.style.display = 'block';
    }
}

/**
 * 隐藏 Obsidian 选择弹框
 */
export function hideObsidianModal(): void {
    if (obsidianModal) {
        obsidianModal.style.display = 'none';
    }
}

// ============= 3. 辅助函数 =============

/**
 * 更新选中的文件夹信息显示
 */
function updateSelectedFolderInfo(customPath?: string): void {
    const infoElement = obsidianModal?.querySelector('#selected-folder-info');
    if (infoElement && selectedVaultHandle && rootVaultHandle) {
        let displayPath;
        if (customPath) {
            // 如果提供了自定义路径，从根路径开始显示
            displayPath = `${rootVaultHandle.name}/${customPath}`;
        } else {
            // 显示当前选择的文件夹名称
            displayPath = selectedVaultHandle.name;
        }
        infoElement.textContent = `已选择: ${displayPath}`;
    }
}

/**
 * 更新文件夹高亮显示
 */
function updateFolderHighlight(selectedPath: string): void {
    const structureElement = obsidianModal?.querySelector('#folder-structure') as HTMLElement;
    if (!structureElement) return;

    // 移除所有高亮
    const allItems = structureElement.querySelectorAll('.folder-item');
    allItems.forEach(item => {
        item.classList.remove('selected');
    });

    // 高亮选中的文件夹
    const selectedItem = structureElement.querySelector(`[data-path="${selectedPath}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }
}

/**
 * 启用确认按钮
 */
function enableConfirmButton(): void {
    (obsidianModal?.querySelector('#confirm-save-btn') as HTMLButtonElement).disabled = false;
}

// ============= 4. 文件夹管理 =============

/**
 * 更新文件夹结构显示
 */
async function updateFolderStructure(): Promise<void> {
    const structureElement = obsidianModal?.querySelector('#folder-structure') as HTMLElement;
    if (!structureElement || !selectedVaultHandle) return;

    try {
        // 清除之前的事件监听器
        structureElement.innerHTML = '';

        // 创建根文件夹显示
        const rootElement = createFolderElement(selectedVaultHandle.name, selectedVaultHandle, '');
        structureElement.appendChild(rootElement);

        // 添加子文件夹
        await addSubFolders(structureElement, selectedVaultHandle, '', 4);

    } catch (error) {
        structureElement.innerHTML = '<div class="error">无法读取文件夹结构</div>';
    }
}

/**
 * 创建文件夹元素
 */
function createFolderElement(name: string, handle: FileSystemDirectoryHandle, path: string): HTMLElement {
    const element = document.createElement('div');
    element.className = 'folder-item';
    element.textContent = '📁 ' + name;
    element.dataset.path = path;
    element.dataset.name = name;
    element.dataset.handle = JSON.stringify({ name: handle.name }); // 存储句柄信息
    console.log('createFolderElement ' + path);

    element.addEventListener('click', () => {
        selectFolder(handle, path ? `${path}` : name);
    });

    return element;
}

/**
 * 添加子文件夹
 */
async function addSubFolders(
    container: HTMLElement,
    dirHandle: FileSystemDirectoryHandle,
    currentPath: string,
    maxDepth: number,
    indent: string = ''
): Promise<void> {
    if (maxDepth <= 0) return;

    try {
        const entries: Array<{ name: string, handle: FileSystemHandle }> = [];

        for await (const [name, handle] of dirHandle.entries()) {
            entries.push({ name, handle });
        }

        // 只筛选出文件夹
        const folders = entries.filter(entry => entry.handle.kind === 'directory');

        // 限制显示条目数量
        const limitedFolders = folders.slice(0, 20);

        for (const { name, handle } of limitedFolders) {
            const fullPath = currentPath ? `${currentPath}/${name}` : name;
            const folderElement = createFolderElement(name, handle as FileSystemDirectoryHandle, fullPath);

            // 添加缩进（增加每一级的缩进量）
            folderElement.style.paddingLeft = `${indent.length * 20 + 20}px`;

            container.appendChild(folderElement);

            // 递归添加子文件夹
            if (maxDepth > 1) {
                await addSubFolders(container, handle as FileSystemDirectoryHandle, fullPath, maxDepth - 1, indent + ' ');
            }
        }

        if (folders.length > 20) {
            const moreElement = document.createElement('div');
            moreElement.textContent = indent + `... 还有 ${folders.length - 20} 个文件夹`;
            moreElement.style.paddingLeft = `${indent.length * 20 + 20}px`;
            moreElement.style.color = '#666';
            container.appendChild(moreElement);
        }

    } catch (error) {
        console.error('读取子文件夹失败:', error);
    }
}

/**
 * 选择文件夹
 */
function selectFolder(handle: FileSystemDirectoryHandle, path: string): void {
    // 更新全局变量
    selectedVaultHandle = handle;
    currentSelectedPath = path;

    // 更新显示路径
    updateSelectedFolderInfo(path);

    // 更新高亮显示
    updateFolderHighlight(path);

    // 启用确认按钮
    enableConfirmButton();
}

/**
 * 获取目录结构（只显示文件夹）
 */
/* async function getDirectoryStructure(
    dirHandle: FileSystemDirectoryHandle,
    indent: string = '',
    maxDepth: number = 4,
    currentPath: string = ''
): Promise<string> {
    if (maxDepth <= 0) return '...\n';

    let structure = '';
    const entries: Array<{ name: string, handle: FileSystemHandle }> = [];

    try {
        for await (const [name, handle] of dirHandle.entries()) {
            entries.push({ name, handle });
        }
    } catch (error) {
        return '无法访问文件夹内容\n';
    }

    // 只筛选出文件夹
    const folders = entries.filter(entry => entry.handle.kind === 'directory');

    // 限制显示条目数量
    const limitedFolders = folders.slice(0, 20);

    for (const { name, handle } of limitedFolders) {
        const fullPath = currentPath ? `${currentPath}/${name}` : name;
        structure += indent + '📁 ' + name + '\n';
        if (maxDepth > 1) {
            structure += await getDirectoryStructure(
                handle as FileSystemDirectoryHandle,
                indent + '  ',
                maxDepth - 1,
                fullPath
            );
        }
    }

    if (folders.length > 20) {
        structure += indent + `... 还有 ${folders.length - 20} 个文件夹\n`;
    }

    return structure;
} */

/**
 * 获取相对路径（简化版本，实际实现可能需要更复杂的逻辑）
 */
/* function getRelativePath(handle: FileSystemDirectoryHandle): string {
    // 这里简化处理，实际项目中可能需要更复杂的路径计算
    // 由于FileSystemDirectoryHandle没有直接的路径属性，我们返回名称
    return handle.name;
} */

/**
 * 创建时间戳文件
 */
async function createTimestampFile(dirHandle: FileSystemDirectoryHandle): Promise<void> {
    const timestamp = new Date().getTime();
    const filename = `debug_${timestamp}.txt`;
    const content = `调试文件 - 创建时间: ${new Date().toLocaleString()}\n时间戳: ${timestamp}`;

    try {
        const fileHandle = await dirHandle.getFileHandle(filename, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        console.log(`成功创建调试文件: ${filename}`);
    } catch (error) {
        console.error('创建文件失败:', error);
        throw error;
    }
}

/**
 * 内部的选择文件夹函数（实际执行选择操作）
 */
async function selectObsidianVaultInternal(): Promise<FileSystemDirectoryHandle | null> {
    try {
        // 检查浏览器是否支持 File System Access API
        if (!("showDirectoryPicker" in window)) {
            alert("您的浏览器不支持文件系统访问功能，请使用 Chrome 或 Edge 浏览器");
            return null;
        }

        const dirHandle = await (window as any).showDirectoryPicker({
            mode: "readwrite",
        });

        return dirHandle;
    } catch (err) {
        if (err.name !== "AbortError") {
            console.error("选择目录失败:", err);
        }
        return null;
    }
}

// ============= 5. 配置管理 =============

/**
 * Obsidian 保存器配置
 */
export interface ObsidianConfig {
    /** Obsidian vault 根目录句柄 */
    vaultHandle?: FileSystemDirectoryHandle;
    /** 附件文件夹名称 */
    attachmentFolder: string;
}

/**
 * 保存到 Obsidian 的结果
 */
export interface SaveToObsidianResult {
    success: boolean;
    message: string;
    mdPath?: string;
}

/**
 * 从 localStorage 加载 Obsidian 配置
 */
export function loadObsidianConfig(): ObsidianConfig {
    const config = localStorage.getItem("zhihu-obsidian-config");
    if (config) {
        const parsed = JSON.parse(config);
        return {
            attachmentFolder: parsed.attachmentFolder || "Attachments",
        };
    }
    return {
        attachmentFolder: "Attachments",
    };
}

/**
 * 保存 Obsidian 配置到 localStorage
 */
export function saveObsidianConfig(config: Partial<ObsidianConfig>): void {
    const current = loadObsidianConfig();
    const updated = { ...current, ...config };
    localStorage.setItem("zhihu-obsidian-config", JSON.stringify(updated));
}

/**
 * 清理文件名，移除所有不允许的字符
 * Windows/macOS/Linux 文件系统禁止的字符：< > : " / \ | ? * 以及控制字符
 */
function sanitizeFilename(filename: string): string {
    if (!filename || typeof filename !== 'string') {
        return 'untitled';
    }

    return filename
        // 移除所有控制字符（包括换行、回车、制表符等）
        .replace(/[\x00-\x1f\x7f-\x9f]/g, '')
        // 移除或替换文件系统非法字符
        .replace(/[<>:"/\\|?*]/g, '-')
        // 移除 Unicode 零宽字符和其他不可见字符
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        // 替换连续空白字符为单个空格
        .replace(/\s+/g, ' ')
        // 移除前后空格
        .trim()
        // 移除连续的点（避免 .. 等）
        .replace(/\.{2,}/g, '.')
        // 移除文件名开头和结尾的点和空格
        .replace(/^[.\s]+|[.\s]+$/g, '')
        // 限制长度（Windows 文件名最大255字节，保守起见限制200字符）
        .substring(0, 200)
        // 再次移除末尾的空格和点
        .replace(/[.\s]+$/, '')
        // 如果清理后为空，使用默认名称
        || 'untitled';
}

// ============= 6. 主函数 =============

/**
 * 请求选择 Obsidian vault 目录
 * 现在通过弹框界面进行选择
 */
export async function selectObsidianVault(): Promise<FileSystemDirectoryHandle | null> {
    return new Promise((resolve) => {
        // 显示弹框
        showObsidianModal();

        // 监听确认按钮点击事件
        const confirmBtn = obsidianModal?.querySelector('#confirm-save-btn');
        const cancelBtn = obsidianModal?.querySelector('#cancel-btn');
        const closeBtn = obsidianModal?.querySelector('.close-btn');

        const cleanup = () => {
            confirmBtn?.removeEventListener('click', onConfirm);
            cancelBtn?.removeEventListener('click', onCancel);
            closeBtn?.removeEventListener('click', onCancel);
        };

        const onConfirm = async () => {
            cleanup();
            hideObsidianModal();

            // 调试：输出当前选择的路径
            if (selectedVaultHandle && rootVaultHandle) {
                const currentPath = currentSelectedPath
                    ? `${rootVaultHandle.name}/${currentSelectedPath}`
                    : rootVaultHandle.name;
                console.log('当前选择的路径:', currentPath);

                // 调试：创建时间戳文件
                try {
                    await createTimestampFile(selectedVaultHandle);
                } catch (error) {
                    console.error('创建时间戳文件失败:', error);
                }
            }

            resolve(selectedVaultHandle);
        };

        const onCancel = () => {
            cleanup();
            hideObsidianModal();
            resolve(null);
        };

        confirmBtn?.addEventListener('click', onConfirm);
        cancelBtn?.addEventListener('click', onCancel);
        closeBtn?.addEventListener('click', onCancel);
    });
}

/**
 * 生成 Obsidian 兼容的 Markdown 内容
 * 将图片路径转换为 Obsidian 的 [[attachments/filename]] 或 ![](Attachments/filename) 格式
 */
export function generateObsidianMarkdown(
    markdown: string[],
    lex: LexType[],
    config: ObsidianConfig
): string {
    let result = markdown.join("\n\n");

    // 清理附件文件夹名
    const safeAttachmentFolder = sanitizeFilename(config.attachmentFolder);

    // 遍历 lex 找出所有图片和视频，替换路径
    for (const token of lex) {
        if (token.type === TokenType.Figure || token.type === TokenType.Gif) {
            // 优先使用 localSrc，如果没有则使用 src
            const originalSrc = token.local && token.localSrc ? token.localSrc : token.src;

            if (originalSrc) {
                // 从路径中提取文件名
                const filename = originalSrc.split("/").pop();
                // 清理文件名（与保存时保持一致）
                const safeFilename = sanitizeFilename(filename);
                const obsidianPath = `${safeAttachmentFolder}/${safeFilename}`;

                // 替换 Markdown 中的路径 - 尝试多种可能的格式
                result = result.replace(`![](${originalSrc})`, `![](${obsidianPath})`);
                result = result.replace(`![](${token.src})`, `![](${obsidianPath})`);
            }
        } else if (token.type === TokenType.Video) {
            const originalSrc = token.local && token.localSrc ? token.localSrc : token.src;

            if (originalSrc) {
                const filename = originalSrc.split("/").pop();
                // 清理文件名（与保存时保持一致）
                const safeFilename = sanitizeFilename(filename);
                const obsidianPath = `${safeAttachmentFolder}/${safeFilename}`;

                result = result.replace(originalSrc, obsidianPath);
                result = result.replace(token.src, obsidianPath);
            }
        }
    }

    return result;
}

/**
 * 保存 ZIP 内容到 Obsidian vault
 * @param zip JSZip 对象
 * @param title 文件标题
 * @param markdown Markdown 内容数组
 * @param lex Lex 数组
 * @param vaultHandle Obsidian vault 目录句柄
 * @param config Obsidian 配置
 */
export async function saveToObsidian(
    zip: JSZip,
    title: string,
    markdown: string[],
    lex: LexType[],
    vaultHandle: FileSystemDirectoryHandle,
    config: ObsidianConfig
): Promise<SaveToObsidianResult> {
    try {
        // 1. 创建或获取 Attachments 文件夹
        const safeAttachmentFolder = sanitizeFilename(config.attachmentFolder);

        const attachmentDirHandle = await vaultHandle.getDirectoryHandle(
            safeAttachmentFolder,
            { create: true }
        );

        // 2. 保存所有附件文件
        const files = Object.keys(zip.files);
        const attachmentFiles = files.filter(
            (name) => !name.endsWith("info.json") && !name.endsWith(".md")
        );

        for (const filename of attachmentFiles) {
            const file = zip.files[filename];
            if (!file.dir) {
                const content = await file.async("uint8array");
                // 从完整路径中提取文件名（去掉文件夹路径）
                const pureFilename = filename.split("/").pop();
                // 清理文件名
                const safeFilename = sanitizeFilename(pureFilename);

                const fileHandle = await attachmentDirHandle.getFileHandle(safeFilename, {
                    create: true,
                });
                const writable = await fileHandle.createWritable();
                await writable.write(content as FileSystemWriteChunkType);
                await writable.close();
            }
        }

        // 3. 生成 Obsidian 兼容的 Markdown
        const obsidianMarkdown = generateObsidianMarkdown(markdown, lex, config);

        // 4. 保存 Markdown 文件到 vault 根目录
        const safeTitle = sanitizeFilename(title);
        const mdFilename = `${safeTitle}.md`;

        const mdFileHandle = await vaultHandle.getFileHandle(mdFilename, {
            create: true,
        });
        const writable = await mdFileHandle.createWritable();
        await writable.write(obsidianMarkdown);
        await writable.close();

        return {
            success: true,
            message: `已保存到 Obsidian: ${mdFilename}`,
            mdPath: mdFilename,
        };
    } catch (err) {
        console.error("保存到 Obsidian 失败:", err);
        return {
            success: false,
            message: `保存失败: ${err.message}`,
        };
    }
}
