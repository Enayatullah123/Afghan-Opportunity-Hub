import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { getLearnItems } from '../admin/utils.js';

const LearnHubPage = () => {
  const { t } = useLocale();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = () => {
      try {
        setItems(getLearnItems());
      } catch (e) {
        setItems([]);
      }
    };

    load();
    const handler = () => load();
    window.addEventListener('dataUpdated', handler);
    return () => window.removeEventListener('dataUpdated', handler);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('learnHub') || 'Learn Hub'} - {t('siteTitle')}</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-[#1E73BE] to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('learnHub') || 'Learn Hub'}</h1>
            <p className="text-xl text-blue-100">Practical guides to help you apply better and faster.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {items.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-10 text-center text-gray-600">
                No guides yet. Admin can add resources from Learn Hub management.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow p-6 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <BookOpen className="w-8 h-8 text-[#1E73BE]" />
                      <span className="text-xs bg-blue-100 text-[#1E73BE] px-2 py-1 rounded-full">{item.category || 'General'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title?.en || item.title}</h3>
                    <p className="text-gray-600 text-sm mb-5">{item.description?.en || item.description}</p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[#1E73BE] font-semibold hover:text-blue-700"
                      >
                        Open Guide <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default LearnHubPage;
