import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function MobileDrawer({ isOpen, onClose, children }) {
  const drawerRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
        if (!focusable || !focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        drawerRef.current?.querySelector('[autofocus]')?.focus();
        drawerRef.current?.querySelector('button, a, input, [tabindex]')?.focus();
      }, 0);
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const node = document.getElementById('modal-root') || document.body;

  return createPortal(
    <div className="fixed inset-0 z-50 flex">
      <button aria-label="Close menu" onClick={onClose} className="absolute inset-0 bg-black/40" />
      <aside ref={drawerRef} className="relative w-72 max-w-full h-full bg-white border-r p-4 overflow-auto transform transition-transform duration-200 translate-x-0 md:translate-x-0 animate-slide-in">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-slate-600">Menu</div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-md hover:bg-slate-100">✕</button>
        </div>
        <div>{children}</div>
      </aside>
    </div>,
    node
  );
}
