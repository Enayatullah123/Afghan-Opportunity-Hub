import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Code, CheckSquare, Rocket } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    { icon: MessageSquare, title: 'Consultation', desc: 'We discuss your vision, goals, and requirements.' },
    { icon: PenTool, title: 'Planning & Design', desc: 'Creating wireframes, UI/UX designs, and project roadmaps.' },
    { icon: Code, title: 'Development', desc: 'Building your solution using cutting-edge technologies.' },
    { icon: CheckSquare, title: 'Testing', desc: 'Comprehensive QA to ensure everything works flawlessly.' },
    { icon: Rocket, title: 'Delivery', desc: 'Launching your project and providing ongoing support.' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our streamlined process ensures transparency and efficiency from start to finish.</p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-blue-200 -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-[#1E73BE] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg border-4 border-white">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;