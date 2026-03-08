import React from 'react';
import { FileText, PenTool, FolderOpen, Send } from 'lucide-react';

const roadmap = [
  { step: 'Step 1', title: 'CV', description: 'Create a clean CV with your latest education, skills, and achievements.', icon: FileText },
  { step: 'Step 2', title: 'Motivation Letter', description: 'Write a tailored motivation letter for each opportunity.', icon: PenTool },
  { step: 'Step 3', title: 'Documents', description: 'Prepare transcripts, certificates, recommendation letters, and ID.', icon: FolderOpen },
  { step: 'Step 4', title: 'Apply', description: 'Submit before deadline and keep proof of your application.', icon: Send },
];

const ApplicationRoadmap = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Application Roadmap</h2>
          <p className="text-lg text-gray-600">Follow these steps in order for stronger applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmap.map((item, index) => (
            <div key={item.step} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg border border-blue-100">
              <div className="w-12 h-12 rounded-full bg-[#1E73BE] text-white flex items-center justify-center font-bold mb-4">
                {index + 1}
              </div>
              <item.icon className="w-10 h-10 text-[#1E73BE] mb-3" />
              <p className="text-sm font-semibold text-[#1E73BE] mb-1">{item.step}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationRoadmap;
