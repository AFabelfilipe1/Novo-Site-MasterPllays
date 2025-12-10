import React from 'react';
import { Link } from 'react-router-dom';


export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
return (
<div className="min-h-screen bg-slate-50 text-slate-900">
<header className="bg-white border-b py-3 px-4 flex items-center justify-between">
<Link to="/" className="font-bold text-lg">MasterPllays</Link>
<nav className="flex gap-3">
<Link to="/movies">Movies</Link>
<Link to="/games">Games</Link>
<Link to="/vlogs">Vlogs</Link>
</nav>
</header>
<main className="p-6 max-w-6xl mx-auto">{children}</main>
<footer className="py-6 text-center text-sm text-gray-600">© MasterPllays</footer>
</div>
);
};


export default Layout;
