import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-rose-500',
    info: 'from-blue-500 to-cyan-500',
    warning: 'from-yellow-500 to-orange-500'
  }[type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertCircle
  }[type];

  return (
    <div className={`fixed top-4 right-4 bg-gradient-to-r ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn z-50 max-w-md`}>
      <Icon size={20} className="flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white transition"
      >
        <X size={18} />
      </button>
    </div>
  );
}