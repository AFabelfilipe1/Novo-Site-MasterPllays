import React from 'react';


export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
label?: string;
}


export const Textarea: React.FC<TextareaProps> = ({ label, ...rest }) => {
return (
<label className="flex flex-col gap-1 text-sm">
{label && <span className="font-medium">{label}</span>}
<textarea {...rest} className="border rounded-md px-3 py-2 min-h-[120px]" />
</label>
);
};


export default Textarea;
