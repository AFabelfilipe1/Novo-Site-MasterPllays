import React from 'react';


export const Card: React.FC<React.PropsWithChildren<{className?: string;}>> = ({ children, className = '' }) => {
return (
<div className={`rounded-xl shadow-sm p-4 bg-white ${className}`}>
{children}
</div>
);
};


export default Card;
