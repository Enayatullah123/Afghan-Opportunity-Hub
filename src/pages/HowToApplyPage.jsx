import React from 'react';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { Helmet } from 'react-helmet';
import { FileText, Upload, PenTool, CheckSquare, AlertCircle, GraduationCap, Briefcase, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import ApplicationRoadmap from '../components/ApplicationRoadmap.jsx';

const HowToApplyPage = () => {
  const { t } = useLocale();
  const icons = [FileText, Upload, PenTool, GraduationCap];
  const applicationSteps = (t('howToApplySteps') || []).map((s, i) => ({ icon: icons[i] || FileText, ...s }));
  const documentChecklist = t('documentChecklist') || [];
  const commonMistakes = (t('commonMistakes') || []).map((m) => ({ icon: AlertCircle, ...m }));

  return (
    <>
      <Helmet>
        <title>{t('howToApplyTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('metaDescription') || 'Step-by-step application guide.'} />
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('howToApplyTitle')}</h1>
              <p className="text-xl text-blue-100">
                {t('howToApplyDesc')}
              </p>
            </motion.div>
          </div>
        </section>

        <ApplicationRoadmap />

        {/* Step-by-Step Guides */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('applicationProcessGuide')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('applicationProcessSub')}
              </p>
            </div>

            <div className="space-y-12">
              {applicationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg"
                >
                  <div className="flex items-start space-x-6">
                    <div className="bg-[#1E73BE] text-white p-4 rounded-lg">
                      <step.icon className="w-12 h-12" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-700 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start space-x-2">
                            <CheckSquare className="w-5 h-5 text-[#28A745] flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Document Preparation Checklist */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <ClipboardList className="w-16 h-16 mx-auto mb-4 text-[#1E73BE]" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t('documentChecklistTitle')}
                </h2>
                <p className="text-lg text-gray-600">
                  {t('documentChecklistDesc')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documentChecklist.map((document, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckSquare className="w-6 h-6 text-[#28A745]" />
                      <span className="text-gray-800">{document}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Common Mistakes to Avoid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('commonMistakesTitle')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('commonMistakesSub')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commonMistakes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-red-50 border-2 border-red-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <item.icon className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.mistake}</h3>
                  <p className="text-gray-700">
                    <span className="font-semibold text-[#28A745]">{t('solutionLabel')} </span>
                    {item.solution}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Guides */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('quickReferenceGuide')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(t('quickGuides') || []).map((guide, index) => {
                const GuideIcon = [GraduationCap, FileText, CheckSquare, Briefcase][index] || GraduationCap;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <GuideIcon className="w-16 h-16 mx-auto mb-4 text-[#1E73BE]" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h3>
                    <p className="text-gray-600">{guide.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HowToApplyPage;