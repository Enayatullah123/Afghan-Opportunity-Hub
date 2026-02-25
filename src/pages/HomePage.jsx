import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { GraduationCap, Briefcase, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button.jsx';
import { useLocale } from '../contexts/LocaleContext.jsx';

const HomePage = () => {
  const { t } = useLocale();

  const trustIndicators = [
    { icon: Award, number: '500+', label: t('trust1Label') },
    { icon: Briefcase, number: '100+', label: t('trust2Label') },
    { icon: Users, number: '10,000+', label: t('trust3Label') },
  ];

  const featuredScholarships = [
    {
      name: 'Fulbright Scholarship Program',
      eligibility: 'Bachelor\'s degree holders',
      deadline: 'March 15, 2026',
      country: 'USA',
    },
    {
      name: 'Chevening Scholarships',
      eligibility: 'Undergraduate degree with work experience',
      deadline: 'November 2, 2026',
      country: 'UK',
    },
    {
      name: 'DAAD Scholarships',
      eligibility: 'Bachelor\'s degree in relevant field',
      deadline: 'October 31, 2026',
      country: 'Germany',
    },
    {
      name: 'Australia Awards Scholarships',
      eligibility: 'Minimum 2 years work experience',
      deadline: 'April 30, 2026',
      country: 'Australia',
    },
  ];

  const featuredJobs = [
    {
      title: 'Project Manager',
      organization: 'UNICEF Afghanistan',
      location: 'Kabul',
      deadline: 'March 30, 2026',
    },
    {
      title: 'Education Coordinator',
      organization: 'Save the Children',
      location: 'Herat',
      deadline: 'April 5, 2026',
    },
    {
      title: 'Data Analyst',
      organization: 'World Bank',
      location: 'Remote',
      deadline: 'March 25, 2026',
    },
    {
      title: 'Community Health Worker',
      organization: 'WHO Afghanistan',
      location: 'Mazar-i-Sharif',
      deadline: 'April 10, 2026',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('metaTitle')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center py-32"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 115, 190, 0.85), rgba(30, 115, 190, 0.85)), url('https://images.unsplash.com/photo-1658161587858-d4814b7c9591')`,
          }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              {t('heroTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-blue-100"
            >
              {t('heroTagline')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/scholarships">
                <Button size="lg" className="bg-white text-[#1E73BE] hover:bg-blue-50 text-lg px-8 py-6">
                  {t('applyNow')}
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1E73BE] text-lg px-8 py-6">
                  {t('exploreOpportunities')}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('missionHeading')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('missionText')}
              </p>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
                >
                  <indicator.icon className="w-16 h-16 mx-auto mb-4 text-[#1E73BE]" />
                  <h3 className="text-4xl font-bold text-[#1E73BE] mb-2">{indicator.number}</h3>
                  <p className="text-gray-700 font-medium">{indicator.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Scholarships */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('featuredScholarshipsHeading')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('featuredScholarshipsSub')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredScholarships.map((scholarship, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl hover:border-[#1E73BE] transition-all"
                >
                  <GraduationCap className="w-12 h-12 text-[#1E73BE] mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{scholarship.name}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">{t('eligibilityLabel')}:</span> {scholarship.eligibility}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">{t('countryLabel')}:</span> {scholarship.country}
                    </p>
                    <p className="text-sm text-red-600 font-semibold">
                      {t('deadlineLabel')}: {scholarship.deadline}
                    </p>
                  </div>
                  <Link to="/scholarships">
                    <Button className="w-full bg-[#1E73BE] hover:bg-blue-700">
                      Apply Now
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('featuredJobsHeading')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('featuredJobsSub')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredJobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl hover:border-[#28A745] transition-all"
                >
                  <Briefcase className="w-12 h-12 text-[#28A745] mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{job.title}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">{t('organizationLabel')}:</span> {job.organization}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">{t('locationLabel')}:</span> {job.location}
                    </p>
                    <p className="text-sm text-red-600 font-semibold">
                      {t('deadlineLabel')}: {job.deadline}
                    </p>
                  </div>
                  <Link to="/jobs">
                    <Button className="w-full bg-[#28A745] hover:bg-green-700">
                      Apply Now
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;