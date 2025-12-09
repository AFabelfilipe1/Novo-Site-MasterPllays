import React from 'react';


// A tiny wrapper for toast notifications. This is a minimal replacement for Sonner.


export const useToast = () => {
const [toasts, setToasts] = React.useState<string[]>([]);
const push = (text: string) => {
setToasts(t => [...t, text]);
setTimeout(() => setToasts(t => t.slice(1)), 3000);
};
const ToastContainer = () => (
<div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
{toasts.map((t, i) => (
<div key={i} className="bg-black text-white px-3 py-2 rounded-md shadow-sm">{t}</div>
))}
</div>
);
return { push, ToastContainer };
};


export default useToast;
