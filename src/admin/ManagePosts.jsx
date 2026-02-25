import React, { useState, useEffect } from 'react';
import { getPosts, deletePost, updatePost } from './utils.js';

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(()=>{
    setPosts(getPosts());
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this post?')) return;
    const updated = deletePost(id);
    setPosts(updated);
  };

  const handleEdit = (post) => {
    setEditing(post);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = { en: form.title_en.value };
    const description = { en: form.desc_en.value };
    
    const updatedData = { 
      title, 
      description, 
      deadline: form.deadline.value, 
      applyLink: form.applyLink.value,
      videoLink: form.videoLink?.value || editing.videoLink
    };

    // Add job-specific fields if editing a job
    if (editing.type === 'job') {
      updatedData.company = form.company?.value || editing.company;
      updatedData.location = form.location?.value || editing.location;
      updatedData.city = form.city?.value || editing.city;
      updatedData.nationality = form.nationality?.value || editing.nationality;
      updatedData.category = form.category?.value || editing.category;
      updatedData.jobOrganizationType = form.jobOrganizationType?.value || editing.jobOrganizationType;
      updatedData.yearsOfExperience = form.yearsOfExperience?.value || editing.yearsOfExperience;
      updatedData.jobType = form.jobType?.value || editing.jobType;
      updatedData.contractDuration = form.contractDuration?.value || editing.contractDuration;
      updatedData.gender = form.gender?.value || editing.gender;
      updatedData.vacancyNumber = form.vacancyNumber?.value || editing.vacancyNumber;
      updatedData.education = form.education?.value || editing.education;
      updatedData.numberOfJobs = form.numberOfJobs?.value || editing.numberOfJobs;
      updatedData.requirements = form.requirements?.value || editing.requirements;
      updatedData.salary = form.salary?.value || editing.salary;
      updatedData.submissionEmail = form.submissionEmail?.value || editing.submissionEmail;
      updatedData.submissionGuideline = form.submissionGuideline?.value || editing.submissionGuideline;
      updatedData.eligibility = form.eligibility?.value || editing.eligibility;
    }

    // Add scholarship-specific fields if editing a scholarship
    if (editing.type === 'scholarship') {
      updatedData.country = form.country?.value || editing.country;
      updatedData.organization = form.organization?.value || editing.organization;
      updatedData.scholarshipType = form.scholarshipType?.value || editing.scholarshipType;
      updatedData.eligibility = form.eligibility?.value || editing.eligibility;
      updatedData.requirements = form.requirements?.value || editing.requirements;
      updatedData.stipend = form.stipend?.value || editing.stipend;
    }

    updatePost(editing.id, updatedData);
    setPosts(getPosts());
    setEditing(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Posts</h2>

      <div className="space-y-4">
        {posts.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow flex justify-between items-start">
            <div>
              <div className="font-semibold">{p.title?.en || 'Untitled'}</div>
              <div className="text-sm text-gray-600">{p.type} • {new Date(p.createdAt).toLocaleString()}</div>
            </div>
            <div className="space-x-2">
              <button onClick={()=>handleEdit(p)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
              <button onClick={()=>handleDelete(p.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="mt-6 bg-white p-6 rounded shadow max-w-5xl">
          <h3 className="font-semibold mb-4 text-xl">Edit Post</h3>
          <form onSubmit={saveEdit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title (English)</label>
              <input name="title_en" defaultValue={(editing.title && editing.title.en) || ''} className="p-2 border rounded w-full" placeholder="Enter title" />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description (English)</label>
              <textarea name="desc_en" rows="4" defaultValue={(editing.description && editing.description.en) || ''} className="p-2 border rounded w-full" placeholder="Enter description" />
            </div>

            {/* Job-specific fields */}
            {editing.type === 'job' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Organization/Company</label>
                    <input name="company" defaultValue={editing.company || ''} className="p-2 border rounded w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Job Location</label>
                    <input name="location" defaultValue={editing.location || ''} className="p-2 border rounded w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                    <input name="city" defaultValue={editing.city || ''} className="p-2 border rounded w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nationality</label>
                    <input name="nationality" defaultValue={editing.nationality || ''} className="p-2 border rounded w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <input name="category" defaultValue={editing.category || ''} className="p-2 border rounded w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Organization Type</label>
                    <select name="jobOrganizationType" defaultValue={editing.jobOrganizationType || 'NGOs'} className="p-2 border rounded w-full">
                      <option value="NGOs">NGOs</option>
                      <option value="Government">Government</option>
                      <option value="Online">Online</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Years of Experience</label>
                    <input name="yearsOfExperience" defaultValue={editing.yearsOfExperience || ''} className="p-2 border rounded w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Job Type</label>
                    <select name="jobType" defaultValue={editing.jobType || 'Full Time'} className="p-2 border rounded w-full">
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                    <select name="gender" defaultValue={editing.gender || 'Male/Female'} className="p-2 border rounded w-full">
                      <option value="Male/Female">Male/Female</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Contract Duration</label>
                    <input name="contractDuration" defaultValue={editing.contractDuration || ''} className="p-2 border rounded w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Vacancy Number</label>
                    <input name="vacancyNumber" defaultValue={editing.vacancyNumber || ''} className="p-2 border rounded w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Jobs</label>
                    <input name="numberOfJobs" defaultValue={editing.numberOfJobs || '1'} className="p-2 border rounded w-full" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Salary</label>
                  <input name="salary" defaultValue={editing.salary || ''} className="p-2 border rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Education Requirements</label>
                  <textarea name="education" rows="3" defaultValue={editing.education || ''} className="p-2 border rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Requirements</label>
                  <textarea name="requirements" rows="4" defaultValue={editing.requirements || ''} className="p-2 border rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Eligibility</label>
                  <textarea name="eligibility" rows="3" defaultValue={editing.eligibility || ''} className="p-2 border rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Submission Guidelines</label>
                  <textarea name="submissionGuideline" rows="3" defaultValue={editing.submissionGuideline || ''} className="p-2 border rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Submission Email</label>
                  <input name="submissionEmail" defaultValue={editing.submissionEmail || ''} className="p-2 border rounded w-full" placeholder="email@example.com" />
                </div>
              </>
            )}

            {/* Scholarship-specific fields */}
            {editing.type === 'scholarship' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                    <input name="country" defaultValue={editing.country || ''} className="p-2 border rounded w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Organization</label>
                    <input name="organization" defaultValue={editing.organization || ''} className="p-2 border rounded w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Scholarship Type</label>
                    <select name="scholarshipType" defaultValue={editing.scholarshipType || 'Fully Funded'} className="p-2 border rounded w-full">
                      <option value="Fully Funded">Fully Funded</option>
                      <option value="Partial Scholarship">Partial Scholarship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Stipend/Award</label>
                    <input name="stipend" defaultValue={editing.stipend || ''} className="p-2 border rounded w-full" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Eligibility</label>
                  <textarea name="eligibility" rows="3" defaultValue={editing.eligibility || ''} className="p-2 border rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Requirements</label>
                  <textarea name="requirements" rows="3" defaultValue={editing.requirements || ''} className="p-2 border rounded w-full" />
                </div>
              </>
            )}

            {/* Common fields for both */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Deadline</label>
                <input name="deadline" type="date" defaultValue={editing.deadline?.split('T')[0] || ''} className="p-2 border rounded w-full" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Apply Link</label>
                <input name="applyLink" defaultValue={editing.applyLink || ''} className="p-2 border rounded w-full" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Video Link</label>
                <input name="videoLink" defaultValue={editing.videoLink || ''} className="p-2 border rounded w-full" placeholder="YouTube URL or ID" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t">
              <button type="submit" className="px-6 py-2 bg-[#1E73BE] text-white rounded hover:bg-blue-700">Save</button>
              <button type="button" onClick={()=>setEditing(null)} className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;
