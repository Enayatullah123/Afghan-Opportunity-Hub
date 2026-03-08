import React, { useEffect, useMemo, useState } from 'react';
import { BadgeCheck, ShieldAlert, ShieldQuestion } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { evaluateEligibility } from '../lib/matching.js';
import { fetchPostsByType } from '../admin/utils.js';

const uniqueByName = (items = []) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = (item.name || item.title || '').toLowerCase().trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const languageOptions = ['Basic', 'Conversational', 'Fluent', 'Native'];

const EligibilityChecker = () => {
  const { t } = useLocale();
  const [adminScholarships, setAdminScholarships] = useState([]);
  const [adminJobs, setAdminJobs] = useState([]);
  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState('');

  const defaultScholarships = useMemo(() => t('scholarshipsList') || [], [t]);
  const defaultJobs = useMemo(() => {
    const jobsData = t('jobsData') || {};
    return Object.values(jobsData).flatMap((list) => (Array.isArray(list) ? list : []));
  }, [t]);

  useEffect(() => {
    const loadAdminOpportunities = () => {
      const scholarshipsFromAdmin = (fetchPostsByType('scholarship') || []).map((post) => ({
        ...post,
        name: post.title?.en || post.name || '',
        requirements: post.requirements || '',
        eligibility: post.eligibility || '',
        country: post.country || '',
      }));

      const jobsFromAdmin = (fetchPostsByType('job') || []).map((post) => ({
        ...post,
        title: post.title?.en || post.title || '',
        requirements: post.requirements || '',
        eligibility: post.eligibility || '',
        education: post.education || '',
        location: post.location || '',
      }));

      setAdminScholarships(scholarshipsFromAdmin);
      setAdminJobs(jobsFromAdmin);
    };

    loadAdminOpportunities();
    window.addEventListener('dataUpdated', loadAdminOpportunities);
    return () => window.removeEventListener('dataUpdated', loadAdminOpportunities);
  }, []);

  const scholarships = useMemo(
    () => uniqueByName([...adminScholarships, ...defaultScholarships]),
    [adminScholarships, defaultScholarships]
  );

  const jobs = useMemo(
    () => uniqueByName([...adminJobs, ...defaultJobs]),
    [adminJobs, defaultJobs]
  );

  const [form, setForm] = useState({
    type: 'scholarship',
    selectedName: '',
    cgpa: '',
    degree: '',
    country: '',
    englishTest: '',
    achievement: '',
    experience: '',
    englishLevel: '',
    pashtoLevel: '',
    dariLevel: '',
    computerExperience: '',
  });

  const options = form.type === 'scholarship' ? scholarships : jobs;

  const selectedOpportunity = useMemo(() => {
    return options.find((item) => (item.name || item.title) === form.selectedName);
  }, [options, form.selectedName]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormError('');
    setResult(null);
    setForm((prev) => {
      if (name === 'type') {
        return { ...prev, type: value, selectedName: '' };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleCheck = () => {
    const scholarshipMissing = !form.selectedName || !form.cgpa || !form.degree || !form.country || !form.englishTest;
    const jobMissing =
      !form.selectedName ||
      !form.degree ||
      !form.achievement ||
      !form.experience ||
      !form.englishLevel ||
      !form.pashtoLevel ||
      !form.dariLevel ||
      !form.computerExperience;

    if ((form.type === 'scholarship' && scholarshipMissing) || (form.type === 'job' && jobMissing)) {
      setFormError('Please fill all fields and select an opportunity before checking.');
      setResult(null);
      return;
    }

    if (!selectedOpportunity) {
      setFormError('Selected opportunity was not found. Please choose again.');
      setResult(null);
      return;
    }

    setFormError('');
    setResult(evaluateEligibility(form, selectedOpportunity, form.type));
  };

  const statusStyles = {
    Eligible: 'bg-green-100 text-green-700',
    'Partially Eligible': 'bg-yellow-100 text-yellow-700',
    'Not Eligible': 'bg-red-100 text-red-700',
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Eligibility Checker</h2>
          <p className="text-gray-600 mb-6">Check whether your profile meets scholarship or job requirements.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Type</label>
              <select name="type" value={form.type} onChange={onChange} className="w-full p-2.5 border border-gray-300 rounded-lg">
                <option value="scholarship">Scholarship</option>
                <option value="job">Job</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Opportunity</label>
              <select name="selectedName" value={form.selectedName} onChange={onChange} className="w-full p-2.5 border border-gray-300 rounded-lg">
                <option value="">Choose one</option>
                {options.map((item, index) => {
                  const name = item.name || item.title;
                  return <option key={`${name}-${index}`} value={name}>{name}</option>;
                })}
              </select>
              {options.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  No {form.type === 'scholarship' ? 'scholarships' : 'jobs'} found yet. Add from admin panel and they will appear here.
                </p>
              )}
            </div>

            {form.type === 'scholarship' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
                  <input name="cgpa" value={form.cgpa} onChange={onChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="e.g. 3.5" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input name="degree" value={form.degree} onChange={onChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="e.g. Bachelor's" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input name="country" value={form.country} onChange={onChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="e.g. Afghanistan" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">English Test</label>
                  <input name="englishTest" value={form.englishTest} onChange={onChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="e.g. IELTS 6.5" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input name="degree" value={form.degree} onChange={onChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="e.g. Bachelor's in CS" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Achievement</label>
                  <input name="achievement" value={form.achievement} onChange={onChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="e.g. Certificates, awards, portfolio" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input name="experience" value={form.experience} onChange={onChange} className="w-full p-2.5 border border-gray-300 rounded-lg" placeholder="e.g. 2 years" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">English Level</label>
                  <select
                    name="englishLevel"
                    value={form.englishLevel}
                    onChange={onChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select level</option>
                    {languageOptions.map((level) => (
                      <option key={level} value={level.toLowerCase()}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pashto Level</label>
                  <select
                    name="pashtoLevel"
                    value={form.pashtoLevel}
                    onChange={onChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select level</option>
                    {languageOptions.map((level) => (
                      <option key={level} value={level.toLowerCase()}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dari Level</label>
                  <select
                    name="dariLevel"
                    value={form.dariLevel}
                    onChange={onChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select level</option>
                    {languageOptions.map((level) => (
                      <option key={level} value={level.toLowerCase()}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Computer Experience</label>
                  <input
                    name="computerExperience"
                    value={form.computerExperience}
                    onChange={onChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                    placeholder="e.g. MS Office, Excel, Word, PowerPoint"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={handleCheck}
              className="bg-[#1E73BE] hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg"
            >
              Check
            </button>
          </div>

          {formError && (
            <p className="text-sm text-red-600 mt-3">{formError}</p>
          )}

          {result && (
            <div className="mt-6 border-t pt-5">
              <div className="flex items-center gap-2 mb-3">
                {result.status === 'Eligible' && <BadgeCheck className="w-5 h-5 text-green-600" />}
                {result.status === 'Partially Eligible' && <ShieldQuestion className="w-5 h-5 text-yellow-600" />}
                {result.status === 'Not Eligible' && <ShieldAlert className="w-5 h-5 text-red-600" />}
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[result.status]}`}>
                  {result.status}
                </span>
              </div>

              <ul className="space-y-2">
                {result.checks.map((check) => (
                  <li key={check.label} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="text-sm text-gray-700">{check.label}</span>
                    <span className={`text-xs font-semibold ${check.pass ? 'text-green-700' : 'text-red-700'}`}>
                      {check.pass ? 'Matched' : 'Not Matched'}
                    </span>
                  </li>
                ))}
              </ul>

              {!result.checks.length && (
                <p className="text-sm text-gray-500">No strict structured requirements found. Please review the full opportunity details.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EligibilityChecker;
