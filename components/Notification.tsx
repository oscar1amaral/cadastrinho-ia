import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const styles = {
    success: 'bg-secondary/90 border-secondary shadow-lg glow-secondary',
    error: 'bg-red-900/90 border-red-500 shadow-2xl glow-error',
    info: 'bg-primary/90 border-primary shadow-lg glow-primary'
  }[type];

  const Icon = {
    success: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    info: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }[type];

  return (
    <div className={`fixed bottom-8 right-8 left-8 sm:left-auto sm:w-[400px] backdrop-blur-xl border border-white/10 rounded-2xl p-5 z-[100] animate-in slide-in-from-bottom-10 transition-all duration-300 ${styles}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-0.5">{Icon}</div>
        <div className="flex-1">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">
            {type === 'error' ? 'Atenção' : type === 'success' ? 'Sucesso' : 'Informação'}
          </h4>
          <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap max-h-[200px] overflow-y-auto">
            {message}
          </p>
        </div>
        <button 
          onClick={onClose} 
          className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;