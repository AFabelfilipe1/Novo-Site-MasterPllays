import React from 'react';


export const Tabs: React.FC<{
tabs: { id: string; label: string }[];
activeId: string;
onChange: (id: string) => void;
}> = ({ tabs, activeId, onChange }) => {
return (
<div className="flex gap-2 border-b">
{tabs.map(t => (
<button
key={t.id}
onClick={() => onChange(t.id)}
className={`px-3 py-2 -mb-px ${t.id === activeId ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'}`}>
{t.label}
</button>
))}
</div>
);
};


export default Tabs;
