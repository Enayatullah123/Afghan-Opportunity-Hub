import React from 'react';
import { Helmet } from 'react-helmet';
import { Briefcase, GraduationCap, Trash2 } from 'lucide-react';
import { useUserFeatures } from '../contexts/UserFeaturesContext.jsx';
import DeadlineBadge from '../components/DeadlineBadge.jsx';

const statuses = ['Not Applied', 'Applied', 'Accepted', 'Rejected'];

const MyApplicationsPage = () => {
  const { applications, updateApplicationStatus, removeApplication } = useUserFeatures();

  return (
    <>
      <Helmet>
        <title>My Applications</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-[#1E73BE] to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">My Applications</h1>
            <p className="text-blue-100 text-lg">Track saved opportunities and update your application status.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {applications.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-8 text-center text-gray-600">No saved opportunities yet.</div>
            ) : (
              <div className="space-y-4">
                {applications.map((item) => (
                  <div key={item.key} className="bg-white rounded-xl shadow p-5 border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {item.type === 'scholarship' ? (
                            <GraduationCap className="w-5 h-5 text-[#1E73BE]" />
                          ) : (
                            <Briefcase className="w-5 h-5 text-[#28A745]" />
                          )}
                          <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          {item.organization || item.location || item.country || 'Opportunity'}
                        </p>
                        <div className="mt-2">
                          <DeadlineBadge deadline={item.deadline} />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                        <select
                          value={item.status}
                          onChange={(event) => updateApplicationStatus(item.key, event.target.value)}
                          className="p-2.5 border border-gray-300 rounded-lg"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>

                        <button
                          onClick={() => removeApplication(item.key)}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default MyApplicationsPage;
