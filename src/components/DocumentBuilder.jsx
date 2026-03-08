import React, { useMemo } from 'react';
import { FileDown } from 'lucide-react';
import { useUserFeatures } from '../contexts/UserFeaturesContext.jsx';

const downloadTextFile = (fileName, content) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const DocumentBuilder = () => {
  const { profile } = useUserFeatures();

  const cvText = useMemo(() => {
    return `CURRICULUM VITAE\n\nName: ${profile.name || 'Your Name'}\nEmail: ${profile.email || 'your.email@example.com'}\nCountry: ${profile.country || 'Your Country'}\n\nEducation Level: ${profile.educationLevel || 'Not provided'}\nField of Study: ${profile.fieldOfStudy || 'Not provided'}\nCGPA: ${profile.cgpa || 'Not provided'}\nEnglish Level: ${profile.englishLevel || 'Not provided'}\n\nSummary:\nMotivated learner seeking scholarship and job opportunities with strong commitment to growth.`;
  }, [profile]);

  const motivationLetter = useMemo(() => {
    return `MOTIVATION LETTER\n\nDear Selection Committee,\n\nMy name is ${profile.name || 'Your Name'}, and I am from ${profile.country || 'my country'}. I am writing to express my strong interest in this opportunity.\n\nI have a background in ${profile.fieldOfStudy || 'my field'} at ${profile.educationLevel || 'my current level'}, with a CGPA of ${profile.cgpa || 'N/A'}. My English level is ${profile.englishLevel || 'developing'}, and I am committed to continuous improvement.\n\nThis opportunity aligns with my academic and professional goals, and I am ready to contribute with dedication and responsibility.\n\nThank you for your time and consideration.\n\nSincerely,\n${profile.name || 'Your Name'}`;
  }, [profile]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-gray-50 border border-gray-100 rounded-xl p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Document Builder</h2>
          <p className="text-gray-600 mb-6">Generate simple CV and Motivation Letter drafts using your profile data.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-3">CV Generator</h3>
              <pre className="text-xs text-gray-700 bg-gray-50 p-3 rounded-lg h-64 overflow-auto whitespace-pre-wrap">{cvText}</pre>
              <button
                onClick={() => downloadTextFile('CV.txt', cvText)}
                className="mt-4 inline-flex items-center gap-2 bg-[#1E73BE] text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <FileDown className="w-4 h-4" /> Download CV Text
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Motivation Letter Generator</h3>
              <pre className="text-xs text-gray-700 bg-gray-50 p-3 rounded-lg h-64 overflow-auto whitespace-pre-wrap">{motivationLetter}</pre>
              <button
                onClick={() => downloadTextFile('Motivation-Letter.txt', motivationLetter)}
                className="mt-4 inline-flex items-center gap-2 bg-[#28A745] text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <FileDown className="w-4 h-4" /> Download Letter Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentBuilder;
