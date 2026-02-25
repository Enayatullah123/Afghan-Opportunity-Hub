import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ServiceTestimonials = () => {
  const testimonials = [
    { name: 'Sarah Jenkins', role: 'Marketing Director', company: 'TechFlow', text: 'The web application they built for us exceeded all expectations. It streamlined our operations and boosted productivity by 40%.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { name: 'David Chen', role: 'Founder', company: 'EcoStyle', text: 'Incredible UI/UX design work. They truly understood our brand and translated it into a beautiful, user-friendly mobile app.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { name: 'Elena Rodriguez', role: 'CEO', company: 'HealthPlus', text: 'Professional, responsive, and highly skilled. The video editing team created promotional content that went viral in our niche.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { name: 'Michael Chang', role: 'Operations Manager', company: 'LogisTech', text: 'Their custom software development solved complex logistical challenges we had been facing for years. Highly recommended.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Read about the experiences of our satisfied partners.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex text-[#28A745] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-gray-700 italic mb-6 text-sm leading-relaxed">"{t.text}"</p>
              <div className="flex items-center">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;