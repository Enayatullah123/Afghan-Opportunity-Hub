import React from 'react';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { Helmet } from 'react-helmet';
import { Download, FileText, ExternalLink, Lightbulb, CheckCircle, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button.jsx';
import { useToast } from '../components/ui/use-toast.js';
import { getResources } from '../admin/utils.js';
import { useState, useEffect } from 'react';

const resourceCategories = {
  cv: 'CV/Resume Templates',
  motivation: 'Motivation Letter Templates',
  guide: 'Checklists & Guides',
};

const ResourcesPage = () => {
  const { toast } = useToast();
  const { t } = useLocale();

  const [resources, setResources] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const loadResources = () => {
      try {
        const all = getResources() || [];
        setResources(all);
      } catch (e) {
        setResources([]);
      }
    };
    loadResources();
    const handler = () => loadResources();
    window.addEventListener('dataUpdated', handler);
    return () => window.removeEventListener('dataUpdated', handler);
  }, []);

  const externalResources = t('externalResourcesList') || [
    {
      name: 'Professional CV Writing Services',
      platform: 'Fiverr',
      description: 'Hire professional writers to create your CV',
      link: 'https://www.fiverr.com/categories/writing-translation/resume-writing',
    },
    {
      name: 'Motivation Letter Writing Help',
      platform: 'Fiverr',
      description: 'Get expert help with your motivation letters',
      link: 'https://www.fiverr.com/categories/writing-translation/cover-letter',
    },
    {
      name: 'Scholarship Application Tutorials',
      platform: 'YouTube',
      description: 'Video guides on scholarship applications',
      link: 'https://www.youtube.com/results?search_query=scholarship+application+guide',
    },
    {
      name: 'Interview Skills Training',
      platform: 'YouTube',
      description: 'Learn interview techniques and tips',
      link: 'https://www.youtube.com/results?search_query=job+interview+tips',
    },
  ];

  const tips = (t('quickGuides') || []).map((g) => ({ title: g.title, description: g.desc, icon: CheckCircle }));

  const handlePreview = (fileUrl, resourceTitle) => {
    if (!fileUrl) {
      toast({
        title: 'Preview Not Available',
        description: 'This resource does not have a valid file yet.',
        variant: 'destructive',
      });
      return;
    }

    if (fileUrl.startsWith('data:')) {
      // Base64 data URI
      setPreviewUrl(fileUrl);
    } else if (fileUrl.startsWith('http')) {
      // External URL - open in new tab
      window.open(fileUrl, '_blank');
    } else {
      toast({
        title: 'Invalid File',
        description: 'The file URL is not valid.',
        variant: 'destructive',
      });
    }
  };

  const handleDownload = (resourceTitle, fileUrl, fileName) => {
    if (!fileUrl) {
      toast({
        title: 'Download Not Available',
        description: 'This resource does not have a download link yet.',
        variant: 'destructive',
      });
      return;
    }

    if (fileUrl.startsWith('data:')) {
      // Base64 data URI - create download link
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName || `${resourceTitle}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: 'Download Started',
        description: `${resourceTitle} is downloading.`,
      });
    } else if (fileUrl.startsWith('http')) {
      // External URL
      window.open(fileUrl, '_blank');
      toast({
        title: 'Opening Download',
        description: `${resourceTitle} is opening in a new window.`,
      });
    } else {
      toast({
        title: 'Download Link Not Available',
        description: 'Please contact the admin to enable downloads for this resource.',
        variant: 'destructive',
      });
    }
  };

  // Group resources by category
  const resourcesByCategory = {
    cv: resources.filter(r => r.category === 'cv'),
    motivation: resources.filter(r => r.category === 'motivation'),
    guide: resources.filter(r => r.category === 'guide'),
  };

  return (
    <>
      <Helmet>
        <title>{t('resourcesTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('metaDescription') || 'Resources and templates for applications.'} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Preview Modal for viewing files (Base64 or iframe) */}
        {previewUrl && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-lg overflow-hidden shadow-lg flex flex-col">
              <div className="flex items-center justify-between p-3 border-b">
                <h3 className="text-lg font-semibold">Preview</h3>
                <button onClick={() => setPreviewUrl(null)} className="text-gray-600 hover:text-gray-800">✕</button>
              </div>
              <div className="flex-1 overflow-auto">
                <iframe title="resource-preview" src={previewUrl} className="w-full h-full" />
              </div>
              <div className="p-3 border-t bg-gray-50 flex justify-end gap-2">
                <button onClick={() => window.open(previewUrl, '_blank')} className="px-3 py-2 bg-[#1E73BE] text-white rounded">Open in New Tab</button>
                <button onClick={() => setPreviewUrl(null)} className="px-3 py-2 bg-gray-200 rounded">Close</button>
              </div>
            </div>
          </div>
        )}
        {/* Page Header */}
        <section className="bg-gradient-to-r from-[#1E73BE] to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('resourcesTitle')}</h1>
              <p className="text-xl text-blue-100">
                {t('resourcesDesc')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Downloadable Templates */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('downloadableTemplates') || 'Downloadable Templates'}
              </h2>
              <p className="text-lg text-gray-600">
                {t('resourcesDesc') || 'Access our library of templates to help with your applications'}
              </p>
            </div>

            <div className="space-y-12">
              {Object.entries(resourcesByCategory).map(([categoryKey, items]) => (
                <motion.div
                  key={categoryKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {resourceCategories[categoryKey]}
                  </h3>
                  
                  {items.length === 0 ? (
                    <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>{t('noResourcesAvailable') || 'No resources available in this category yet.'}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((resource) => (
                        <motion.div
                          key={resource.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                        >
                          <FileText className="w-12 h-12 text-[#1E73BE] mb-4" />
                          <h4 className="text-xl font-bold text-gray-900 mb-2">
                            {resource.title?.en || resource.title}
                          </h4>
                          <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                            {resource.description?.en || resource.description}
                          </p>
                          <div className="flex gap-3">
                            {resource.fileUrl && (
                              <button
                                onClick={() => handlePreview(resource.fileUrl, resource.title?.en || resource.title)}
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-[#1E73BE] text-[#1E73BE] font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                {t('viewLabel') || 'View'}
                              </button>
                            )}

                            {resource.fileUrl && (
                              resource.fileUrl.startsWith('data:') ? (
                                <button
                                  onClick={() => handleDownload(resource.title?.en || resource.title, resource.fileUrl, (resource.fileName || `${resource.title}.pdf`))}
                                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1E73BE] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                >
                                  <Download className="w-4 h-4" />
                                  {t('downloadLabel') || 'Download'}
                                </button>
                              ) : (
                                <a
                                  href={resource.fileUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1E73BE] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                >
                                  <Download className="w-4 h-4" />
                                  {t('downloadLabel') || 'Download'}
                                </a>
                              )
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* External Resources */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('externalResources')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('resourcesDesc')}
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8 max-w-4xl mx-auto">
              <div className="flex items-start space-x-3">
                <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{t('disclaimerTitle')}</h3>
                  <p className="text-gray-700">
                    {t('metaDescription') || 'The following external resources are provided for your convenience. Afghan Opportunity Hub is not affiliated with these platforms.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {externalResources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-gray-200 hover:border-[#1E73BE]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <ExternalLink className="w-10 h-10 text-[#1E73BE]" />
                    <span className="bg-blue-100 text-[#1E73BE] px-3 py-1 rounded-full text-sm font-semibold">
                      {resource.platform}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.name}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#1E73BE] hover:text-blue-700 font-semibold"
                  >
                    {t('visitResource')}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips and Best Practices */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('tipsTitle')}
              </h2>
              <p className="text-lg text-gray-600">
                {t('tipsDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg"
                >
                  <tip.icon className="w-12 h-12 text-[#28A745] mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-700">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ResourcesPage;