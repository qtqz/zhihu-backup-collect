import * as JSZip from "jszip";
import { showToast } from './toast';
import { sanitizeFilename } from './utils';

// showToast('欢迎使用知乎助手-备份到obsidian插件');
/**
 * 下一步
 * 解决再次打开时，文件夹列表闪动的问题，尽量不重新读取文件夹
 * 
 */

// ============= 1. 全局状态管理 =============

// 全局变量存储弹框元素和当前选择的文件夹
let obsidianModal: HTMLElement | null = null;
let selectedVaultHandle: FileSystemDirectoryHandle | null = null; // 存储选择的文件夹
let rootVaultHandle: FileSystemDirectoryHandle | null = null; // 存储最初选择的根文件夹
let currentSelectedPath: string = ''; // 存储当前选择的相对路径

// 扩展 FileSystemDirectoryHandle 类型以包含必要的方法
declare global {
    interface FileSystemDirectoryHandle {
        entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
        queryPermission(descriptor?: { mode?: 'read' | 'readwrite' }): Promise<PermissionState>;
        requestPermission(descriptor?: { mode?: 'read' | 'readwrite' }): Promise<PermissionState>;
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
                    <h3><svg xmlns="http://www.w3.org/2000/svg" style="width: 2.5em;height: 2.5em;opacity: 0.7;" width="1.5em" height="1.5em" viewBox="0 0 512 512"><g fill-rule="evenodd"><path fill="#673ab7" d="M463.47 192H151.06c-13.77 0-26 8.82-30.35 21.89L64 384V160h384c0-17.67-14.33-32-32-32H241.98a32 32 0 0 1-20.48-7.42l-20.6-17.15c-5.75-4.8-13-7.43-20.48-7.43H64c-17.67 0-32 14.33-32 32v256c0 17.67 14.33 32 32 32h352l76.88-179.39c1.7-3.98 2.59-8.28 2.59-12.61c0-17.67-14.33-32-32-32"/><g fill="#d1c4e9"><path d="M336.2 318.24c8.07-1.51 12.6-2.02 21.66-2.02c-34.18-89.72 48.95-139.27 18.63-155.11c-17-8.88-52.32 37.77-72.93 56.26l-10.67 37.41c19.77 16.2 36.25 39.63 43.31 63.46m75.04 128.91c13.05 3.85 26.66-5.92 28.52-19.42c1.35-9.81 3.51-20.65 8.24-30.94c-2.66-7.51-25.72-71.18-104.74-56.39c7.6 31.4-4.15 64.54-22.83 91.02c33.14.31 59.29 6.45 90.81 15.73"/><path d="M478.76 346.86c7.02-12.43-16.61-22.28-28.74-50.78c-10.52-24.69 4.93-53.82-8.18-66.23l-40.17-38.02c-14.09 38.27-40.29 56.91-17.12 123.38c37.13 6.98 67.48 27.2 77.55 58.42c0 0 13.67-21.49 16.66-26.77m-221.26 5.78c-8.21 18.67 17.96 36.81 43.46 63.29c29-40.73 24.17-88.95-15.12-127.91z"/></g></g></svg>
                    <span>选择存储库</span></h3>
                    <button class="close-btn" type="button">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="button-group">
                        <button id="btn-1" type="button" class="option-btn" data-text="zip-single" title="每个ZIP单独解包到一个文件夹，文件夹名称与ZIP名称相同，图片放到各自的文件夹内">
                            ZIP单独解包
                        </button>
                        <button id="btn-2" type="button" class="option-btn" data-text="zip-common" title="所有ZIP共同解包，所有图片放到同一个文件夹（assets），强制合并文本和评论，放在外面，文件名与ZIP名称相同">
                            ZIP共同解包
                        </button>
                        <button id="btn-3" type="button" class="option-btn" data-text="zip-none" title="不解压缩">
                            ZIP不解包
                        </button>
                        <button id="btn-4" type="button" class="option-btn" data-text="text" title="纯文本MD文件">
                            纯文本
                        </button>
                        <button id="btn-5" type="button" class="option-btn" data-text="png" title="图片PNG文件">
                            图片
                        </button>
                    </div>
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
                    <div class="user-notes">
                        <ul>
                            <li>首次使用需要选择您的存储库文件夹，如果您有 Obsidian，可以选择您的 Obsidian 仓库目录。建议专门建立一个存储库文件夹存放内容，避免与现有笔记混合</li>
                            <li>选择后可以点击任意子文件夹作为保存位置，便于分类保存。已过滤掉了长度超过25字符的文件夹，以及 assets 文件夹。鼠标移到保存选项，会浮现出详细说明</li>
                            <li>授权一次后，下次使用会自动记住您的选择。关闭所有页面后，下次打开可能需要重新授权，选择始终允许即可</li>
                            <li>使用此功能时，请确保此程序是从可信的来源获取的，并定期备份您的文件</li>
                            <li><a href="https://github.com/qtqz/zhihu-backup-collect" target="_blank" style="color: inherit!important;">点击前往项目主页，阅读更多内容/支持我</a></li>
                        </ul>
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
            z-index: 100;
            display: none;
            opacity: 1;
            transition: opacity 0.3s ease-in-out;
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
            max-height: 85vh;
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
            display: flex;
            align-items: center;
            gap: 0.5em;
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
            min-height: 180px;
            max-height: 260px;
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
        
        #zhihu-obsidian-modal .button-group {
            display: flex;
            gap: 8px;
            margin-bottom: 20px;
        }
        
        #zhihu-obsidian-modal .option-btn {
            flex: 1;
            padding: 10px;
            border: 1px solid rgb(23, 114, 246);
            border-radius: 6px;
            background-color: white;
            color: rgb(23, 114, 246);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        #zhihu-obsidian-modal .option-btn:hover {
            background-color: rgba(23, 114, 246, 0.1);
        }
        
        #zhihu-obsidian-modal .option-btn.selected {
            background-color: rgb(23, 114, 246);
            color: white;
        }
        
        #zhihu-obsidian-modal .user-notes {
            margin-top: 20px;
            padding: 16px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            font-size: 12px;
            color: #666;
        }
        
        #zhihu-obsidian-modal .user-notes ul {
            margin: 0;
            padding-left: 16px;
        }
        
        #zhihu-obsidian-modal .user-notes li {
            margin-bottom: 4px;
            line-height: 1.4;
        }
    `;

    // 将样式和弹框添加到页面
    document.head.appendChild(style);
    document.body.appendChild(obsidianModal);

    // 绑定事件监听器
    bindModalEvents();
}

/**
 * 绑定选项按钮事件
 */
function bindOptionButtons(): void {
    const optionButtons = obsidianModal?.querySelectorAll('.option-btn');
    optionButtons?.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的选中状态
            optionButtons.forEach(btn => btn.classList.remove('selected'));

            // 添加当前按钮的选中状态
            button.classList.add('selected');

            // 获取按钮文字并保存到localStorage
            const buttonText = button.getAttribute('data-text');
            if (buttonText) {
                saveSelectedOption(buttonText);
                console.log('选中选项:', buttonText);
            }
        });
    });
}

/**
 * 保存选中的选项到localStorage
 */
function saveSelectedOption(optionText: string): void {
    try {
        localStorage.setItem('zhihu-obsidian-selected-option', optionText);
    } catch (error) {
        console.warn('保存 Obsidian 选项失败:', error);
    }
}

/**
 * 从localStorage加载选中的选项
 */
function loadSelectedOption(): string | null {
    try {
        return localStorage.getItem('zhihu-obsidian-selected-option');
    } catch (error) {
        console.warn('读取 Obsidian 选项失败:', error);
        return null;
    }
}

/**
 * 恢复按钮选中状态
 */
function restoreButtonSelection(): void {
    const selectedOption = loadSelectedOption();
    let targetButton;

    if (selectedOption) {
        const optionButtons = obsidianModal?.querySelectorAll('.option-btn');
        targetButton = Array.from(optionButtons || [])
            .find(button => button.getAttribute('data-text') === selectedOption);
    }

    // 如果没有保存的选项，默认选中第4个按钮
    if (!targetButton) {
        targetButton = obsidianModal?.querySelector('#btn-4');
        if (targetButton) {
            // 保存默认选择到localStorage
            const defaultText = targetButton.getAttribute('data-text');
            if (defaultText) {
                saveSelectedOption(defaultText);
            }
        }
    }

    if (targetButton) {
        // 移除所有按钮的选中状态
        const optionButtons = obsidianModal?.querySelectorAll('.option-btn');
        optionButtons?.forEach(btn => btn.classList.remove('selected'));

        // 添加目标按钮的选中状态
        targetButton.classList.add('selected');
        const buttonText = targetButton.getAttribute('data-text');
        console.log('恢复选中状态:', buttonText);
    }
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

    // 绑定选项按钮事件
    bindOptionButtons();

    // 选择文件夹按钮
    const selectFolderBtn = obsidianModal.querySelector('#select-folder-btn');
    selectFolderBtn?.addEventListener('click', async () => {
        try {
            selectedVaultHandle = await selectObsidianVaultInternal();
            if (selectedVaultHandle) {
                rootVaultHandle = selectedVaultHandle; // 保存根路径
                currentSelectedPath = ''; // 重置为根路径

                // 保存到IndexedDB
                await fileHandleManager.saveRootFolderHandle(selectedVaultHandle);
                await fileHandleManager.saveCurrentSelectedHandle(selectedVaultHandle);
                fileHandleManager.setRootFolder(selectedVaultHandle);
                fileHandleManager.setCurrentSelected(selectedVaultHandle);

                updateSelectedFolderInfo();
                await updateFolderStructure();
                enableConfirmButton();

                console.log('新文件夹选择完成:', selectedVaultHandle.name);
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

        // 恢复按钮选中状态
        restoreButtonSelection();

        // 加载上次的选择状态
        loadLastSelection();
    }
}

/**
 * 隐藏 Obsidian 选择弹框
 */
export function hideObsidianModal(): void {
    if (obsidianModal) {
        // 先设置透明度过渡
        obsidianModal.style.opacity = '0';

        // 等待过渡完成后再彻底隐藏
        setTimeout(() => {
            if (obsidianModal) {
                obsidianModal.style.display = 'none';
                // 重置透明度，为下次显示做准备
                obsidianModal.style.opacity = '1';
            }
        }, 300);
    }
}

/**
 * 加载上次的选择状态
 */
async function loadLastSelection(): Promise<void> {
    console.log('尝试恢复文件夹访问权限...');

    // 显示加载状态
    const structureElement = obsidianModal?.querySelector('#folder-structure') as HTMLElement;
    if (structureElement) {
        structureElement.innerHTML = `
            <div style="padding: 20px; text-align: center; color: #666;">
                <p>正在恢复文件夹访问权限...</p>
            </div>
        `;
    }

    // 尝试从IndexedDB恢复根文件夹句柄
    const rootHandle = await fileHandleManager.loadAndVerifyRootFolderHandle();

    if (rootHandle) {
        console.log('成功恢复根文件夹访问权限:', rootHandle.name);

        // 设置根目录状态
        rootVaultHandle = rootHandle;
        fileHandleManager.setRootFolder(rootHandle);

        // 尝试恢复当前选择的文件夹句柄
        const currentSelectedHandle = await fileHandleManager.loadAndVerifyCurrentSelectedHandle();

        if (currentSelectedHandle) {
            console.log('成功恢复当前选择文件夹访问权限:', currentSelectedHandle.name);
            selectedVaultHandle = currentSelectedHandle;
            fileHandleManager.setCurrentSelected(currentSelectedHandle);
        } else {
            console.log('未找到当前选择的文件夹，使用根目录');
            selectedVaultHandle = rootHandle;
            fileHandleManager.setCurrentSelected(null);
        }

        // 加载保存的路径配置
        const saved = loadDirectorySelection();
        currentSelectedPath = saved.selectedPath || '';
        /* if (currentSelectedPath != rootHandle.name) { */
        // 更新UI显示，高亮显示
        updateSelectedFolderInfo(currentSelectedPath);
        updateFolderHighlight(currentSelectedPath);
        /* }
        else {
            updateSelectedFolderInfo('');
            updateFolderHighlight('');
        } */

        // 打开一次后，可能不需要更新了
        await updateFolderStructure();

        // 启用确认按钮
        enableConfirmButton();

        console.log('文件夹结构已恢复，当前路径:', currentSelectedPath);
        console.log('当前选择的句柄:', selectedVaultHandle.name);
    } else {
        console.log('需要重新选择文件夹');

        // 显示默认状态
        const infoElement = obsidianModal?.querySelector('#selected-folder-info');
        if (infoElement) {
            infoElement.textContent = '未选择文件夹';
        }

        const structureElement = obsidianModal?.querySelector('#folder-structure') as HTMLElement;
        if (structureElement) {
            structureElement.innerHTML = `
                <div style="padding: 20px; text-align: center; color: #666;">
                    <p>点击"选择文件夹"开始选择您的存储仓库</p>
                </div>
            `;
        }
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

    // 用 dataset 比拼接 CSS selector 更安全，路径中的引号或括号不会破坏选择器。
    const selectedItem = Array.from(structureElement.querySelectorAll('.folder-item'))
        .find(item => item.getAttribute('data-path') === selectedPath);
    selectedItem?.classList.add('selected');

}

/**
 * 启用确认按钮
 */
function enableConfirmButton(): void {
    const confirmButton = obsidianModal?.querySelector('#confirm-save-btn') as HTMLButtonElement | null;
    if (confirmButton) confirmButton.disabled = false;
}

// ============= 4. 文件夹管理 =============

/**
 * 更新文件夹结构显示
 */
async function updateFolderStructure(): Promise<void> {
    const structureElement = obsidianModal?.querySelector('#folder-structure') as HTMLElement;
    if (!structureElement || !rootVaultHandle) return;

    try {
        // 清除之前的事件监听器
        structureElement.innerHTML = '';

        // 创建根文件夹显示（始终从根文件夹开始）
        const rootElement = createFolderElement(rootVaultHandle.name, rootVaultHandle, '');
        structureElement.appendChild(rootElement);

        // 添加子文件夹（从根文件夹开始展开）
        await addSubFolders(structureElement, rootVaultHandle, '', 4);

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

    element.addEventListener('click', async () => {
        await selectFolder(handle, path);
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

        // 只筛选出文件夹，并过滤掉名称长度超过25字符的文件夹
        const folders = entries.filter(entry =>
            entry.handle.kind === 'directory' &&
            entry.name.length <= 25 &&
            entry.name !== 'assets'
        );

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
 * 点击后选择文件夹
 */
async function selectFolder(handle: FileSystemDirectoryHandle, path: string): Promise<void> {
    // 更新全局变量
    selectedVaultHandle = handle;
    currentSelectedPath = path;

    // 保存当前选择的句柄到IndexedDB
    await fileHandleManager.saveCurrentSelectedHandle(handle);
    fileHandleManager.setCurrentSelected(handle);

    // 保存到localStorage
    if (rootVaultHandle) {
        saveDirectorySelection(rootVaultHandle.name, path);
    }

    // 更新显示路径
    updateSelectedFolderInfo(path);

    // 更新高亮显示
    updateFolderHighlight(path);

    // 启用确认按钮
    enableConfirmButton();

    console.log('点击选择子文件夹:', path, '句柄:', handle.name);
}


/**
 * 内部的选择文件夹函数（实际执行选择操作）
 */
async function selectObsidianVaultInternal(): Promise<FileSystemDirectoryHandle | null> {
    try {
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

// ============= 5. IndexedDB 持久化 =============

/**
 * 简化的 IndexedDB 操作类
 */
class SimpleDB {
    private dbName: string;
    private version: number;

    constructor(dbName: string, version: number = 1) {
        this.dbName = dbName;
        this.version = version;
    }

    async open(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains('handles')) {
                    db.createObjectStore('handles');
                }
            };
        });
    }

    async put(storeName: string, value: any, key: string): Promise<void> {
        const db = await this.open();
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.put(value, key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async get(storeName: string, key: string): Promise<any> {
        const db = await this.open();
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async delete(storeName: string, key: string): Promise<void> {
        const db = await this.open();
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        return new Promise((resolve, reject) => {
            const request = store.delete(key);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}

/**
 * FileSystemDirectoryHandle 管理器
 */
class FileHandleManager {
    private db: SimpleDB;
    private storeName: string = 'handles';
    private rootFolderHandle: FileSystemDirectoryHandle | null = null;
    private currentSelectedHandle: FileSystemDirectoryHandle | null = null;

    constructor() {
        this.db = new SimpleDB('zhihu-obsidian-handles');
    }

    // 保存根文件夹句柄
    async saveRootFolderHandle(folderHandle: FileSystemDirectoryHandle): Promise<boolean> {
        try {
            await this.db.put(this.storeName, folderHandle, 'rootFolder');
            console.log('根文件夹句柄已保存到 IndexedDB');
            return true;
        } catch (error) {
            console.error('保存根文件夹句柄失败:', error);
            return false;
        }
    }

    // 保存当前选择的文件夹句柄
    async saveCurrentSelectedHandle(folderHandle: FileSystemDirectoryHandle): Promise<boolean> {
        try {
            await this.db.put(this.storeName, folderHandle, 'currentSelected');
            console.log('当前选择文件夹句柄已保存到 IndexedDB');
            return true;
        } catch (error) {
            console.error('保存当前选择文件夹句柄失败:', error);
            return false;
        }
    }

    // 加载并验证根文件夹句柄
    async loadAndVerifyRootFolderHandle(): Promise<FileSystemDirectoryHandle | null> {
        try {
            const folderHandle = await this.db.get(this.storeName, 'rootFolder');

            if (!folderHandle) {
                console.log('未找到保存的根文件夹句柄');
                return null;
            }

            return await this.verifyFolderHandle(folderHandle, 'rootFolder');
        } catch (error) {
            console.error('加载根文件夹句柄失败:', error);
            return null;
        }
    }

    // 加载并验证当前选择的文件夹句柄
    async loadAndVerifyCurrentSelectedHandle(): Promise<FileSystemDirectoryHandle | null> {
        try {
            const folderHandle = await this.db.get(this.storeName, 'currentSelected');

            if (!folderHandle) {
                console.log('未找到保存的当前选择文件夹句柄');
                return null;
            }

            return await this.verifyFolderHandle(folderHandle, 'currentSelected');
        } catch (error) {
            console.error('加载当前选择文件夹句柄失败:', error);
            return null;
        }
    }

    // 验证文件夹句柄权限
    private async verifyFolderHandle(folderHandle: FileSystemDirectoryHandle, key: string): Promise<FileSystemDirectoryHandle | null> {
        try {
            // 检查权限
            const permissionStatus = await folderHandle.queryPermission();
            console.log(`${key} 权限状态: ${permissionStatus}`);

            if (permissionStatus === 'granted') {
                console.log(`${key} 文件夹权限仍然有效`);
                return folderHandle;
            }

            // 尝试重新请求权限
            console.log(`尝试重新请求 ${key} 文件夹权限...`);
            const newPermissionStatus = await folderHandle.requestPermission();

            if (newPermissionStatus === 'granted') {
                console.log(`重新获得 ${key} 文件夹权限`);
                return folderHandle;
            }

            // 权限被拒绝，从存储中移除
            console.log(`${key} 权限被拒绝，清除保存的句柄`);
            await this.db.delete(this.storeName, key);
            return null;
        } catch (error) {
            console.error(`验证 ${key} 文件夹句柄失败:`, error);
            return null;
        }
    }

    // 设置根文件夹句柄
    setRootFolder(folderHandle: FileSystemDirectoryHandle | null): void {
        this.rootFolderHandle = folderHandle;
    }

    // 设置当前选择的文件夹句柄
    setCurrentSelected(folderHandle: FileSystemDirectoryHandle | null): void {
        this.currentSelectedHandle = folderHandle;
    }

    // 获取根文件夹句柄
    getRootFolder(): FileSystemDirectoryHandle | null {
        return this.rootFolderHandle;
    }

    // 获取当前选择的文件夹句柄
    getCurrentSelected(): FileSystemDirectoryHandle | null {
        return this.currentSelectedHandle;
    }

    // 兼容性方法：获取当前文件夹句柄（返回当前选择的，如果没有则返回根目录）
    getCurrentFolder(): FileSystemDirectoryHandle | null {
        return this.currentSelectedHandle || this.rootFolderHandle;
    }
}

// 全局文件句柄管理器实例
const fileHandleManager = new FileHandleManager();

// ============= 6. 配置管理 =============

/**
 * Obsidian 保存器配置
 */
export interface ObsidianConfig {
    /** Obsidian vault 根目录句柄 */
    vaultHandle?: FileSystemDirectoryHandle;
    /** 附件文件夹名称 */
    attachmentFolder: string;
    /** 上次选择的根目录名称 */
    lastRootName?: string;
    /** 上次选择的相对路径 */
    lastSelectedPath?: string;
}

/**
 * 从 localStorage 加载 Obsidian 配置
 */
function loadObsidianConfig(): ObsidianConfig {
    try {
        const config = localStorage.getItem("zhihu-obsidian-config");
        if (config) {
            const parsed = JSON.parse(config);
            if (parsed && typeof parsed === "object") {
                return {
                    attachmentFolder: typeof parsed.attachmentFolder === "string" ? parsed.attachmentFolder : "assets",
                    lastRootName: typeof parsed.lastRootName === "string" ? parsed.lastRootName : undefined,
                    lastSelectedPath: typeof parsed.lastSelectedPath === "string" ? parsed.lastSelectedPath : undefined,
                };
            }
        }
    } catch (error) {
        console.warn('读取 Obsidian 配置失败，已使用默认配置:', error);
    }
    return {
        attachmentFolder: "assets",
    };
}

/**
 * 保存 Obsidian 配置到 localStorage
 */
export function saveObsidianConfig(config: Partial<ObsidianConfig>): void {
    const current = loadObsidianConfig();
    const updated = { ...current, ...config };
    try {
        localStorage.setItem("zhihu-obsidian-config", JSON.stringify(updated));
    } catch (error) {
        console.warn('保存 Obsidian 配置失败:', error);
    }
}

/**
 * 保存目录选择状态到 localStorage
 */
function saveDirectorySelection(rootName: string, selectedPath: string): void {
    saveObsidianConfig({
        lastRootName: rootName,
        lastSelectedPath: selectedPath,
    });
}

/**
 * 从 localStorage 加载目录选择状态
 */
function loadDirectorySelection(): { rootName?: string; selectedPath?: string } {
    const config = loadObsidianConfig();
    return {
        rootName: config.lastRootName,
        selectedPath: config.lastSelectedPath,
    };
}

// ============= 7. 主函数 =============

/**
 * 请求选择 Obsidian vault 目录
 * 现在打开弹框，通过弹框界面进行选择
 * Promise<FileSystemDirectoryHandle | null>
 */
export async function selectObsidianVault(): Promise<string | null> {
    // 检查浏览器是否支持 File System Access API
    if (!(window as any).showDirectoryPicker) {
        alert("您的浏览器不支持文件系统访问功能，请使用 Chrome 或 Edge 浏览器");
        return null;
    }

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
            // hideObsidianModal();

            // 获取当前选中的按钮内容
            const selectedButton = obsidianModal?.querySelector('.option-btn.selected');
            const selectedOption = selectedButton?.getAttribute('data-text');

            console.log('确认保存 - selectedVaultHandle:', selectedVaultHandle?.name);
            console.log('确认保存 - currentSelectedPath:', currentSelectedPath);
            console.log('确认保存 - 选择的按钮内容:', selectedOption);

            if (selectedOption) {
                // 优先使用当前选择的句柄（可能是子文件夹）
                let finalHandle = selectedVaultHandle;

                // 如果当前没有选择句柄，则使用IndexedDB中保存的当前选择句柄
                if (!finalHandle) {
                    finalHandle = fileHandleManager.getCurrentSelected();
                }

                // 如果还是没有，使用根目录句柄
                if (!finalHandle) {
                    finalHandle = fileHandleManager.getRootFolder();
                }

                if (finalHandle && rootVaultHandle) {
                    const currentPath = currentSelectedPath
                        ? `${rootVaultHandle.name}/${currentSelectedPath}`
                        : rootVaultHandle.name;

                    console.log('当前保存的路径:', currentPath);
                }
            }
            resolve(selectedOption || null);
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

// ============= 8. 文件处理与保存 =============

/**
 * 保存结果接口
 */
export interface SaveResult {
    zip?: JSZip;
    textString?: string;
    title: string;
}

/**
 * 保存类型
 */
export type SaveType = 'zip-single' | 'zip-common' | 'zip-none' | 'png' | 'text';

/**
 * 将dataUrl转换为Blob
 * @param dataUrl 图片的data URL
 * @returns Blob对象
 */
function dataUrlToBlob(dataUrl: string): Blob {
    // 分离dataUrl的元数据和数据部分
    const parts = dataUrl.split(',');
    if (parts.length < 2 || !parts[1]) throw new Error('无效的图片数据');
    const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(parts[1]); // base64解码

    // 将字符串转换为Uint8Array
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
    }

    // 创建Blob
    return new Blob([u8arr], { type: mime });
}

async function writeFileContents(fileHandle: FileSystemFileHandle, content: any): Promise<void> {
    const writable = await fileHandle.createWritable();
    try {
        await writable.write(content as FileSystemWriteChunkType);
    } finally {
        await writable.close();
    }
}

/**
 * 解包ZIP文件到指定文件夹
 * @param zip JSZip对象
 * @param targetFolder 目标文件夹句柄
 */
async function unpackZipToFolder(zip: JSZip, targetFolder: FileSystemDirectoryHandle): Promise<void> {
    const files = Object.keys(zip.files);

    for (const filepath of files) {
        const file = zip.files[filepath];

        // 跳过文件夹条目
        if (file.dir) {
            continue;
        }

        try {
            // 分割路径，处理嵌套文件夹
            const pathParts = filepath.split('/');
            const filename = pathParts.pop(); // 最后一部分是文件名

            if (!filename) {
                continue;
            }

            // 如果有子文件夹，先创建子文件夹
            let currentFolder = targetFolder;
            for (const folderName of pathParts) {
                if (folderName) {
                    const safeFolderName = sanitizeFilename(folderName);
                    currentFolder = await currentFolder.getDirectoryHandle(safeFolderName, { create: true });
                }
            }

            // 获取文件内容
            const content = await file.async('uint8array');
            const safeFilename = sanitizeFilename(filename);

            // 创建并写入文件
            const fileHandle = await currentFolder.getFileHandle(safeFilename, { create: true });
            await writeFileContents(fileHandle, content as FileSystemWriteChunkType);
            console.log(`已保存文件: ${filepath} -> ${safeFilename}`);
        } catch (error) {
            console.error(`保存文件失败 ${filepath}:`, error);
            // 继续处理其他文件
        }
    }
}

/**
 * 保存文件到本地文件系统
 * @param result 保存结果数据
 * @param saveType 保存类型
 */
export async function saveFile(result: SaveResult, saveType: SaveType): Promise<void> {

    const finalHandle = selectedVaultHandle || fileHandleManager.getCurrentSelected() || fileHandleManager.getRootFolder();

    if (!finalHandle) {
        throw new Error('未选择保存文件夹');
    }

    if (saveType === 'zip-single') {
        if (!result.zip) {
            throw new Error('ZIP数据不存在');
        }

        const folderName = sanitizeFilename(result.title);
        try {
            const targetFolder = await finalHandle.getDirectoryHandle(folderName, { create: true });
            await unpackZipToFolder(result.zip, targetFolder);
            console.log(`成功解包ZIP文件到文件夹: ${folderName}`);
            showToast('✅ 保存成功');
        } catch (error) {
            console.error('解包ZIP文件失败:', error);
            showToast('❌ 保存失败');
            throw error;
        }
    }
    else if (saveType === 'zip-common') {
        if (!result.zip) {
            throw new Error('ZIP数据不存在');
        }

        try {
            await unpackZipCommon(result.zip, result.title, finalHandle);
            console.log(`成功共同解包ZIP文件: ${result.title}`);
            showToast('✅ 保存成功');
        } catch (error) {
            console.error('共同解包ZIP文件失败:', error);
            showToast('❌ 保存失败');
            throw error;
        }
    }
    else if (saveType === 'zip-none') {
        if (!result.zip) {
            throw new Error('ZIP数据不存在');
        }

        const filename = result.title + '.zip';
        try {
            const zipBlob = await result.zip.generateAsync({ type: 'blob' });
            const fileHandle = await finalHandle.getFileHandle(filename, { create: true });
            await writeFileContents(fileHandle, zipBlob);
            console.log(`成功保存ZIP文件: ${filename}`);
            showToast('✅ 保存成功');
        } catch (error) {
            console.error('保存ZIP文件失败:', error);
            showToast('❌ 保存失败');
            throw error;
        }
    }
    else if (saveType === 'png') {
        if (!result.textString) {
            throw new Error('图片数据不存在');
        }

        const filename = result.title + '.png';
        try {
            const blob = dataUrlToBlob(result.textString);
            const fileHandle = await finalHandle.getFileHandle(filename, { create: true });
            await writeFileContents(fileHandle, blob);
            console.log(`成功保存图片文件: ${filename}`);
            showToast('✅ 保存成功');
        } catch (error) {
            console.error('保存图片文件失败:', error);
            showToast('❌ 保存失败');
            throw error;
        }
    }
    else if (saveType === 'text') {
        if (!result.textString) {
            throw new Error('文本内容不存在');
        }

        const filename = result.title + '.md';
        try {
            const fileHandle = await finalHandle.getFileHandle(filename, { create: true });
            await writeFileContents(fileHandle, result.textString);
            console.log(`成功保存MD文件: ${filename}`);
            showToast('✅ 保存成功');
        } catch (error) {
            console.error('保存MD文件失败:', error);
            showToast('❌ 保存失败');
            throw error;
        }
    }
    // 等保存成功后再隐藏弹框，不然共同解包ZIP会出问题，不能正常合并评论
    hideObsidianModal();
}


/**
 * 共同解包ZIP文件
 * @param zip JSZip对象
 * @param title 文件标题
 * @param targetFolder 目标文件夹句柄
 * @param assetsFolder assets文件夹名称，默认为'assets'
 */
async function unpackZipCommon(
    zip: JSZip,
    title: string,
    targetFolder: FileSystemDirectoryHandle,
    assetsFolder: string = 'assets'
): Promise<void> {
    const safeAssetsFolder = sanitizeFilename(assetsFolder);

    // 1. 创建或获取assets文件夹
    const assetsDirHandle = await targetFolder.getDirectoryHandle(
        safeAssetsFolder,
        { create: true }
    );

    // 2. 遍历ZIP中的所有文件
    const files = Object.keys(zip.files);
    for (const filepath of files) {
        const file = zip.files[filepath];

        // 跳过文件夹条目
        if (file.dir) {
            continue;
        }

        try {
            const content = await file.async('uint8array');
            const pureFilename = filepath.split('/').pop();

            if (!pureFilename) {
                continue;
            }

            const safeFilename = sanitizeFilename(pureFilename);
            // 判断是md文件还是资源文件
            if (pureFilename.endsWith('.md')) {
                // MD文件保存到目标文件夹根目录
                const safeTitle = sanitizeFilename(title);
                const mdFilename = `${safeTitle}.md`;

                const mdFileHandle = await targetFolder.getFileHandle(mdFilename, {
                    create: true,
                });
                await writeFileContents(mdFileHandle, content as FileSystemWriteChunkType);

                console.log(`已保存MD文件: ${mdFilename}`);
            } else {
                // 其他文件（图片等）保存到assets文件夹
                const fileHandle = await assetsDirHandle.getFileHandle(safeFilename, {
                    create: true,
                });
                await writeFileContents(fileHandle, content as FileSystemWriteChunkType);

                console.log(`已保存资源文件: ${safeAssetsFolder}/${safeFilename}`);
            }
        } catch (error) {
            console.error(`保存文件失败 ${filepath}:`, error);
            // 继续处理其他文件
        }
    }
}
