import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { addReview, getReviews } from '../admin/utils.js';

const ServiceTestimonials = () => {
  const defaultTestimonials = [
    { name: 'Sarah Jenkins', role: 'Marketing Director', company: 'TechFlow', text: 'The web application they built for us exceeded all expectations. It streamlined our operations and boosted productivity by 40%.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { name: 'David Chen', role: 'Founder', company: 'EcoStyle', text: 'Incredible UI/UX design work. They truly understood our brand and translated it into a beautiful, user-friendly mobile app.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { name: 'Elena Rodriguez', role: 'CEO', company: 'HealthPlus', text: 'Professional, responsive, and highly skilled. The video editing team created promotional content that went viral in our niche.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { name: 'Michael Chang', role: 'Operations Manager', company: 'LogisTech', text: 'Their custom software development solved complex logistical challenges we had been facing for years. Highly recommended.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
  ];

  const [approvedReviews, setApprovedReviews] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const loadReviews = () => {
      const reviews = (getReviews() || [])
        .filter((item) => item.status === 'approved')
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setApprovedReviews(reviews);
    };

    loadReviews();
    window.addEventListener('dataUpdated', loadReviews);
    return () => window.removeEventListener('dataUpdated', loadReviews);
  }, []);

  const testimonials = useMemo(() => {
    if (approvedReviews.length === 0) {
      return defaultTestimonials;
    }

    return approvedReviews.map((item) => ({
      name: item.name || 'Anonymous Client',
      role: 'Verified Client',
      company: '',
      text: item.comment || '',
      rating: Number(item.rating) || 5,
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150',
    }));
  }, [approvedReviews]);

  const onSubmitReview = (event) => {
    event.preventDefault();
    setFormError('');
    setFormMessage('');

    if (!name.trim() || !comment.trim()) {
      setFormError('Please add your name and review message.');
      return;
    }

    addReview({
      name: name.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      status: 'pending',
    });

    setName('');
    setRating('5');
    setComment('');
    setFormMessage('Thanks for your review. It has been submitted and is waiting for admin approval.');
  };

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
              key={`${t.name}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex text-[#28A745] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < (t.rating || 5) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 text-sm leading-relaxed">"{t.text}"</p>
              <div className="flex items-center">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.company ? `${t.role}, ${t.company}` : t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Leave a Review</h3>
          <p className="text-sm text-gray-600 mb-4">Share your experience. Your review will appear after admin approval.</p>

          <form onSubmit={onSubmitReview} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
              <textarea
                rows="4"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                placeholder="Write your review here"
              />
            </div>

            {formError && <p className="text-sm text-red-600">{formError}</p>}
            {formMessage && <p className="text-sm text-green-700">{formMessage}</p>}

            <button type="submit" className="px-5 py-2.5 bg-[#1E73BE] text-white rounded-lg hover:bg-blue-700">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;