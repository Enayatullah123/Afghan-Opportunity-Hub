import React, { useState, useEffect } from 'react';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { Helmet } from 'react-helmet';
import { Search, Filter, GraduationCap, FileText, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button.jsx';
import ScholarshipDetailModal from '../components/ScholarshipDetailModal.jsx';
import { fetchPostsByType } from '../admin/utils.js';

const ScholarshipsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedField, setSelectedField] = useState('all');
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useLocale();

  const defaultScholarships = t('scholarshipsList') || [
    {
      name: 'Fulbright Scholarship Program',
      country: 'USA',
      field: 'All Fields',
      eligibility: "Bachelor's degree holders with strong academic record",
      documents: 'Transcripts, Letters of Recommendation, Statement of Purpose, TOEFL/IELTS',
      deadline: 'March 15, 2026',
      description: "Fully funded master's and PhD programs in the United States. The Fulbright Program is the flagship international educational exchange program sponsored by the U.S. government.",
      stipend: 'Fully Funded (Tuition, Airfare, Living Stipend)',
      videoId: 'dQw4w9WgXcQ',
    }
  ];

  const [scholarships, setScholarships] = useState(defaultScholarships);

  useEffect(()=>{
    const load = () => {
      try {
        const admin = fetchPostsByType('scholarship').map(p => ({
          id: p.id,
          name: p.title?.en || '',
          title: p.title?.en || '',
          country: p.country || '',
          organization: p.organization || '',
          scholarshipType: p.scholarshipType || 'Fully Funded',
          field: p.scholarshipType || 'Various',
          eligibility: p.eligibility || '',
          requirements: p.requirements || '',
          deadline: p.deadline || '',
          description: p.description?.en || '',
          stipend: p.stipend || '',
          videoId: p.videoLink || p.videoId || '',
          videoLink: p.videoLink || p.videoId || '',
          pdf: p.pdf || null,
          applyLink: p.applyLink || '',
        }));
        if (admin.length) setScholarships([...admin, ...defaultScholarships]);
        else setScholarships(defaultScholarships);
      } catch (e) {
        // ignore
      }
    };

    load();
    const handler = () => load();
    window.addEventListener('dataUpdated', handler);
    return () => window.removeEventListener('dataUpdated', handler);
  }, []);

  const howToApplySteps = [
    {
      number: 1,
      title: 'Research Scholarships',
      description: 'Browse available scholarships and check eligibility requirements carefully',
      icon: Search,
    },
    {
      number: 2,
      title: 'Prepare Documents',
      description: 'Gather all required documents including transcripts, certificates, and ID',
      icon: FileText,
    },
    {
      number: 3,
      title: 'Write Strong Essays',
      description: 'Craft compelling motivation letters and personal statements',
      icon: GraduationCap,
    },
    {
      number: 4,
      title: 'Submit Before Deadline',
      description: 'Complete your application and submit well before the deadline',
      icon: Calendar,
    },
  ];

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || scholarship.country === selectedCountry;
    const matchesField = selectedField === 'all' || scholarship.field.includes(selectedField);
    return matchesSearch && matchesCountry && matchesField;
  });

  // Comprehensive list of countries that offer scholarships (in alphabetical order)
  const allCountries = [
    'all',
    'Argentina',
    'Australia',
    'Austria',
    'Bangladesh',
    'Belgium',
    'Brazil',
    'Bulgaria',
    'Canada',
    'Chile',
    'China',
    'Colombia',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Egypt',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Ireland',
    'Israel',
    'Italy',
    'Japan',
    'Jordan',
    'Kenya',
    'Kuwait',
    'Latvia',
    'Lebanon',
    'Lithuania',
    'Luxembourg',
    'Malaysia',
    'Malta',
    'Mexico',
    'Morocco',
    'Netherlands',
    'New Zealand',
    'Nigeria',
    'Norway',
    'Oman',
    'Pakistan',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Saudi Arabia',
    'Serbia',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'South Africa',
    'South Korea',
    'Spain',
    'Sweden',
    'Switzerland',
    'Taiwan',
    'Thailand',
    'Tunisia',
    'Turkey',
    'UAE',
    'Uganda',
    'UK',
    'Ukraine',
    'United Arab Emirates',
    'USA',
    'Vietnam',
  ];

  // Comprehensive list of academic fields (in alphabetical order)
  const allFields = [
    'all',
    'Agriculture & Forestry',
    'All Fields',
    'Anthropology',
    'Architecture',
    'Artificial Intelligence',
    'Arts & Humanities',
    'Biology',
    'Biotechnology',
    'Business & Management',
    'Chemistry',
    'Computer Science & IT',
    'Cybersecurity',
    'Data Science',
    'Dentistry',
    'Design',
    'Development Studies',
    'Economics & Finance',
    'Education & Teaching',
    'Engineering',
    'Environmental Science',
    'Fine Arts',
    'Gender Studies',
    'Geography',
    'History',
    'Human Rights',
    'International Relations',
    'Journalism',
    'Law & Legal Studies',
    'Linguistics',
    'Literature',
    'Marketing',
    'Mathematics',
    'Media & Communication',
    'Medicine & Healthcare',
    'Music',
    'Natural Sciences',
    'Nursing',
    'Performing Arts',
    'Pharmacy',
    'Philosophy',
    'Physics',
    'Political Science',
    'Psychology',
    'Public Health',
    'Religious Studies',
    'Renewable Energy',
    'Social Sciences',
    'Sociology',
    'Sports Science',
    'Statistics',
    'Tourism & Hospitality',
    'Translation Studies',
    'Urban Planning',
    'Veterinary Science',
  ];

  // Merge custom countries from scholarships with the comprehensive list
  const customCountries = [...new Set(scholarships.map(s => s.country))].filter(c => c && !allCountries.includes(c));
  const countries = [...allCountries, ...customCountries];

  // Merge custom fields from scholarships with the comprehensive list
  const customFields = [...new Set(scholarships.map(s => s.field))].filter(f => f && !allFields.includes(f));
  const fields = [...allFields, ...customFields];

  const handleOpenModal = (scholarship) => {
    setSelectedScholarship(scholarship);
    setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>{t('scholarshipsTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('metaDescription') || 'Browse scholarships and opportunities.'} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-[#1E73BE] to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('scholarshipsTitle')}</h1>
              <p className="text-xl text-blue-100">
                {t('scholarshipsSubtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t('searchScholarshipsPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E73BE] focus:outline-none text-gray-900"
                />
              </div>

              {/* Country Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E73BE] focus:outline-none appearance-none bg-white text-gray-900 min-w-[200px]"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country === 'all' ? t('allCountriesLabel') : country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field Filter */}
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1E73BE] focus:outline-none appearance-none bg-white text-gray-900 min-w-[200px]"
                >
                  {fields.map((field) => (
                    <option key={field} value={field}>
                      {field === 'all' ? t('allFieldsLabel') : field}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Scholarships Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredScholarships.map((scholarship, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-[#1E73BE] flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <GraduationCap className="w-12 h-12 text-[#1E73BE]" />
                    <span className="bg-blue-100 text-[#1E73BE] px-3 py-1 rounded-full text-sm font-semibold">
                      {scholarship.country}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{scholarship.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{scholarship.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                          <p className="text-sm font-semibold text-gray-900">{t('eligibilityLabel')}:</p>
                        <p className="text-sm text-gray-600 line-clamp-1">{scholarship.eligibility}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Calendar className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{t('deadlineLabel')}:</p>
                        <p className="text-sm text-red-600 font-semibold">{scholarship.deadline}</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleOpenModal(scholarship)}
                    className="w-full bg-[#1E73BE] hover:bg-blue-700 mt-auto"
                  >
                    {t('viewDetailsApply')}
                  </Button>
                </motion.div>
              ))}
            </div>

            {filteredScholarships.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">{t('noScholarshipsFound')}</p>
              </div>
            )}
          </div>
        </section>

        {/* How to Apply Guide */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('howToApplyScholarshipsHeading')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('howToApplyScholarshipsSub')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howToApplySteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center h-full">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#1E73BE] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                      {step.number}
                    </div>
                    <step.icon className="w-16 h-16 mx-auto mb-4 text-[#1E73BE] mt-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{t(`howSteps.${index}.title`) || step.title}</h3>
                    <p className="text-gray-700">{t(`howSteps.${index}.desc`) || step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ScholarshipDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        scholarship={selectedScholarship} 
      />
    </>
  );
};

export default ScholarshipsPage;