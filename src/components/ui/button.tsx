import React from 'react';


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
variant?: 'primary' | 'secondary' | 'ghost';
loading?: boolean;
};


export const Button: React.FC<ButtonProps> = ({
children,
variant = 'primary',
loading = false,
...rest
}) => {
const base = 'px-4 py-2 rounded-md font-semibold inline-flex items-center gap-2';
const variants: Record<string, string> = {
primary: 'bg-blue-600 text-white hover:bg-blue-700',
secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
ghost: 'bg-transparent text-blue-600 hover:underline',
};
return (
<button className={`${base} ${variants[variant]}`} disabled={loading || rest.disabled} {...rest}>
{loading && <span className="loader" aria-hidden />}
<span>{children}</span>
</button>
);
};


export default Button;
