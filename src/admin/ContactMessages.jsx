import React, { useEffect, useState } from 'react';
import { getMessages, deleteMessage, updateMessage } from './utils.js';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);

  const load = () => {
    const all = getMessages() || [];
    // filter contact messages
    setMessages(all.filter(m => m.type === 'contact'));
  };

  useEffect(() => {
    load();
    const handler = () => load();
    window.addEventListener('dataUpdated', handler);
    return () => window.removeEventListener('dataUpdated', handler);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this message?')) return;
    deleteMessage(id);
    load();
  };

  const markRead = (id) => {
    updateMessage(id, { status: 'read' });
    load();
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Contact Messages</h2>
      {messages.length === 0 ? (
        <div className="text-gray-600">No contact messages yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Message</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(m => (
                <tr key={m.id} className="border-t">
                  <td className="p-2 align-top">{m.name}</td>
                  <td className="p-2 align-top">{m.email}</td>
                  <td className="p-2 align-top max-w-lg"><div className="truncate">{m.message}</div></td>
                  <td className="p-2 align-top">{new Date(m.createdAt).toLocaleString()}</td>
                  <td className="p-2 align-top">{m.status || 'pending'}</td>
                  <td className="p-2 align-top">
                    <div className="flex gap-2">
                      {m.status !== 'read' && <button onClick={() => markRead(m.id)} className="px-3 py-1 bg-green-100 text-green-700 rounded">Mark read</button>}
                      <button onClick={() => handleDelete(m.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
