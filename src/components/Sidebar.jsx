import React from 'react';
import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) => `block px-4 py-2 rounded-md ${isActive ? 'bg-brand text-white' : 'text-slate-700 hover:bg-slate-100'}`;

export default function Sidebar() {
  return (
    <aside className="w-64 hidden lg:block border-r bg-white h-[calc(100vh-56px)]">
      <div className="p-4">
        <div className="mb-6 text-sm text-slate-500">Admin Panel</div>
        <nav className="space-y-1">
          <NavLink to="/dashboard" className={linkClass}>Overview</NavLink>
          <NavLink to="/dashboard/users" className={linkClass}>Users</NavLink>
          <NavLink to="/blog" className={linkClass}>Blog</NavLink>
        </nav>
      </div>
    </aside>
  );
}
