import React, { useEffect, useState } from 'react';
import { getMessages, updateMessage, deleteMessage } from './utils.js';
import { Mail, CheckCircle, Clock, Trash2, Eye } from 'lucide-react';

const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [viewing, setViewing] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const loadMessages = () => setMessages(getMessages());
    loadMessages();

    // Listen for real-time updates
    const handler = () => loadMessages();
    window.addEventListener('dataUpdated', handler);
    return () => window.removeEventListener('dataUpdated', handler);
  }, []);

  const refresh = () => setMessages(getMessages());

  const handleReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    
    updateMessage(viewing.id, { reply: replyText, status: 'replied' });
    const updated = getMessages().find(m => m.id === viewing.id);
    setViewing(updated);
    setReplyText('');
    refresh();
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this message?')) return;
    deleteMessage(id);
    refresh();
    setViewing(null);
  };

  const getStatusColor = (status) => {
    return status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getStatusIcon = (status) => {
    return status === 'replied' ? (
      <CheckCircle className="w-4 h-4 inline mr-1 text-green-600" />
    ) : (
      <Clock className="w-4 h-4 inline mr-1 text-yellow-600" />
    );
  };

  const getTruncatedMessage = (msg, length = 50) => {
    return msg.length > length ? msg.substring(0, length) + '...' : msg;
  };

  const getTypeColor = (type) => {
    if (type.includes('Scholarship')) return 'bg-blue-100 text-blue-800';
    if (type.includes('Job')) return 'bg-green-100 text-green-800';
    if (type.includes('Project')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#1E73BE]" />
            Messages
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {messages.length} total • {messages.filter(m => m.status === 'pending').length} pending • {messages.filter(m => m.status === 'replied').length} replied
          </p>
        </div>
      </div>

      {/* Messages Table */}
      {messages.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No messages yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">From</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Message</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {messages.map(m => (
                <tr key={m.id} className={`hover:bg-gray-50 transition-colors ${m.status === 'replied' ? 'bg-green-50' : ''}`}>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{m.name}</p>
                      <p className="text-xs text-gray-500">{m.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(m.type)}`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-600 max-w-xs">{getTruncatedMessage(m.message)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(m.status)}`}>
                      {getStatusIcon(m.status)} {m.status === 'replied' ? 'Replied' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(m.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button 
                      onClick={() => setViewing(m)} 
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button 
                      onClick={() => handleDelete(m.id)} 
                      className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-sm font-medium transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Detail Modal */}
      {viewing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{viewing.name}</h3>
                <p className="text-sm text-gray-600">{viewing.email}</p>
              </div>
              <button
                onClick={() => setViewing(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Message Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message Type</label>
                  <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(viewing.type)}`}>
                    {viewing.type}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <p className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(viewing.status)}`}>
                    {getStatusIcon(viewing.status)} {viewing.status === 'replied' ? 'Replied' : 'Pending'}
                  </p>
                </div>
              </div>

              {/* Project-Specific Details (if applicable) */}
              {viewing.type === 'Project Inquiry' && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Project Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {viewing.projectType && (
                      <div>
                        <span className="font-medium text-gray-700">Project Type:</span>
                        <p className="text-gray-900">{viewing.projectType}</p>
                      </div>
                    )}
                    {viewing.budget && (
                      <div>
                        <span className="font-medium text-gray-700">Budget:</span>
                        <p className="text-gray-900">{viewing.budget}</p>
                      </div>
                    )}
                    {viewing.timeline && (
                      <div>
                        <span className="font-medium text-gray-700">Timeline:</span>
                        <p className="text-gray-900">{viewing.timeline}</p>
                      </div>
                    )}
                    {viewing.phone && (
                      <div>
                        <span className="font-medium text-gray-700">Phone:</span>
                        <p className="text-gray-900">{viewing.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* User Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Message</label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-gray-800 whitespace-pre-wrap">{viewing.message}</p>
                </div>
              </div>

              {/* Admin Reply */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {viewing.status === 'replied' ? 'Reply Sent' : 'Send Reply'}
                </label>
                {viewing.status === 'replied' && viewing.reply ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-gray-800 whitespace-pre-wrap">{viewing.reply}</p>
                    <p className="text-xs text-gray-600 mt-2">
                      Replied on {new Date(viewing.createdAt).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleReply} className="space-y-3">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply here..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E73BE] focus:border-transparent resize-none"
                      rows="4"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={!replyText.trim()}
                        className="flex-1 px-4 py-2 bg-[#1E73BE] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        Send Reply
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewing(null)}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Delete Button */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => {
                    handleDelete(viewing.id);
                    setViewing(null);
                  }}
                  className="w-full px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesAdmin;
