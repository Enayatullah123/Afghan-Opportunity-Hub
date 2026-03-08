import React, { useEffect, useState } from 'react';
import { getContactSettings, saveContactSettings } from './utils.js';

const ContactSettings = () => {
  const [form, setForm] = useState({
    email: '',
    facebookUrl: '',
    youtubeUrl: '',
    location: '',
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const s = getContactSettings();
    setForm({
      email: s.email || '',
      facebookUrl: s.facebookUrl || '',
      youtubeUrl: s.youtubeUrl || '',
      location: s.location || '',
    });
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    saveContactSettings(form);
    setStatus('Saved');
    setTimeout(() => setStatus(''), 2000);
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Contact Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Link</label>
          <input name="facebookUrl" value={form.facebookUrl} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Link</label>
          <input name="youtubeUrl" value={form.youtubeUrl} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input name="location" value={form.location} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="flex items-center gap-2">
          <button type="submit" className="px-4 py-2 bg-[#1E73BE] text-white rounded">Save</button>
          {status && <span className="text-sm text-green-600">{status}</span>}
        </div>
      </form>
    </div>
  );
};

export default ContactSettings;
