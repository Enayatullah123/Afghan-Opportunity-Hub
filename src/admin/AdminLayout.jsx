import React from 'react';
import Sidebar from './Sidebar.jsx';

const AdminLayout = ({ children, onLogout }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
