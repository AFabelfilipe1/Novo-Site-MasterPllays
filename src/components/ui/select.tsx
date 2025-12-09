import React from 'react';


export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
label?: string;
}


export const Select: React.FC<SelectProps> = ({ label, children, ...rest }) => {
return (
<label className="flex flex-col gap-1 text-sm">
{label && <span className="font-medium">{label}</span>}
<select {...rest} className="border rounded-md px-3 py-2">{children}</select>
</label>
);
};


export default Select;
