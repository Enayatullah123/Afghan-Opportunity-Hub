import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { saveMessage } from '../admin/utils.js';

const initialForm = {
  name: '',
  email: '',
  message: '',
};

const HelpRequestModal = ({ isOpen, onClose, contextTitle = '' }) => {
  const [form, setForm] = useState(initialForm);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert('Please fill all fields.');
      return;
    }

    saveMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      message: `[Help Request] ${contextTitle}\n\n${form.message.trim()}`,
      source: 'help-request',
      status: 'pending',
    });

    alert('Your request has been sent. We will contact you soon.');
    setForm(initialForm);
    onClose();
  };

  if (typeof document === 'undefined' || !isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          key="help-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60"
          onClick={onClose}
        />
        <motion.div
          key="help-modal"
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h3 className="text-lg font-bold text-gray-900">Need Help?</h3>
            <button onClick={onClose} className="p-1.5 rounded hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="p-5 space-y-3">
            {contextTitle && (
              <p className="text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded p-2">
                Opportunity: <span className="font-semibold text-gray-800">{contextTitle}</span>
              </p>
            )}
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              className="w-full p-2.5 border rounded-lg"
              required
            />
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              type="email"
              placeholder="Your email"
              className="w-full p-2.5 border rounded-lg"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              placeholder="Tell us what you need help with..."
              className="w-full p-2.5 border rounded-lg"
              rows="4"
              required
            />
            <div className="flex gap-2 pt-1">
              <button type="submit" className="flex-1 px-4 py-2.5 bg-[#1E73BE] text-white rounded-lg hover:bg-blue-700">
                Send Request
              </button>
              <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 bg-gray-200 rounded-lg hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default HelpRequestModal;
