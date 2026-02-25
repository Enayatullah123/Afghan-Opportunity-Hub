import React from 'react';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, Code, Palette, Video, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button.jsx';

import PortfolioGallery from '../components/PortfolioGallery.jsx';
import PricingTiers from '../components/PricingTiers.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import ServiceFAQ from '../components/ServiceFAQ.jsx';
import ServiceTestimonials from '../components/ServiceTestimonials.jsx';
import ServiceInquiryForm from '../components/ServiceInquiryForm.jsx';

const ServicesPage = () => {
  const { t } = useLocale();
  const services = t('servicesList') || [];
  const serviceIcons = [Globe, Smartphone, Code, Video, Palette, Sparkles];

  return (
    <div className="font-poppins min-h-screen bg-gray-50">
      <Helmet>
        <title>{t('servicesHeroTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('servicesHeroDesc') || 'Comprehensive digital services.'} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E73BE] to-blue-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('servicesHeroTitle')}
            </h1>
            <p className="text-xl text-blue-100 mb-10">
              {t('servicesHeroDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#inquiry">
                <Button size="lg" className="bg-[#28A745] hover:bg-green-600 text-white text-lg px-8 py-6 w-full sm:w-auto shadow-lg">
                  {t('startProject')}
                </Button>
              </a>
              <a href="#portfolio">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1E73BE] text-lg px-8 py-6 w-full sm:w-auto">
                  {t('viewPortfolio')}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('ourCoreServices')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('ourCoreServicesDesc')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col h-full"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1E73BE] transition-colors duration-300">
                  {(() => {
                    const Icon = service.icon || serviceIcons[index] || Globe;
                    return <Icon className="w-8 h-8 text-[#1E73BE] group-hover:text-white transition-colors duration-300" />;
                  })()}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <div className="bg-gray-50 p-4 rounded-lg mt-auto mb-6 border border-gray-100">
                  <p className="text-sm text-gray-700">{service.details}</p>
                </div>
                <a href="#inquiry" className="mt-auto block">
                  <Button className="w-full bg-white text-[#1E73BE] border-2 border-[#1E73BE] hover:bg-[#1E73BE] hover:text-white transition-colors duration-300 font-semibold py-6">
                    {t('requestQuote')}
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      
      <div id="portfolio">
        <PortfolioGallery />
      </div>

      <HowItWorks />
      
      <PricingTiers />
      
      <ServiceTestimonials />
      
      <ServiceFAQ />

      <div id="inquiry">
        <ServiceInquiryForm />
      </div>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1E73BE] to-blue-800 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('readyCTAHeading')}</h2>
            <p className="text-xl text-blue-100 mb-10">
              {t('readyCTADesc')}
            </p>
            <a href="#inquiry">
                <Button size="lg" className="bg-[#28A745] hover:bg-green-600 text-white text-xl px-10 py-7 shadow-xl rounded-full">
                {t('letsTalk')} <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;