import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button.jsx';
import { useToast } from './ui/use-toast.js';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { saveMessage } from '../admin/utils.js';

const ServiceInquiryForm = () => {
  const { toast } = useToast();
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectType: 'Web Development',
    name: '',
    email: '',
    phone: '',
    budget: 'Under $500',
    timeline: 'Less than 1 month',
    projectDescription: '',
    requirements: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.projectDescription.trim()) {
      toast({
        title: t('errorFillFields') || "Please fill required fields",
        description: "Name, email, and project description are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // save project inquiry through central admin utils
      saveMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Project Type: ${formData.projectType}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\n\nProject Description:\n${formData.projectDescription}\n\nAdditional Requirements:\n${formData.requirements}`,
        type: 'Project Inquiry',
        status: 'pending',
        reply: '',
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
      });

      toast({
        title: "Project Inquiry Submitted!",
        description: "We've received your project details and will get back to you within 24 hours.",
        variant: "default",
      });
      
      setFormData({
        projectType: 'Web Development',
        name: '',
        email: '',
        phone: '',
        budget: 'Under $500',
        timeline: 'Less than 1 month',
        projectDescription: '',
        requirements: '',
      });
      setLoading(false);
    }, 500);
  };

  return (
    <section id="inquiry" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell Us About Your Project</h2>
            <p className="text-gray-600">Share your project details so we can understand how to help you best. We'll review and get back to you within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Type *</label>
              <select 
                name="projectType" 
                value={formData.projectType} 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent text-gray-900"
                required
              >
                <option>Web Development</option>
                <option>Mobile App Development</option>
                <option>UI/UX Design</option>
                <option>Logo Design</option>
                <option>Video Editing</option>
                <option>Digital Marketing</option>
                <option>Other</option>
              </select>
            </div>

            {/* Name, Email & Phone Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input 
                  required 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent text-gray-900" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input 
                  required 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent text-gray-900" 
                  placeholder="john@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent text-gray-900" 
                  placeholder="+93 XXX XXX XXX" 
                />
              </div>
            </div>

            {/* Budget & Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range *</label>
                <select 
                  name="budget" 
                  value={formData.budget} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent text-gray-900"
                  required
                >
                  <option>Under $500</option>
                  <option>$500 - $1,000</option>
                  <option>$1,000 - $2,500</option>
                  <option>$2,500 - $5,000</option>
                  <option>$5,000 - $10,000</option>
                  <option>Above $10,000</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Timeline *</label>
                <select 
                  name="timeline" 
                  value={formData.timeline} 
                  onChange={handleChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent text-gray-900"
                  required
                >
                  <option>Less than 1 month</option>
                  <option>1-2 months</option>
                  <option>2-3 months</option>
                  <option>3-6 months</option>
                  <option>More than 6 months</option>
                  <option>Flexible</option>
                </select>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
              <textarea 
                required 
                name="projectDescription" 
                value={formData.projectDescription} 
                onChange={handleChange} 
                rows="6" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent text-gray-900" 
                placeholder="Please describe your project in detail. What are your goals? What problems are you trying to solve? What features do you need?"
              />
            </div>

            {/* Additional Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements or Questions</label>
              <textarea 
                name="requirements" 
                value={formData.requirements} 
                onChange={handleChange} 
                rows="4" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent text-gray-900" 
                placeholder="Any specific technologies, integrations, or features you need? Any questions you'd like answered?"
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full py-4 bg-[#1E73BE] hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Project Inquiry'}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceInquiryForm;