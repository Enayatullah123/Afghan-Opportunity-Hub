import React, { useEffect, useState } from 'react';
import { getResources, addResource, updateResource, deleteResource, validateFile, fileToBase64, getFileNameFromBase64 } from './utils.js';
import { Edit2, Trash2, Plus, Eye, FileText } from 'lucide-react';

const categoryLabels = {
  cv: 'CV/Resume Templates',
  motivation: 'Motivation Letter Templates',
  guide: 'Checklists & Guides',
};

const ResourcesAdmin = () => {
  const [resources, setResources] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'cv',
    fileUrl: '',
    fileName: '',
  });
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadResources();
    const handler = () => loadResources();
    window.addEventListener('dataUpdated', handler);
    return () => window.removeEventListener('dataUpdated', handler);
  }, []);

  const loadResources = () => {
    try {
      setResources(getResources());
    } catch (e) {
      setResources([]);
    }
  };

  const handleAdd = () => {
    setEditing(null);
    setFormData({ title: '', description: '', category: 'cv', fileUrl: '' });
    setShowForm(true);
  };

  const handleEdit = (resource) => {
    setEditing(resource);
    setFormData({
      title: resource.title?.en || resource.title || '',
      description: resource.description?.en || resource.description || '',
      category: resource.category || 'cv',
      fileUrl: resource.fileUrl || '',
      fileName: resource.fileName || '',
    });
    setFileName(resource.fileName || '');
    setFileData(null);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      return;
    }

    // Ensure fileUrl present (either existing or newly uploaded)
    if (!formData.fileUrl || !formData.fileUrl.trim()) {
      setError('Please upload a file for this resource');
      return;
    }

    if (editing) {
      const payload = { ...formData, fileName: fileName || formData.fileName };
      updateResource(editing.id, payload);
      alert('Resource updated!');
    } else {
      const payload = { ...formData, fileName: fileName || formData.fileName };
      addResource(payload);
      alert('Resource added!');
    }

    setShowForm(false);
    loadResources();
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this resource?')) return;
    deleteResource(id);
    loadResources();
  };

  const handlePreview = (fileUrl) => {
    if (fileUrl && fileUrl.startsWith('data:')) {
      setPreviewUrl(fileUrl);
    } else if (fileUrl && fileUrl.startsWith('http')) {
      window.open(fileUrl, '_blank');
    } else {
      alert('Invalid file URL');
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError('');

    const v = validateFile(file);
    if (!v.valid) {
      setError(v.error);
      return;
    }

    setIsLoading(true);
    try {
      const base64 = await fileToBase64(file);
      // Save both base64 and filename into formData
      setFormData(prev => ({ ...prev, fileUrl: base64, fileName: file.name }));
      setFileData(base64);
      setFileName(file.name);
    } catch (err) {
      setError('Failed to read file');
    } finally {
      setIsLoading(false);
    }
  };

  const resourcesByCategory = {
    cv: resources.filter(r => r.category === 'cv'),
    motivation: resources.filter(r => r.category === 'motivation'),
    guide: resources.filter(r => r.category === 'guide'),
  };

  return (
    <div className="space-y-6">
      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">Preview</h3>
              <button
                onClick={() => setPreviewUrl(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <iframe
                src={previewUrl}
                className="w-full h-full"
                title="File Preview"
              />
            </div>
            <div className="p-4 border-t bg-gray-50 flex gap-2 justify-end">
              <button
                onClick={() => window.open(previewUrl, '_blank')}
                className="px-4 py-2 bg-[#1E73BE] text-white rounded hover:bg-blue-700"
              >
                Open in New Tab
              </button>
              <button
                onClick={() => setPreviewUrl(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resources Management</h2>
          <p className="text-sm text-gray-600 mt-1">Total: {resources.length} resources</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#1E73BE] text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <Plus className="w-5 h-5" /> Add Resource
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">{editing ? 'Edit Resource' : 'Add New Resource'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Professional CV Template"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent"
              >
                <option value="cv">CV/Resume Templates</option>
                <option value="motivation">Motivation Letter Templates</option>
                <option value="guide">Checklists & Guides</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe this resource..."
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload File *</label>
              <div className="border-2 border-dashed border-[#1E73BE] rounded-lg p-4 bg-blue-50">
                <input
                  id="admin-resource-file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-2">Allowed: PDF, DOC, DOCX (max 5MB)</p>
                {isLoading && <p className="text-sm text-gray-600 mt-2">Processing file...</p>}
                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                {fileName && (
                  <p className="text-sm text-blue-700 mt-2">Selected file: {fileName}</p>
                )}
                {!fileName && formData.fileName && (
                  <p className="text-sm text-gray-700 mt-2">Current file: {formData.fileName}</p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#1E73BE] text-white rounded hover:bg-blue-700 font-medium"
              >
                {editing ? 'Update Resource' : 'Add Resource'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Resources by Category */}
      {Object.entries(resourcesByCategory).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-lg font-bold text-gray-900 mb-4">{categoryLabels[category]}</h3>
          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-4 text-gray-500">
              No resources in this category
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white rounded-lg shadow p-4 flex items-start justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#1E73BE]" />
                      <h4 className="font-semibold text-gray-900">{resource.title?.en || 'Untitled'}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 ml-7">{resource.description?.en || ''}</p>
                    <p className="text-xs text-gray-500 mt-2 ml-7">
                      Added: {new Date(resource.createdAt).toLocaleDateString()}
                    </p>
                    {resource.fileName && (
                      <p className="text-xs text-blue-600 mt-1 ml-7">File: {resource.fileName}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    {resource.fileUrl && (
                      <button
                        onClick={() => handlePreview(resource.fileUrl)}
                        className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(resource)}
                      className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(resource.id)}
                      className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResourcesAdmin;
