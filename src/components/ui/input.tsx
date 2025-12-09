import React from 'react';


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
label?: string;
}


export const Input: React.FC<InputProps> = ({ label, ...rest }) => {
return (
<label className="flex flex-col gap-1 text-sm">
{label && <span className="font-medium">{label}</span>}
<input {...rest} className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2" />
</label>
);
};


export default Input;
