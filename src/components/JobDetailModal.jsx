import React from 'react';
import { useLocale } from '../contexts/LocaleContext.jsx';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, MapPin, Calendar, DollarSign, Building, CheckCircle, ExternalLink, FileText, Users, Award, Clock, Hash, GraduationCap, Mail, AlertCircle, PlayCircle } from 'lucide-react';
import { Button } from './ui/button.jsx';

const JobDetailModal = ({ isOpen, onClose, job }) => {
  const { t } = useLocale();

  // Return nothing if job is not provided
  if (!job) {
    return null;
  }

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
    
    return null;
  };

  const videoId = getYouTubeVideoId(job.videoLink || job.videoId);

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
                <div className="bg-green-100 p-2 rounded-lg">
                  <Briefcase className="w-6 h-6 text-[#28A745]" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">{job.title}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Building className="w-4 h-4" /> {job.company || job.organization}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Job Details Grid */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {/* Job Location */}
                  {job.location && (
                    <div className="flex items-start justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">Job Location:</span>
                      <span className="text-gray-700 text-right">{job.location}</span>
                    </div>
                  )}
                  
                  {/* City */}
                  {job.city && (
                    <div className="flex items-start justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">City:</span>
                      <span className="text-gray-700 text-right">{job.city}</span>
                    </div>
                  )}

                  {/* Nationality */}
                  {job.nationality && (
                    <div className="flex items-start justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">Nationality:</span>
                      <span className="text-gray-700 text-right">{job.nationality}</span>
                    </div>
                  )}

                  {/* Organization */}
                  {(job.company || job.organization) && (
                    <div className="flex items-start justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">Organization:</span>
                      <span className="text-gray-700 text-right">{job.company || job.organization}</span>
                    </div>
                  )}

                  {/* Category */}
                  {job.category && (
                    <div className="flex items-start justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">Category:</span>
                      <span className="text-gray-700 text-right">{job.category}</span>
                    </div>
                  )}

                  {/* Years of Experience */}
                  {job.yearsOfExperience && (
                    <div className="flex items-start justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">Years of Experience:</span>
                      <span className="text-gray-700 text-right">{job.yearsOfExperience}</span>
                    </div>
                  )}

                  {/* Employment Type */}
                  {job.jobType && (
                    <div className="flex items-start justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">Employment Type:</span>
                      <span className="text-gray-700 text-right">{job.jobType}</span>
                    </div>
                  )}

                  {/* Contract Duration */}
                  {job.contractDuration && (
                    <div className="flex items-start justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">Contract Duration:</span>
                      <span className="text-gray-700 text-right">{job.contractDuration}</span>
                    </div>
                  )}

                  {/* Salary */}
                  {job.salary && (
                    <div className="flex items-start justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">Salary:</span>
                      <span className="text-gray-700 text-right">{job.salary}</span>
                    </div>
                  )}

                  {/* Gender */}
                  {job.gender && (
                    <div className="flex items-start justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">Gender:</span>
                      <span className="text-gray-700 text-right">{job.gender}</span>
                    </div>
                  )}

                  {/* Vacancy Number */}
                  {job.vacancyNumber && (
                    <div className="flex items-start justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">Vacancy Number:</span>
                      <span className="text-gray-700 text-right">{job.vacancyNumber}</span>
                    </div>
                  )}

                  {/* Number of Jobs */}
                  {job.numberOfJobs && (
                    <div className="flex items-start justify-between py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900">No. Of Jobs:</span>
                      <span className="text-gray-700 text-right">{job.numberOfJobs}</span>
                    </div>
                  )}

                  {/* Education - spans both columns */}
                  {job.education && (
                    <div className="md:col-span-2 py-2 border-b border-gray-100">
                      <span className="font-semibold text-gray-900 block mb-2">Education:</span>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.education}</p>
                    </div>
                  )}

                  {/* Close date */}
                  {job.deadline && (
                    <div className="md:col-span-2 flex items-start justify-between py-2">
                      <span className="font-semibold text-gray-900">Close date:</span>
                      <span className="text-red-600 font-semibold text-right">{job.deadline}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Description & Requirements */}
              {(job.description || job.requirements) && (
                <div className="space-y-6">
                  {/* Job Description */}
                  {job.description && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#1E73BE]" />
                        Job Description
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
                    </div>
                  )}
                  
                  {/* Requirements */}
                  {job.requirements && (
                    <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#28A745]" />
                        Requirements
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.requirements}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Video Tutorial & Application Steps */}
              {(videoId || job.applyLink) && (
                <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-[#28A745]" />
                    How to Apply
                  </h3>
                  
                  {videoId && (
                    <div className="mb-6">
                      <div className="relative pb-[56.25%] rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100">
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
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-white p-5 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-[#28A745] mb-3 text-lg">Application Steps:</h4>
                    <ol className="list-decimal list-inside space-y-3 text-gray-700">
                      <li className="leading-relaxed">Review all job requirements and qualifications carefully.</li>
                      <li className="leading-relaxed">Update your CV/Resume to highlight relevant experience.</li>
                      {videoId && <li className="leading-relaxed">Watch the application guide video above.</li>}
                      <li className="leading-relaxed">Click "Apply Now" to submit your application through the official portal.</li>
                      {job.deadline && (
                        <li className="leading-relaxed">
                          Submit before the deadline: <span className="font-semibold text-red-600">{job.deadline}</span>
                        </li>
                      )}
                    </ol>
                  </div>
                </div>
              )}

              {/* Submission Guidelines Section */}
              {job.submissionGuideline && (
                <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl mt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-900 mb-2">Application Guidelines:</h4>
                      <p className="text-gray-700 whitespace-pre-wrap text-sm mb-3">{job.submissionGuideline}</p>
                      {job.submissionEmail && (
                        <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-blue-100 mt-3">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">
                            <span className="font-semibold text-gray-800">Submit to: </span>
                            <a href={`mailto:${job.submissionEmail}`} className="text-blue-600 hover:underline font-semibold">
                              {job.submissionEmail}
                            </a>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Application Form or Action Buttons */}
              {job.applyLink ? (
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 mt-6">
                  <Button 
                    onClick={() => window.open(job.applyLink, '_blank', 'noopener,noreferrer')}
                    className="flex-1 bg-[#28A745] hover:bg-green-700 text-white py-6 text-lg shadow-lg"
                  >
                    Apply Now <ExternalLink className="w-5 h-5 ml-2" />
                  </Button>
                  <Button variant="outline" onClick={onClose} className="flex-1 py-6 text-lg border-gray-300 text-gray-700 hover:bg-gray-50">
                    Close
                  </Button>
                </div>
              ) : !job.applyLink ? (
                <div className="flex pt-6 border-t border-gray-100 mt-6">
                  <Button variant="outline" onClick={onClose} className="flex-1 py-6 text-lg border-gray-300 text-gray-700 hover:bg-gray-50">
                    Close
                  </Button>
                </div>
              ) : null}
            </div>
          </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default JobDetailModal;