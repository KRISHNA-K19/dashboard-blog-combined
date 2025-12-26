import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((t) => {
    const id = Date.now() + Math.random().toString(36).slice(2);
    setToasts((s) => [...s, { id, ...t }]);
    if (!t.duration || t.duration > 0) {
      setTimeout(() => {
        setToasts((s) => s.filter((x) => x.id !== id));
      }, t.duration ?? 4000);
    }
    return id;
  }, []);

  const remove = useCallback((id) => setToasts((s) => s.filter((x) => x.id !== id)), []);

  const api = {
    success: (msg, opts) => add({ type: 'success', message: msg, ...opts }),
    error: (msg, opts) => add({ type: 'error', message: msg, ...opts }),
    info: (msg, opts) => add({ type: 'info', message: msg, ...opts }),
    remove
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastContainer toasts={toasts} onRemove={remove} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

function ToastContainer({ toasts, onRemove }) {
  const node = document.getElementById('toast-root') || document.body;
  return createPortal(
    <div className="fixed right-4 top-4 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div key={t.id} className={`max-w-sm w-full rounded-md p-3 shadow-md text-sm border ${t.type === 'success' ? 'bg-green-50 border-green-200' : t.type === 'error' ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`} role="status">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 text-slate-800">{t.message}</div>
            <button onClick={() => onRemove(t.id)} className="text-slate-500 hover:text-slate-700">✕</button>
          </div>
        </div>
      ))}
    </div>,
    node
  );
}
