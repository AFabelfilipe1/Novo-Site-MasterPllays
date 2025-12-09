import React from 'react';


export const Tooltip: React.FC<React.PropsWithChildren<{text: string;}>> = ({ children, text }) => {
return (
<span className="relative group inline-block">
{children}
<span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs bg-gray-900 text-white">
{text}
</span>
</span>
);
};


export default Tooltip;
