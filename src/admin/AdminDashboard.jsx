import React from 'react';
import { getPosts, getMessages } from './utils.js';

const AdminDashboard = () => {
  const posts = getPosts();
  const messages = getMessages();
  const counts = posts.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Total Posts</h3>
          <div className="text-3xl font-bold">{posts.length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Scholarships</h3>
          <div className="text-3xl font-bold">{counts.scholarship || 0}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Jobs</h3>
          <div className="text-3xl font-bold">{counts.job || 0}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Resources</h3>
          <div className="text-3xl font-bold">{counts.resource || 0}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Success Stories</h3>
          <div className="text-3xl font-bold">{counts['success-story'] || 0}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Messages</h3>
          <div className="text-3xl font-bold">{messages.length}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
