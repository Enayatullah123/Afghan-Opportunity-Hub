import React, { useEffect, useState } from 'react';
import { fetchPostsByType, savePost, updatePost, deletePost } from './utils.js';

const emptyForm = {
  title: '',
  description: '',
  details: '',
  image: '',
};

const ServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [uploadError, setUploadError] = useState('');

  const loadServices = () => {
    setServices(fetchPostsByType('service'));
  };

  useEffect(() => {
    loadServices();
    window.addEventListener('dataUpdated', loadServices);
    return () => window.removeEventListener('dataUpdated', loadServices);
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'image' && uploadError) {
      setUploadError('');
    }
  };

  const onImageFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = typeof reader.result === 'string' ? reader.result : '';
      if (!base64) {
        setUploadError('Could not read image file. Try another image.');
        return;
      }
      setUploadError('');
      setForm((prev) => ({ ...prev, image: base64 }));
    };
    reader.onerror = () => {
      setUploadError('Image upload failed. Try again.');
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setUploadError('');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      alert('Service title is required.');
      return;
    }

    const payload = {
      type: 'service',
      title: { en: form.title.trim() },
      description: { en: form.description.trim() },
      details: form.details.trim(),
      image: form.image.trim(),
    };

    if (editingId) {
      updatePost(editingId, payload);
      alert('Service updated.');
    } else {
      savePost({
        id: Date.now(),
        ...payload,
        createdAt: new Date().toISOString(),
      });
      alert('Service created.');
    }

    resetForm();
    loadServices();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title?.en || '',
      description: item.description?.en || '',
      details: item.details || '',
      image: item.image || '',
    });
  };

  const onDelete = (id) => {
    if (!window.confirm('Delete this service card?')) return;
    deletePost(id);
    loadServices();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Services Management</h2>
      <p className="text-sm text-gray-600 mb-6">Manage services cards shown on the Services page, including image URL.</p>

      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Service Title</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              className="p-2 border rounded w-full"
              placeholder="e.g. Website Development"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL (optional)</label>
            <input
              name="image"
              value={form.image}
              onChange={onChange}
              className="p-2 border rounded w-full"
              placeholder="https://..."
            />
            <div className="mt-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Or upload image from computer</label>
              <input
                type="file"
                accept="image/*"
                onChange={onImageFileChange}
                className="block w-full text-sm text-gray-700 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-[#1E73BE] hover:file:bg-blue-100"
              />
              {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}
            </div>
          </div>
        </div>

        {form.image && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image Preview</label>
            <img src={form.image} alt="Service preview" className="w-48 h-24 object-cover rounded border border-gray-200" />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows="3"
            className="p-2 border rounded w-full"
            placeholder="Short service description"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Details</label>
          <textarea
            name="details"
            value={form.details}
            onChange={onChange}
            rows="2"
            className="p-2 border rounded w-full"
            placeholder="Includes: ..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="px-5 py-2 bg-[#1E73BE] text-white rounded hover:bg-blue-700">
            {editingId ? 'Update Service' : 'Add Service'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {services.length === 0 && (
          <div className="text-sm text-gray-600 bg-white p-4 rounded border">
            No custom services yet. The website will use default service cards until you add items here.
          </div>
        )}

        {services.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900">{item.title?.en || 'Untitled Service'}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description?.en || ''}</p>
              {item.details && <p className="text-xs text-gray-500 mt-1">{item.details}</p>}
              {item.image && <p className="text-xs text-blue-600 mt-1 break-all">Image: {item.image}</p>}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => startEdit(item)} className="px-3 py-1.5 bg-yellow-400 rounded hover:bg-yellow-500">Edit</button>
              <button onClick={() => onDelete(item.id)} className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesAdmin;
