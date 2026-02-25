import React from 'react';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, MapPin, Calendar, DollarSign, FileText, CheckCircle, ExternalLink, Building, PlayCircle } from 'lucide-react';
import { Button } from './ui/button.jsx';

const ScholarshipDetailModal = ({ isOpen, onClose, scholarship }) => {
  const { t } = useLocale();

  if (!scholarship) return null;

  // Extract YouTube video ID from URL or use as-is if it's already an ID
  const getYouTubeVideoId = (link) => {
    if (!link) return null;
    
    const trimmedLink = link.trim();
    
    // If it's already a video ID (11 characters), return it
    if (trimmedLink.length === 11 && !/[\/\s\.]/.test(trimmedLink)) {
      return trimmedLink;
    }
    
    // Extract from various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\s#]+)/i,
      /(?:youtu\.be\/)([^?\s#]+)/i,
      /(?:youtube\.com\/embed\/)([^?\s#]+)/i,
      /(?:youtube\.com\/v\/)([^?\s#]+)/i,
      /(?:youtube\.com\/shorts\/)([^?\s#]+)/i,
      /[?&]v=([^&\s#]+)/i
    ];
    
    for (const pattern of patterns) {
      const match = trimmedLink.match(pattern);
      if (match && match[1]) {
        // Clean the video ID (remove any trailing parameters)
        const videoId = match[1].split('&')[0].split('?')[0].trim();
        return videoId;
      }
    }
    
    // If no pattern matched, return null
    return null;
  };

  const videoId = getYouTubeVideoId(scholarship.videoLink);

  if (typeof document === 'undefined') return null;

  if (!isOpen) return null;
  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl font-poppins"
        >
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-[#1E73BE]" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">{scholarship.title || scholarship.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Key Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <MapPin className="w-5 h-5 text-[#1E73BE] mb-2" />
                  <p className="text-sm text-gray-500">{t('countryLabel')}</p>
                  <p className="font-semibold text-gray-900">{scholarship.country}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <Calendar className="w-5 h-5 text-red-500 mb-2" />
                  <p className="text-sm text-gray-500">{t('deadlineLabel')}</p>
                  <p className="font-semibold text-gray-900">{scholarship.deadline}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <DollarSign className="w-5 h-5 text-[#28A745] mb-2" />
                  <p className="text-sm text-gray-500">{t('awardLabel')}</p>
                  <p className="font-semibold text-gray-900">{scholarship.stipend || t('awardLabel') || 'Fully Funded'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <Building className="w-5 h-5 text-[#1E73BE] mb-2" />
                  <p className="text-sm text-gray-500">{t('organizationLabel')}</p>
                  <p className="font-semibold text-gray-900">{scholarship.organization}</p>
                </div>
              </div>

              {/* Description & Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#1E73BE]" />
                      {t('Scholarship Description') || 'Scholarship Description'}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{scholarship.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#28A745]" />
                      {t('requirementsHeading')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{scholarship.requirements || scholarship.eligibility}</p>
                  </div>

                  {scholarship.eligibility && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#1E73BE]" />
                      {t('eligibilityLabel')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{scholarship.eligibility}</p>
                  </div>
                  )}
                </div>

                {/* Video Tutorial */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{t('howToApplyHeading')}</h3>
                  <div className="relative pb-[56.25%] rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
                    {videoId ? (
                      <a
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-0 left-0 w-full h-full group cursor-pointer"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                          alt="Video Thumbnail"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform shadow-2xl">
                            <PlayCircle className="w-16 h-16 text-white" fill="white" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                          Watch on YouTube
                        </div>
                      </a>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        {t('videoComingSoon')}
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mt-6">
                    <h4 className="font-bold text-[#1E73BE] mb-2">{t('applicationStepsHeading')}</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                      <li>{t('step_watch_video')}</li>
                      <li>{t('step_update_cv')}</li>
                      <li>{t('step_click_apply')}</li>
                      <li>{t('step_create_account') || t('step_update_cv')}</li>
                      <li>{t('step_submit_before')} <span className="font-semibold text-red-600">{scholarship.deadline}</span></li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <Button 
                  onClick={() => scholarship.applyLink && window.open(scholarship.applyLink, '_blank', 'noopener,noreferrer')}
                  disabled={!scholarship.applyLink}
                  className="flex-1 bg-[#1E73BE] hover:bg-blue-700 text-white py-6 text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('applyNow')} <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" onClick={onClose} className="flex-1 py-6 text-lg border-gray-300 text-gray-700 hover:bg-gray-50">
                  {t('close')}
                </Button>
              </div>
            </div>
          </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default ScholarshipDetailModal;