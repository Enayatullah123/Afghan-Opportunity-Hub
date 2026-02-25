import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from './ui/button.jsx';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { getPricingPlans } from '../admin/utils.js';

const PricingTiers = () => {
  const [activeService, setActiveService] = useState('Website Development');
  const { t } = useLocale();

  const services = [
    'Website Development', 'Mobile App Development', 'Web Application', 
    'Video Editing', 'UI/UX Design', 'Logo Design'
  ];

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const load = () => {
      const all = getPricingPlans() || [];
      setPlans(all);
    };
    load();
    const handler = () => load();
    window.addEventListener('dataUpdated', handler);
    return () => window.removeEventListener('dataUpdated', handler);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">Select a service to view our competitive pricing packages.</p>
          
          <div className="inline-block relative w-full max-w-xs">
            <select 
              value={activeService}
              onChange={(e) => setActiveService(e.target.value)}
              className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-[#1E73BE]"
            >
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-8 shadow-lg relative border ${tier.popular ? 'border-[#28A745] transform md:-translate-y-4' : 'border-gray-100'}`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.planName}</h3>
              <div className="text-4xl font-bold text-[#1E73BE] mb-6">{tier.price} AFG</div>
              <ul className="space-y-4 mb-8">
                {(tier.features || []).map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#28A745] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className={`w-full py-6 text-lg bg-[#1E73BE] hover:bg-blue-700 text-white`}>
                {t('getStarted')}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;