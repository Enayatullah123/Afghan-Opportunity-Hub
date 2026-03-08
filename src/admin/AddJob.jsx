import React, { useState } from 'react';
import { savePost } from './utils.js';

const initialTitles = { en: '' };

const AddJob = () => {
  const [title, setTitle] = useState(initialTitles);
  const [description, setDescription] = useState(initialTitles);
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [nationality, setNationality] = useState('');
  const [category, setCategory] = useState('');
  const [jobOrganizationType, setJobOrganizationType] = useState('NGOs');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [jobType, setJobType] = useState('Full Time');
  const [contractDuration, setContractDuration] = useState('');
  const [gender, setGender] = useState('Male/Female');
  const [vacancyNumber, setVacancyNumber] = useState('');
  const [education, setEducation] = useState('');
  const [numberOfJobs, setNumberOfJobs] = useState('1');
  const [eligibility, setEligibility] = useState('');
  const [requirements, setRequirements] = useState('');
  const [deadline, setDeadline] = useState('');
  const [salary, setSalary] = useState('');
  const [applyLink, setApplyLink] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [submissionEmail, setSubmissionEmail] = useState('');
  const [submissionGuideline, setSubmissionGuideline] = useState('');
  const [status, setStatus] = useState('verified');
  const [successTips, setSuccessTips] = useState('');
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
      type: 'job',
      title,
      description,
      company,
      location,
      city,
      nationality,
      category,
      jobOrganizationType,
      yearsOfExperience,
      jobType,
      contractDuration,
      gender,
      vacancyNumber,
      education,
      numberOfJobs,
      eligibility,
      requirements,
      deadline,
      salary,
      applyLink,
      videoLink,
      submissionEmail,
      submissionGuideline,
      status,
      successTips,
      pdf,
      createdAt: new Date().toISOString(),
    };
    savePost(post);
    setTitle(initialTitles);
    setDescription(initialTitles);
    setCompany('');
    setLocation('');
    setCity('');
    setNationality('');
    setCategory('');
    setJobOrganizationType('NGOs');
    setYearsOfExperience('');
    setJobType('Full Time');
    setContractDuration('');
    setGender('Male/Female');
    setVacancyNumber('');
    setEducation('');
    setNumberOfJobs('1');
    setEligibility('');
    setRequirements('');
    setDeadline('');
    setSalary('');
    setApplyLink('');
    setVideoLink('');
    setSubmissionEmail('');
    setSubmissionGuideline('');
    setStatus('verified');
    setSuccessTips('');
    setPdf(null);
    alert('Job saved (localStorage)');
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title *</label>
          <input placeholder="Job Title (EN)" value={title.en} onChange={e=>setTitle({ en: e.target.value })} className="p-2 border rounded w-full" required />
        </div>

        {/* Job Location & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Job Location</label>
            <input placeholder="e.g., Kabul" value={location} onChange={e=>setLocation(e.target.value)} className="p-2 border rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
            <input placeholder="e.g., Kabul" value={city} onChange={e=>setCity(e.target.value)} className="p-2 border rounded w-full" />
          </div>
        </div>

        {/* Nationality & Organization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nationality</label>
            <input placeholder="e.g., Afghan" value={nationality} onChange={e=>setNationality(e.target.value)} className="p-2 border rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Organization</label>
            <input placeholder="Company/Organization Name" value={company} onChange={e=>setCompany(e.target.value)} className="p-2 border rounded w-full" />
          </div>
        </div>

        {/* Job Organization Type & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Job Organization Type *</label>
            <select value={jobOrganizationType} onChange={e=>setJobOrganizationType(e.target.value)} className="p-2 border rounded w-full" required>
              <option value="NGOs">NGOs</option>
              <option value="Government">Government</option>
              <option value="Online">Online</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <input placeholder="e.g., Banking, IT, Education" value={category} onChange={e=>setCategory(e.target.value)} className="p-2 border rounded w-full" />
          </div>
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Years of Experience</label>
          <input placeholder="e.g., 1-2, 3-5" value={yearsOfExperience} onChange={e=>setYearsOfExperience(e.target.value)} className="p-2 border rounded w-full" />
        </div>

        {/* Employment Type & Contract Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Employment Type</label>
            <select value={jobType} onChange={e=>setJobType(e.target.value)} className="p-2 border rounded w-full">
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
              <option>Remote</option>
              <option>Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contract Duration</label>
            <input placeholder="e.g., 5 months, 1 year" value={contractDuration} onChange={e=>setContractDuration(e.target.value)} className="p-2 border rounded w-full" />
          </div>
        </div>

        {/* Salary & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Salary</label>
            <input placeholder="e.g., As Per Organization Salary Range" value={salary} onChange={e=>setSalary(e.target.value)} className="p-2 border rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
            <select value={gender} onChange={e=>setGender(e.target.value)} className="p-2 border rounded w-full">
              <option>Male/Female</option>
              <option>Male</option>
              <option>Female</option>
              <option>Any</option>
            </select>
          </div>
        </div>

        {/* Vacancy Number & Number of Jobs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Vacancy Number</label>
            <input placeholder="e.g., GB/EAD/32" value={vacancyNumber} onChange={e=>setVacancyNumber(e.target.value)} className="p-2 border rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">No. Of Jobs</label>
            <input type="number" placeholder="e.g., 1" value={numberOfJobs} onChange={e=>setNumberOfJobs(e.target.value)} className="p-2 border rounded w-full" min="1" />
          </div>
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
          <textarea placeholder="e.g., Bachelor's degree in Human Resources, Business Administration, Education, or a related field. • Certifications in Training & Development, Instructional Design, or related areas are advantageous." value={education} onChange={e=>setEducation(e.target.value)} className="p-2 border rounded w-full" rows="3" />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Job Description (EN) *</label>
          <textarea placeholder="Detailed job description..." value={description.en} onChange={e=>setDescription({ en: e.target.value })} className="p-2 border rounded w-full" rows="4" required />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Job Requirements & Qualifications *</label>
          <textarea placeholder="Job requirements and qualifications..." value={requirements} onChange={e=>setRequirements(e.target.value)} className="p-2 border rounded w-full" rows="4" required />
        </div>

        {/* Close Date (Deadline) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Close Date *</label>
          <input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)} className="p-2 border rounded w-full" required />
        </div>

        {/* Apply Link & Video Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Apply Link URL (Optional)</label>
            <input placeholder="https://... (external application portal)" value={applyLink} onChange={e=>setApplyLink(e.target.value)} className="p-2 border rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">YouTube Video Link/ID</label>
            <input placeholder="Video URL or ID" value={videoLink} onChange={e=>setVideoLink(e.target.value)} className="p-2 border rounded w-full" />
          </div>
        </div>

        {/* Submission Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Submission Email Address *</label>
          <input type="email" placeholder="e.g., sr.recruitment-officer@company.com" value={submissionEmail} onChange={e=>setSubmissionEmail(e.target.value)} className="p-2 border rounded w-full" required />
          <p className="text-xs text-gray-500 mt-1">Applicants will submit their CV via this email address</p>
        </div>

        {/* Submission Guideline */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Submission Guideline *</label>
          <textarea placeholder="e.g., Applicants who meet the above requirements should submit their updated CV/Resume to the email above. Please mention the specific Job Title in the email subject line. Only shortlisted candidates will be contacted for further recruitment process." value={submissionGuideline} onChange={e=>setSubmissionGuideline(e.target.value)} className="p-2 border rounded w-full" rows="4" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Verification Status</label>
            <select value={status} onChange={e=>setStatus(e.target.value)} className="p-2 border rounded w-full">
              <option value="verified">Verified</option>
              <option value="pending">Pending Review</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Success Tips</label>
            <textarea placeholder="Share practical tips to improve application success..." value={successTips} onChange={e=>setSuccessTips(e.target.value)} className="p-2 border rounded w-full" rows="2" />
          </div>
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Upload PDF (Job Description/Details)</label>
          <input type="file" accept="application/pdf" onChange={e=>handleFile(e.target.files[0])} className="p-2 border rounded w-full" />
          {pdf && <p className="text-sm mt-2 text-green-600">✓ Uploaded: {pdf.name}</p>}
        </div>

        <div>
          <button type="submit" className="bg-[#28A745] hover:bg-green-700 text-white px-6 py-3 rounded font-semibold transition-colors">Submit Job</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
