import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ServiceFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: 'How long does it take to build a website?', a: 'A standard corporate website typically takes 2-4 weeks, while complex web applications or e-commerce platforms can take 8-12 weeks depending on the requirements.' },
    { q: 'Do you offer revisions during the design phase?', a: 'Yes, we offer multiple revision rounds depending on your chosen pricing tier to ensure the final design perfectly aligns with your vision.' },
    { q: 'Will my website/app be mobile-friendly?', a: 'Absolutely. All our digital products are built with a mobile-first approach, ensuring they look and function perfectly on all devices.' },
    { q: 'Do you provide ongoing support and maintenance?', a: 'Yes, we offer various maintenance packages to keep your software updated, secure, and running smoothly after launch.' },
    { q: 'What technologies do you use?', a: 'We use modern stacks including React, Node.js, Next.js, React Native, and Flutter, ensuring scalable and high-performance solutions.' },
    { q: 'Can you help with SEO?', a: 'Yes, basic on-page SEO is included in most of our web development packages, and we offer advanced SEO services as well.' },
    { q: 'Who owns the source code after completion?', a: 'Once the project is fully paid for, you own 100% of the source code and intellectual property.' },
    { q: 'What is your payment structure?', a: 'We typically require a 50% deposit to start, 25% upon design approval, and the final 25% before launch.' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Got questions? We've got answers.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full flex justify-between items-center p-5 text-left font-semibold transition-colors ${openIndex === index ? 'bg-blue-50 text-[#1E73BE]' : 'bg-white text-gray-900 hover:bg-gray-50'}`}
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-[#1E73BE]' : 'text-gray-500'}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white px-5 pb-5 text-gray-600"
                  >
                    <div className="pt-2 border-t border-gray-100 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQ;