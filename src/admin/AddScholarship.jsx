import React, { useState } from 'react';
import { savePost } from './utils.js';

const initialTitles = { en: '' };

const AddScholarship = () => {
  const [title, setTitle] = useState(initialTitles);
  const [description, setDescription] = useState(initialTitles);
  const [country, setCountry] = useState('');
  const [organization, setOrganization] = useState('');
  const [scholarshipType, setScholarshipType] = useState('Fully Funded');
  const [eligibility, setEligibility] = useState('');
  const [requirements, setRequirements] = useState('');
  const [deadline, setDeadline] = useState('');
  const [stipend, setStipend] = useState('');
  const [applyLink, setApplyLink] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [pdf, setPdf] = useState(null);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPdf({ name: file.name, dataUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: Date.now(),
      type: 'scholarship',
      title,
      description,
      country,
      organization,
      scholarshipType,
      eligibility,
      requirements,
      deadline,
      stipend,
      applyLink,
      videoLink,
      pdf,
      createdAt: new Date().toISOString(),
    };
    savePost(post);
    // clear form
    setTitle(initialTitles);
    setDescription(initialTitles);
    setCountry('');
    setOrganization('');
    setScholarshipType('Fully Funded');
    setEligibility('');
    setRequirements('');
    setDeadline('');
    setStipend('');
    setApplyLink('');
    setVideoLink('');
    setPdf(null);
    alert('Scholarship saved (localStorage)');
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Scholarship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title & Organization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input placeholder="Scholarship Title (EN)" value={title.en} onChange={e=>setTitle({ en: e.target.value })} className="p-2 border rounded" required />
          <input placeholder="Organization/Provider" value={organization} onChange={e=>setOrganization(e.target.value)} className="p-2 border rounded" />
        </div>

        {/* Country & Scholarship Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input placeholder="Country" value={country} onChange={e=>setCountry(e.target.value)} className="p-2 border rounded" />
          <select value={scholarshipType} onChange={e=>setScholarshipType(e.target.value)} className="p-2 border rounded">
            <option>Fully Funded</option>
            <option>Partial Scholarship</option>
          </select>
        </div>

        {/* Eligibility & Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input placeholder="Eligibility Criteria" value={eligibility} onChange={e=>setEligibility(e.target.value)} className="p-2 border rounded" />
          <input placeholder="Stipend / Award Amount" value={stipend} onChange={e=>setStipend(e.target.value)} className="p-2 border rounded" />
        </div>

        {/* Description */}
        <div>
          <textarea placeholder="Scholarship Description (EN)" value={description.en} onChange={e=>setDescription({ en: e.target.value })} className="p-2 border rounded w-full" rows="3" />
        </div>

        {/* Requirements */}
        <div>
          <textarea placeholder="Requirements" value={requirements} onChange={e=>setRequirements(e.target.value)} className="p-2 border rounded w-full" rows="3" />
        </div>

        {/* Deadline, Apply Link, Video Link */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)} className="p-2 border rounded" />
          <input placeholder="Apply Link URL" value={applyLink} onChange={e=>setApplyLink(e.target.value)} className="p-2 border rounded" />
          <input placeholder="YouTube Video ID" value={videoLink} onChange={e=>setVideoLink(e.target.value)} className="p-2 border rounded" />
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF (Syllabus/Document)</label>
          <input type="file" accept="application/pdf" onChange={e=>handleFile(e.target.files[0])} />
          {pdf && <p className="text-sm mt-2">Uploaded: {pdf.name}</p>}
        </div>

        <div>
          <button className="bg-[#1E73BE] text-white px-4 py-2 rounded">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
