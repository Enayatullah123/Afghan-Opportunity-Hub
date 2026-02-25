import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Sidebar = () => {
  const linkClass = (isActive) => `flex items-center gap-2 py-3 px-4 rounded-md ${isActive ? 'bg-white text-[#1E73BE] font-semibold' : 'text-gray-700 hover:bg-white'}`;

  return (
    <aside className="w-64 bg-[#F3F4F6] p-4 border-r">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Admin</h2>
        <p className="text-sm text-gray-600">Control Panel</p>
      </div>

      <nav className="space-y-2">
        <NavLink to="/admin" end className={({isActive}) => linkClass(isActive)}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/admin/add-scholarship" className={({isActive}) => linkClass(isActive)}>
          🎓 Add Scholarship
        </NavLink>
        <NavLink to="/admin/add-job" className={({isActive}) => linkClass(isActive)}>
          💼 Add Job
        </NavLink>
        <NavLink to="/admin/resources" className={({isActive}) => linkClass(isActive)}>
          📁 Resources (PDFs)
        </NavLink>
        <NavLink to="/admin/portfolio" className={({isActive}) => linkClass(isActive)}>
          🖼️ Portfolio Management
        </NavLink>
        <NavLink to="/admin/pricing" className={({isActive}) => linkClass(isActive)}>
          💳 Pricing Management
        </NavLink>
        <NavLink to="/admin/reviews" className={({isActive}) => linkClass(isActive)}>
          ⭐ Client Reviews
        </NavLink>
        <NavLink to="/admin/contact-settings" className={({isActive}) => linkClass(isActive)}>
          📬 Contact Settings
        </NavLink>
        <NavLink to="/admin/manage-posts" className={({isActive}) => linkClass(isActive)}>
          ✏️ Manage Posts
        </NavLink>
        <NavLink to="/admin/messages" className={({isActive}) => linkClass(isActive)}>
          <Mail className="w-4 h-4" /> Messages
        </NavLink>
        <NavLink to="/admin/contact-messages" className={({isActive}) => linkClass(isActive)}>
          💬 Contact Messages
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
