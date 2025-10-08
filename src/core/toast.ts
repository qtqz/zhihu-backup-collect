// 初始化样式
const initStyles = () => {
  if (document.getElementById('toast-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'toast-styles';
  style.textContent = `
    .toast-message {
      position: fixed;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      color: #333;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 14px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.5s ease, transform 0.5s ease;
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
        transform: translate(-50%, 20px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }
    
    @keyframes toast-float-out {
      from {
        opacity: 1;
        transform: translate(-50%, 0);
      }
      to {
        opacity: 0;
        transform: translate(-50%, -20px);
      }
    }
  `;
  document.head.appendChild(style);
};

// 显示消息
export const showToast = (message: string, duration: number = 3000) => {
  initStyles();
  
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // 淡入显示
  setTimeout(() => toast.classList.add('show'), 10);
  
  // 淡出消失
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, duration);
};
