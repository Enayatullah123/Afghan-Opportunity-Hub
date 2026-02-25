import React, { useEffect, useState } from 'react';
import { getPortfolios, addPortfolio, updatePortfolio, deletePortfolio, validateImageFile, fileToBase64 } from './utils.js';

const PortfolioAdmin = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'Web', description: '', image: '', projectLink: '' });
  const [fileError, setFileError] = useState('');

  useEffect(() => { load(); const h=()=>load(); window.addEventListener('dataUpdated',h); return ()=>window.removeEventListener('dataUpdated',h); }, []);
  const load = () => setItems(getPortfolios() || []);

  const handleChange = (e) => setForm(prev=>({...prev,[e.target.name]: e.target.value}));

  const handleFile = async (e) => {
    const f = e.target.files[0];
    if(!f) return;
    const v = validateImageFile(f);
    if(!v.valid) { setFileError(v.error); return; }
    setFileError('');
    const b = await fileToBase64(f);
    setForm(prev=>({...prev, image: b}));
  };

  const handleEdit = (it) => { setEditing(it); setForm({ title: it.title?.en||'', category: it.category||'Web', description: it.description?.en||'', image: it.image||'', projectLink: it.projectLink||'' }); setShowForm(true); }

  const handleSubmit = (e) => { e.preventDefault(); if(!form.title.trim()) return alert('Title required'); const payload = { title: form.title.trim(), category: form.category, description: form.description.trim(), image: form.image, projectLink: form.projectLink }; if(editing){ updatePortfolio(editing.id, payload); alert('Updated'); } else { addPortfolio(payload); alert('Added'); } setShowForm(false); load(); }

  const handleDelete = (id) => { if(!window.confirm('Delete?')) return; deletePortfolio(id); load(); }

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Portfolio Management</h2>
        <button onClick={()=>{ setShowForm(s=>!s); setEditing(null); setForm({ title:'', category:'Web', description:'', image:'', projectLink:'' }); }} className="px-3 py-2 bg-[#1E73BE] text-white rounded">{showForm? 'Close' : 'Add Project'}</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-3 mb-4 bg-gray-50 p-4 rounded">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
              <option>Web</option>
              <option>App</option>
              <option>UI/UX</option>
              <option>Logo</option>
              <option>Video</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" rows="3" />
          </div>
          <div>
            <label className="block text-sm font-medium">Image (upload or paste URL)</label>
            <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="paste image URL or use file input" className="w-full p-2 border rounded mb-2" />
            <input type="file" accept=".png,.jpg,.jpeg,.webp,.gif,image/png,image/jpeg,image/jpg,image/webp,image/gif" onChange={handleFile} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            {fileError && <div className="text-sm text-red-600 mt-1">{fileError}</div>}
            <p className="text-xs text-gray-500 mt-1">Supported formats: PNG, JPG, JPEG, WEBP, GIF (Max 5MB)</p>
          </div>
          <div>
            <label className="block text-sm font-medium">Project Link (optional)</label>
            <input name="projectLink" value={form.projectLink} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-[#1E73BE] text-white rounded">Save</button>
            <button type="button" onClick={()=>{ setShowForm(false); }} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.map(it=> (
          <div key={it.id} className="flex items-center justify-between border p-3 rounded">
            <div className="flex items-center gap-4">
              <img src={it.image} alt={it.title?.en||''} className="w-20 h-12 object-cover rounded" />
              <div>
                <div className="font-semibold">{it.title?.en}</div>
                <div className="text-sm text-gray-600">{it.category}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>handleEdit(it)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded">Edit</button>
              <button onClick={()=>handleDelete(it.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioAdmin;
