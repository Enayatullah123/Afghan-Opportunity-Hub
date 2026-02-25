import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, ShieldCheck, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const benefits = [
    { icon: Users, title: 'Expert Team', desc: 'Our team consists of seasoned professionals with years of industry experience.' },
    { icon: Zap, title: 'Fast Delivery', desc: 'We use agile methodologies to ensure rapid development without compromising quality.' },
    { icon: ShieldCheck, title: 'Quality Assurance', desc: 'Rigorous testing protocols guarantee bug-free and highly performant deliverables.' },
    { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock maintenance and support to keep your digital assets running smoothly.' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">We deliver excellence through our commitment to quality, speed, and customer satisfaction.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-100 hover:border-[#1E73BE] group"
            >
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#1E73BE] transition-colors">
                <benefit.icon className="w-8 h-8 text-[#1E73BE] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;