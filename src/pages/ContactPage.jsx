import React, { useState, useEffect } from 'react';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { Helmet } from 'react-helmet';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button.jsx';
import { useToast } from '../components/ui/use-toast.js';
import { saveMessage } from '../admin/utils.js';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) {
      toast({ title: 'Name is required', variant: 'destructive' });
      return;
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      toast({ title: 'Valid email is required', variant: 'destructive' });
      return;
    }
    if (!formData.message.trim()) {
      toast({ title: 'Message is required', variant: 'destructive' });
      return;
    }

    // Save via admin util (messages) with type 'contact'
    saveMessage({ name: formData.name.trim(), email: formData.email.trim(), message: formData.message.trim(), type: 'contact' });

    toast({ title: 'Your message has been sent successfully' });

    setFormData({ name: '', email: '', message: '' });
  };

  const { t } = useLocale();

  return (
    <>
      <Helmet>
        <title>{t('contactTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('metaDescription') || 'Contact Afghan Opportunity Hub.'} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-[#1E73BE] to-blue-600 dark:from-gray-800 dark:to-gray-700 text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contactTitle')}</h1>
              <p className="text-xl text-blue-100">
                {t('contactSubtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            {/* Contact Form - Centered and Full Width */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('sendUsMessage')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                      {t('yourNameLabel')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-[#1E73BE] dark:focus:border-blue-400 focus:outline-none text-gray-900 dark:text-white dark:bg-gray-700"
                      placeholder={t('placeholderName')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                      {t('emailAddressLabel')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-[#1E73BE] dark:focus:border-blue-400 focus:outline-none text-gray-900 dark:text-white dark:bg-gray-700"
                      placeholder={t('placeholderEmail')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                      {t('messageLabel')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-[#1E73BE] dark:focus:border-blue-400 focus:outline-none resize-none text-gray-900 dark:text-white dark:bg-gray-700"
                      placeholder={t('placeholderMessage')}
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full bg-[#1E73BE] hover:bg-blue-700 text-lg py-6">
                    <Send className="w-5 h-5 mr-2" />
                    {t('sendMessageButton')}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;