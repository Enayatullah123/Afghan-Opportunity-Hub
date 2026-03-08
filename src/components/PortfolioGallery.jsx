import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPortfolios } from '../admin/utils.js';

const PortfolioGallery = () => {
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = () => {
      const all = getPortfolios() || [];
      // normalize category names
      setItems(all.map(p => ({
        id: p.id,
        category: p.category || 'Web',
        title: p.title?.en || p.title || '',
        image: p.image || '',
        projectLink: p.projectLink || '',
      })));
    };
    load();
    const handler = () => load();
    window.addEventListener('dataUpdated', handler);
    return () => window.removeEventListener('dataUpdated', handler);
  }, []);

  const categories = ['All', 'Web', 'App', 'UI/UX', 'Logo', 'Video'];
  const filteredItems = filter === 'All' ? items : items.filter(i => i.category === filter);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our recent projects across various digital disciplines.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat ? 'bg-[#1E73BE] text-white' : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl bg-white"
              >
                <div className="aspect-w-16 aspect-h-12 w-full h-64">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{item.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <div className="flex gap-2">
                    <a href={item.projectLink || '#'} target="_blank" rel="noreferrer" className="px-3 py-2 bg-[#1E73BE] text-white rounded">View Project</a>
                    {item.projectLink && (
                      <a href={item.projectLink} target="_blank" rel="noreferrer" className="px-3 py-2 bg-white border rounded text-[#1E73BE]">Open Link</a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioGallery;