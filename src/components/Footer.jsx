import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Mail, ArrowRight, MapPin, ExternalLink, Youtube } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { getContactSettings } from '../admin/utils.js';

const Footer = () => {
  const { t } = useLocale();
  const [contactInfo, setContactInfo] = useState(getContactSettings() || {});

  useEffect(() => {
    // Load initial settings
    setContactInfo(getContactSettings() || {});

    // Listen for changes from admin panel
    const handleDataUpdate = () => {
      setContactInfo(getContactSettings() || {});
    };

    window.addEventListener('dataUpdated', handleDataUpdate);
    
    return () => {
      window.removeEventListener('dataUpdated', handleDataUpdate);
    };
  }, []);

  const quickLinks = [
    { name: t('home'), path: '/' },
    { name: t('scholarships'), path: '/scholarships' },
    { name: t('jobs'), path: '/jobs' },
    { name: t('resources'), path: '/resources' },
    { name: t('about'), path: '/about' },
    { name: t('contact'), path: '/contact' },
  ];

  const serviceLinks = (t('servicesList') || [
    { title: 'Website Development' },
    { title: 'Mobile App Development' },
    { title: 'Web Application Development' },
  ]).slice(0,3).map((s) => ({ name: s.title || s.name, path: '/services' }));

  return (
    <footer className="bg-[#1E73BE] dark:bg-gray-800 text-white mt-auto transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/Afghan.png" alt="Afghan Opportunity Hub Logo" className="h-12 w-12 rounded-full border-2 border-blue-200 bg-white object-cover" />
              <span className="font-bold text-lg">{t('siteTitle')}</span>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-4">
              {t('footerDescription')}
            </p>
            <p className="text-green-300 text-sm font-semibold italic">
              {t('footerCTA')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('quickLinksTitle')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-blue-100 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('ourServicesTitle')}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-blue-100 hover:text-white transition-colors text-sm flex items-center"
                  >
                    <ArrowRight size={14} className="mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="min-w-0">
            <h3 className="font-semibold text-lg mb-4">{t('getInTouch')}</h3>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-blue-200 mb-1">{t('emailLabelContact')}</p>
                  <a href={`mailto:${contactInfo.email || 'info@afghanopportunityhub.com'}`} className="text-white hover:text-blue-100 text-sm break-all block">
                    {contactInfo.email || 'info@afghanopportunityhub.com'}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-blue-200 mb-1">{t('locationLabelContact')}</p>
                  <p className="text-white text-sm break-words">{contactInfo.location || 'Serving Afghan communities worldwide'}</p>
                </div>
              </div>

              {/* Facebook */}
              {contactInfo.facebookUrl && (
                <div className="flex items-start space-x-2">
                  <Facebook className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-blue-200 mb-1">{t('facebookLabel')}</p>
                    <a href={contactInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-100 text-sm break-all block">
                      {contactInfo.facebookUrl}
                    </a>
                  </div>
                </div>
              )}

              {/* YouTube */}
              {contactInfo.youtubeUrl && (
                <div className="flex items-start space-x-2">
                  <Youtube className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-blue-200 mb-1">YouTube</p>
                    <a href={contactInfo.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-100 text-sm break-all block">
                      {contactInfo.youtubeUrl}
                    </a>
                  </div>
                </div>
              )}

              {/* LinkedIn */}
              {contactInfo.linkedinUrl && (
                <div className="flex items-start space-x-2">
                  <ExternalLink className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-blue-200 mb-1">LinkedIn</p>
                    <a href={contactInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-100 text-sm break-all block">
                      {contactInfo.linkedinUrl}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-600 dark:border-gray-700 mt-8 pt-6 text-center">
            <p className="text-blue-100 dark:text-gray-300 text-sm">
            © {new Date().getFullYear()} {t('siteTitle')}. {t('copyrightNotice')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;