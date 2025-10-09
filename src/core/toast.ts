// 维护活动的 toast 列表
const activeToasts: HTMLElement[] = [];
const TOAST_HEIGHT = 60; // 每个 toast 的高度间隔

// 初始化样式
const initStyles = () => {
  if (document.getElementById('toast-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'toast-styles';
  style.textContent = `
    .toast-message {
      position: fixed;
      top: 30px;
      left: 50%;
      background: white;
      color: #333;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 14px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      pointer-events: none;
      opacity: 0;
      transition: transform 0.3s ease;
    }
    
    .toast-message.show {
      opacity: 1;
      animation: toast-float-in 0.5s ease forwards;
    }
    
    .toast-message.hide {
      animation: toast-float-out 0.5s ease forwards;
    }
    
    @keyframes toast-float-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes toast-float-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

// 显示消息
export const showToast = (message: string, duration: number = 4000) => {
  initStyles();
  
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  
  // 计算当前 toast 应该显示的位置（根据已有 toast 数量）
  const offset = activeToasts.length * TOAST_HEIGHT;
  toast.style.transform = `translate(-50%, ${offset}px)`;
  
  document.body.appendChild(toast);
  activeToasts.push(toast);
  
  // 淡入显示
  setTimeout(() => toast.classList.add('show'), 10);
  
  // 淡出消失
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    
    setTimeout(() => {
      toast.remove();
      // 从列表中移除
      const index = activeToasts.indexOf(toast);
      if (index > -1) {
        activeToasts.splice(index, 1);
        // 更新剩余 toast 的位置
        updateToastPositions();
      }
    }, 500);
  }, duration);
};

// 更新所有 toast 的位置
const updateToastPositions = () => {
  activeToasts.forEach((toast, index) => {
    toast.style.transform = `translate(-50%, ${index * TOAST_HEIGHT}px)`;
  });
};
