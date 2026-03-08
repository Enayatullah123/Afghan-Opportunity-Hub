import React, { useState } from 'react';
import { MessageCircleMore } from 'lucide-react';
import { useUserFeatures } from '../contexts/UserFeaturesContext.jsx';

const CommunityQA = () => {
  const { questions, addQuestion, addReply } = useUserFeatures();
  const [questionText, setQuestionText] = useState('');
  const [replyInput, setReplyInput] = useState({});

  const submitQuestion = (event) => {
    event.preventDefault();
    if (!questionText.trim()) return;
    addQuestion({ question: questionText.trim() });
    setQuestionText('');
  };

  const submitReply = (event, questionId) => {
    event.preventDefault();
    const reply = (replyInput[questionId] || '').trim();
    if (!reply) return;
    addReply(questionId, { text: reply });
    setReplyInput((prev) => ({ ...prev, [questionId]: '' }));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Community Q&A</h2>
            <p className="text-lg text-gray-600">Ask questions and learn from other students and applicants.</p>
          </div>

          <form onSubmit={submitQuestion} className="bg-white rounded-xl shadow-lg p-5 mb-8 border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Post a question</label>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg"
                placeholder="Ask about scholarships, jobs, CV, or applications..."
              />
              <button type="submit" className="bg-[#1E73BE] text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700">
                Post Question
              </button>
            </div>
          </form>

          <div className="space-y-5">
            {questions.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow p-5 border border-gray-100">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-blue-100 text-[#1E73BE] p-2 rounded-lg">
                    <MessageCircleMore className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.author}</p>
                    <p className="text-gray-700">{item.question}</p>
                  </div>
                </div>

                {item.replies.length > 0 && (
                  <div className="ml-2 md:ml-10 space-y-2 mb-3">
                    {item.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-semibold text-gray-800">{reply.author}</p>
                        <p className="text-sm text-gray-700">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                <form onSubmit={(event) => submitReply(event, item.id)} className="ml-2 md:ml-10 flex gap-2">
                  <input
                    value={replyInput[item.id] || ''}
                    onChange={(e) => setReplyInput((prev) => ({ ...prev, [item.id]: e.target.value }))}
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Write a reply..."
                  />
                  <button type="submit" className="px-3 py-2 text-sm bg-[#28A745] text-white rounded-lg hover:bg-green-700">
                    Reply
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityQA;
