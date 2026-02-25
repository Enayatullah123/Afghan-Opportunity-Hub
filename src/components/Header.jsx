import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { lang, setLang, t } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const siteTitle = t('siteTitle');

  const navLinks = [
    { key: 'home', path: '/' },
    { key: 'services', path: '/services' },
    { key: 'scholarships', path: '/scholarships' },
    { key: 'jobs', path: '/jobs' },
    { key: 'howToApply', path: '/how-to-apply' },
    { key: 'resources', path: '/resources' },
    { key: 'about', path: '/about' },
    { key: 'contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky top-0 z-50">
      {/* Top Banner removed */}
      {/* Main Header */}
      <header className="bg-[#1E73BE] dark:bg-gray-800 text-white shadow-lg transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <div className="flex items-center space-x-1">
                <img src="/Afghan.png" alt="Afghan Opportunity Hub Logo" className="h-14 w-14 rounded-full border-2 border-blue-200 bg-white object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-tight inline-block">
                  {lang === 'en' && siteTitle.toLowerCase().includes('hub') ? (
                    <>
                      <span className="block">Afghan Opportunity</span>
                      <span className="block text-center">Hub</span>
                    </>
                  ) : (
                    siteTitle
                  )}
                </span>
                <span className="text-xs text-blue-100">{t('siteTagline')}</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                    isActive(link.path)
                      ? 'bg-white text-[#1E73BE] dark:bg-gray-700 dark:text-white'
                      : 'hover:bg-blue-600 dark:hover:bg-gray-700'
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-blue-600 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              {/* Language selector */}
              <div className="flex items-center space-x-2 relative">
                <Globe className="w-5 h-5" />
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-blue-600/80 dark:bg-gray-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg outline-none cursor-pointer border border-blue-300/70 dark:border-gray-600 hover:bg-blue-500 dark:hover:bg-gray-600 focus:border-white transition-colors"
                  style={{
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 8px center',
                    paddingRight: '30px',
                  }}
                >
                  <option value="en" style={{ backgroundColor: '#ffffff', color: '#111827', padding: '8px' }}>
                    English
                  </option>
                  <option value="ps" style={{ backgroundColor: '#ffffff', color: '#111827', padding: '8px' }}>
                    پښتو (Pashto)
                  </option>
                  <option value="fa" style={{ backgroundColor: '#ffffff', color: '#111827', padding: '8px' }}>
                    دری (Dari)
                  </option>
                </select>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 hover:bg-blue-600 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden bg-[#1E73BE] dark:bg-gray-800 border-t border-blue-600 dark:border-gray-700 overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive(link.path)
                        ? 'bg-white text-[#1E73BE] dark:bg-gray-700 dark:text-white'
                        : 'hover:bg-blue-600 dark:hover:bg-gray-700'
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
                {/* Contact button removed for mobile */}
                <div className="flex items-center justify-between space-x-4 mt-2 pt-4 border-t border-blue-600 dark:border-gray-700">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-gray-700 transition-colors"
                  >
                    {theme === 'light' ? (
                      <>
                        <Moon size={20} />
                        <span className="text-sm">Dark Mode</span>
                      </>
                    ) : (
                      <>
                        <Sun size={20} />
                        <span className="text-sm">Light Mode</span>
                      </>
                    )}
                  </button>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="bg-blue-600/80 dark:bg-gray-700 text-white text-sm font-medium px-3 py-2 rounded-lg outline-none cursor-pointer border border-blue-300/70 dark:border-gray-600"
                  >
                    <option value="en" style={{ backgroundColor: '#ffffff', color: '#111827', padding: '8px' }}>
                      English
                    </option>
                    <option value="ps" style={{ backgroundColor: '#ffffff', color: '#111827', padding: '8px' }}>
                      پښتو (Pashto)
                    </option>
                    <option value="fa" style={{ backgroundColor: '#ffffff', color: '#111827', padding: '8px' }}>
                      دری (Dari)
                    </option>
                  </select>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default Header;