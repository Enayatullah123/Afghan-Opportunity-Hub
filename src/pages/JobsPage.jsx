import React, { useState, useEffect } from 'react';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { Helmet } from 'react-helmet';
import { Search, Briefcase, MapPin, Calendar, Building, CheckCircle, Filter, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button.jsx';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs.jsx';
import JobDetailModal from '../components/JobDetailModal.jsx';
import { fetchPostsByType } from '../admin/utils.js';

const JobsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { t } = useLocale();

  const defaultJobs = t('jobsData') || { ngos: [], government: [], online: [] };
  const [jobs, setJobs] = useState(defaultJobs);

  useEffect(()=>{
    const load = () => {
      try {
        const adminJobs = fetchPostsByType('job').map(p => ({
          id: p.id,
          title: p.title?.en || '',
          company: p.company || '',
          organization: p.company || p.organization || '',
          location: p.location || '',
          city: p.city || '',
          nationality: p.nationality || '',
          category: p.category || '',
          jobOrganizationType: p.jobOrganizationType || 'NGOs',
          yearsOfExperience: p.yearsOfExperience || '',
          type: p.jobType || p.typeLabel || 'Full-time',
          jobType: p.jobType || p.typeLabel || 'Full-time',
          contractDuration: p.contractDuration || '',
          gender: p.gender || '',
          vacancyNumber: p.vacancyNumber || '',
          education: p.education || '',
          numberOfJobs: p.numberOfJobs || '',
          deadline: p.deadline || '',
          requirements: p.requirements || '',
          description: p.description?.en || '',
          salary: p.salary || '',
          videoId: p.videoLink || p.videoId || '',
          videoLink: p.videoLink || p.videoId || '',
          pdf: p.pdf || null,
          applyLink: p.applyLink || '',
          submissionEmail: p.submissionEmail || '',
          submissionGuideline: p.submissionGuideline || '',
          eligibility: p.eligibility || '',
        }));

        // Organize jobs by their organization type
        const ngosJobs = adminJobs.filter(job => job.jobOrganizationType === 'NGOs');
        const governmentJobs = adminJobs.filter(job => job.jobOrganizationType === 'Government');
        const onlineJobs = adminJobs.filter(job => job.jobOrganizationType === 'Online');

        setJobs({
          ngos: [...ngosJobs, ...(defaultJobs.ngos || [])],
          government: [...governmentJobs, ...(defaultJobs.government || [])],
          online: [...onlineJobs, ...(defaultJobs.online || [])],
        });
      } catch (e) {}
    };

    load();
    const handler = () => load();
    window.addEventListener('dataUpdated', handler);
    return () => window.removeEventListener('dataUpdated', handler);
  }, []);

  const filterJobs = (jobList) => {
    if (!jobList) return [];
    return jobList.filter(job => {
      const matchesSearch = !searchQuery || 
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.category?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const jobLocation = (job.location || '').toLowerCase();
      const jobCity = (job.city || '').toLowerCase();
      const selectedProvinceLC = selectedProvince.toLowerCase();
      const matchesProvince = selectedProvince === 'all' || 
        jobLocation.includes(selectedProvinceLC) ||
        jobCity.includes(selectedProvinceLC) ||
        jobLocation === selectedProvinceLC ||
        jobCity === selectedProvinceLC;
      
      const jobCategory = (job.category || '').toLowerCase();
      const selectedCategoryLC = selectedCategory.toLowerCase();
      const matchesCategory = selectedCategory === 'all' || 
        jobCategory.includes(selectedCategoryLC) ||
        selectedCategoryLC.includes(jobCategory);
      
      return matchesSearch && matchesProvince && matchesCategory;
    });
  };

  // All provinces of Afghanistan (in alphabetical order)
  const afghanProvinces = [
    'all',
    'Badakhshan',
    'Badghis',
    'Baghlan',
    'Balkh',
    'Bamyan',
    'Daykundi',
    'Farah',
    'Faryab',
    'Ghazni',
    'Ghor',
    'Helmand',
    'Herat',
    'Jowzjan',
    'Kabul',
    'Kandahar',
    'Kapisa',
    'Khost',
    'Kunar',
    'Kunduz',
    'Laghman',
    'Logar',
    'Nangarhar',
    'Nimroz',
    'Nuristan',
    'Paktia',
    'Paktika',
    'Panjshir',
    'Parwan',
    'Samangan',
    'Sar-e Pol',
    'Takhar',
    'Uruzgan',
    'Wardak',
    'Zabul',
  ];

  // Job categories (in alphabetical order)
  const jobCategories = [
    'all',
    'Accounting & Finance',
    'Administration',
    'Agriculture',
    'Architecture',
    'Banking',
    'Business Development',
    'Communications',
    'Computer Science',
    'Construction',
    'Customer Service',
    'Data Analysis',
    'Design',
    'Education & Teaching',
    'Engineering',
    'Environment',
    'Healthcare',
    'Human Resources',
    'IT & Technology',
    'Legal',
    'Logistics',
    'Management',
    'Marketing',
    'Media & Journalism',
    'NGO & Development',
    'Program Management',
    'Project Management',
    'Public Health',
    'Research',
    'Sales',
    'Security',
    'Social Work',
    'Software Development',
    'Supply Chain',
    'Translation',
    'Web Development',
  ];

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const JobCard = ({ job, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-[#28A745] flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <Briefcase className="w-12 h-12 text-[#28A745]" />
        <span className="bg-green-100 text-[#28A745] px-3 py-1 rounded-full text-sm font-semibold">
          {job.type}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{job.description}</p>
      
          <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-2">
          <Building className="w-5 h-5 text-gray-500" />
          <p className="text-sm text-gray-700">{job.organization}</p>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <p className="text-sm text-gray-700">{job.location}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-600 font-semibold">{t('deadlineLabel')}: {job.deadline}</p>
        </div>
      </div>

      <Button 
        onClick={() => handleOpenModal(job)}
        className="w-full bg-[#28A745] hover:bg-green-700 mt-auto"
      >
        {t('viewJobDetails')}
      </Button>
    </motion.div>
  );


  return (
    <>
      <Helmet>
        <title>{t('jobsTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('metaDescription') || 'Explore job opportunities.'} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-[#28A745] to-green-600 text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('jobsTitle')}</h1>
              <p className="text-xl text-green-100">
                {t('jobsSubtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Bar and Filters */}
        <section className="py-8 bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Province Filter */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-300 rounded-lg focus:border-[#28A745] focus:outline-none appearance-none bg-white text-gray-900 min-w-[200px]"
                >
                  {afghanProvinces.map((province) => (
                    <option key={province} value={province}>
                      {province === 'all' ? 'All Provinces' : province}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-300 rounded-lg focus:border-[#28A745] focus:outline-none appearance-none bg-white text-gray-900 min-w-[200px]"
                >
                  {jobCategories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t('searchJobsPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#28A745] focus:outline-none text-gray-900"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Job Categories Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="ngos" className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8 bg-gray-200 p-1 rounded-lg">
                <TabsTrigger value="ngos" className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white">
                  {t('ngosLabel')}
                </TabsTrigger>
                <TabsTrigger value="government" className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white">
                  {t('governmentLabel')}
                </TabsTrigger>
                <TabsTrigger value="online" className="data-[state=active]:bg-[#28A745] data-[state=active]:text-white">
                  {t('onlineLabel')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ngos">
                <div className="mb-4 text-gray-600">
                  <span className="font-semibold">{filterJobs(jobs.ngos).length}</span> {filterJobs(jobs.ngos).length === 1 ? 'job' : 'jobs'} found
                </div>
                {filterJobs(jobs.ngos).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filterJobs(jobs.ngos).map((job, index) => (
                      <JobCard key={index} job={job} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow">
                    <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 text-lg">No NGO jobs found matching your filters</p>
                    <p className="text-gray-500 text-sm mt-2">Try adjusting your province or category filters</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="government">
                <div className="mb-4 text-gray-600">
                  <span className="font-semibold">{filterJobs(jobs.government).length}</span> {filterJobs(jobs.government).length === 1 ? 'job' : 'jobs'} found
                </div>
                {filterJobs(jobs.government).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filterJobs(jobs.government).map((job, index) => (
                      <JobCard key={index} job={job} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow">
                    <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 text-lg">No Government jobs found matching your filters</p>
                    <p className="text-gray-500 text-sm mt-2">Try adjusting your province or category filters</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="online">
                <div className="mb-4 text-gray-600">
                  <span className="font-semibold">{filterJobs(jobs.online).length}</span> {filterJobs(jobs.online).length === 1 ? 'job' : 'jobs'} found
                </div>
                {filterJobs(jobs.online).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filterJobs(jobs.online).map((job, index) => (
                      <JobCard key={index} job={job} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow">
                    <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 text-lg">No Online jobs found matching your filters</p>
                    <p className="text-gray-500 text-sm mt-2">Try adjusting your province or category filters</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      <JobDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        job={selectedJob} 
      />
    </>
  );
};

export default JobsPage;