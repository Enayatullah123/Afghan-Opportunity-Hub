import React, { useState } from 'react';
import { addResource, validateFile, fileToBase64, getFileNameFromBase64 } from './utils.js';
import { Upload, FileText, AlertCircle } from 'lucide-react';

const AddResource = ({ onSaved }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('cv');
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    
    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error);
      setFileData(null);
      setFileName('');
      return;
    }

    // Convert to Base64
    setIsLoading(true);
    try {
      const base64 = await fileToBase64(file);
      setFileData(base64);
      setFileName(file.name);
    } catch (err) {
      setError('Failed to read file. Please try again.');
      setFileData(null);
      setFileName('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      return;
    }

    if (!fileData) {
      setError('Please select a file (PDF, DOC, or DOCX)');
      return;
    }

    try {
      const resource = {
        id: Date.now(),
        title,
        description,
        category,
        fileUrl: fileData, // Store Base64 data
        fileName: getFileNameFromBase64(fileData),
        createdAt: new Date().toISOString(),
      };

      addResource(resource);

      // Reset form
      setTitle('');
      setDescription('');
      setCategory('cv');
      setFileData(null);
      setFileName('');
      setError('');

      alert('Resource uploaded successfully!');
      if (onSaved) onSaved();
    } catch (err) {
      setError('Failed to upload resource. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6 border-l-4 border-[#1E73BE]">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5 text-[#1E73BE]" />
        Add New Resource
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex gap-2 items-start">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resource Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Professional CV Template"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent"
          >
            <option value="cv">CV/Resume Templates</option>
            <option value="motivation">Motivation Letter Templates</option>
            <option value="guide">Checklists & Guides</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe this resource..."
            className="w-full p-2 border rounded focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent"
            rows="3"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload File *</label>
          <div className="border-2 border-dashed border-[#1E73BE] rounded-lg p-6 bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              disabled={isLoading}
              className="hidden"
              id="file-input"
              required
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                <FileText className="w-12 h-12 text-[#1E73BE] mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  {isLoading ? 'Processing...' : 'Click to select or drag & drop'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
              </div>
            </label>
          </div>
          {fileName && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700 font-medium">{fileName}</span>
              <span className="text-xs text-green-600">✓ Ready to upload</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading || !fileData}
            className="flex-1 px-4 py-2 bg-[#1E73BE] text-white rounded hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Processing...' : 'Upload Resource'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddResource;
