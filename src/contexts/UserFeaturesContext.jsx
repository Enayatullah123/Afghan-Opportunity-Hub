import React, { createContext, useContext, useState } from 'react';

const PROFILE_KEY = 'user_profile_v1';
const APPLICATIONS_KEY = 'user_applications_v1';
const QA_KEY = 'community_qa_v1';

const initialProfile = {
  name: '',
  email: '',
  country: '',
  educationLevel: '',
  fieldOfStudy: '',
  cgpa: '',
  englishLevel: '',
};

const defaultQuestions = [
  {
    id: `q-${Date.now()}`,
    author: 'Community Member',
    question: 'What is the best way to improve my scholarship motivation letter?',
    createdAt: new Date().toISOString(),
    replies: [
      {
        id: `r-${Date.now()}`,
        author: 'Mentor',
        text: 'Use specific examples of your achievements and explain your future goals clearly.',
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

const UserFeaturesContext = createContext();

function safeParse(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function appKey(type, id, title) {
  return `${type}-${id || title || ''}`.toLowerCase();
}

export const UserFeaturesProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => safeParse(PROFILE_KEY, initialProfile));
  const [applications, setApplications] = useState(() => safeParse(APPLICATIONS_KEY, []));
  const [questions, setQuestions] = useState(() => safeParse(QA_KEY, defaultQuestions));

  const updateProfile = (newProfile) => {
    const nextProfile = { ...profile, ...newProfile };
    setProfile(nextProfile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
  };

  const saveOpportunity = (type, opportunity) => {
    if (!opportunity) return;

    const key = appKey(type, opportunity.id, opportunity.name || opportunity.title);

    const exists = applications.some((item) => item.key === key);
    if (exists) return;

    const newItem = {
      key,
      type,
      id: opportunity.id || null,
      title: opportunity.name || opportunity.title || 'Untitled',
      organization: opportunity.organization || opportunity.company || '',
      country: opportunity.country || '',
      location: opportunity.location || '',
      deadline: opportunity.deadline || '',
      status: 'Not Applied',
      savedAt: new Date().toISOString(),
    };

    const next = [newItem, ...applications];
    setApplications(next);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(next));
  };

  const updateApplicationStatus = (key, status) => {
    const next = applications.map((item) => (item.key === key ? { ...item, status } : item));
    setApplications(next);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(next));
  };

  const removeApplication = (key) => {
    const next = applications.filter((item) => item.key !== key);
    setApplications(next);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(next));
  };

  const isSavedOpportunity = (type, opportunity) => {
    const key = appKey(type, opportunity?.id, opportunity?.name || opportunity?.title);
    return applications.some((item) => item.key === key);
  };

  const addQuestion = ({ author, question }) => {
    const payload = {
      id: `q-${Date.now()}`,
      author: author || profile.name || 'Anonymous',
      question,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    const next = [payload, ...questions];
    setQuestions(next);
    localStorage.setItem(QA_KEY, JSON.stringify(next));
  };

  const addReply = (questionId, { author, text }) => {
    const next = questions.map((item) => {
      if (item.id !== questionId) return item;
      return {
        ...item,
        replies: [
          ...item.replies,
          {
            id: `r-${Date.now()}`,
            author: author || profile.name || 'Anonymous',
            text,
            createdAt: new Date().toISOString(),
          },
        ],
      };
    });

    setQuestions(next);
    localStorage.setItem(QA_KEY, JSON.stringify(next));
  };

  const value = {
    profile,
    updateProfile,
    applications,
    saveOpportunity,
    updateApplicationStatus,
    removeApplication,
    isSavedOpportunity,
    questions,
    addQuestion,
    addReply,
  };

  return <UserFeaturesContext.Provider value={value}>{children}</UserFeaturesContext.Provider>;
};

export const useUserFeatures = () => {
  const context = useContext(UserFeaturesContext);
  if (!context) throw new Error('useUserFeatures must be used within UserFeaturesProvider');
  return context;
};
