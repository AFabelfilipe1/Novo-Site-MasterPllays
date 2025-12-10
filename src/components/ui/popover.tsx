import React from 'react';


export const Popover: React.FC<{
trigger: React.ReactNode;
children: React.ReactNode;
}> = ({ trigger, children }) => {
const [open, setOpen] = React.useState(false);
return (
<div className="relative inline-block">
<div onClick={() => setOpen(o => !o)}>{trigger}</div>
{open && (
<div className="absolute mt-2 right-0 bg-white border rounded-md shadow-lg p-3 z-40">
{children}
</div>
)}
</div>
);
};


export default Popover;
