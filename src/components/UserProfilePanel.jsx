import React from 'react';
import { useUserFeatures } from '../contexts/UserFeaturesContext.jsx';
import { User } from 'lucide-react';

const UserProfilePanel = () => {
  const { profile, updateProfile } = useUserFeatures();

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateProfile({ [name]: value });
  };

  const fields = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'country', label: 'Country', type: 'text' },
    { key: 'educationLevel', label: 'Education Level', type: 'text' },
    { key: 'fieldOfStudy', label: 'Field of Study', type: 'text' },
    { key: 'cgpa', label: 'CGPA', type: 'number', step: '0.01' },
    { key: 'englishLevel', label: 'English Level', type: 'text' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-blue-100 text-[#1E73BE]">
          <User className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Your Profile</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.key}
              step={field.step}
              value={profile[field.key] || ''}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E73BE]"
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfilePanel;
