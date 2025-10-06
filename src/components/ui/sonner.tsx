'use client';

import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-center"
      richColors
      toastOptions={{
        style: {
          background: '#ffffff',
          color: '#000000',
          border: '1px solid #e5e7eb',
        },
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-950 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-slate-500',
          actionButton: 'group-[.toast]:bg-slate-900 group-[.toast]:text-slate-50',
          cancelButton: 'group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500',
          icon: 'group-[.toast]:text-green-600',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
