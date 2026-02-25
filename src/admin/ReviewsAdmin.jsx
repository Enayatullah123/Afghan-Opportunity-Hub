import React, { useEffect, useState } from 'react';
import { getReviews, updateReview, deleteReview } from './utils.js';

const ReviewsAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const load = () => setReviews(getReviews() || []);
  useEffect(()=>{ load(); const h=()=>load(); window.addEventListener('dataUpdated',h); return ()=>window.removeEventListener('dataUpdated',h); },[]);

  const handleApprove = (id) => { updateReview(id, { status: 'approved' }); load(); }
  const handleReject = (id) => { updateReview(id, { status: 'rejected' }); load(); }
  const handleDelete = (id) => { if(!window.confirm('Delete review?')) return; deleteReview(id); load(); }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Client Reviews</h2>
      {reviews.length === 0 ? <div className="text-gray-600">No reviews yet.</div> : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Comment</th>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="p-2 align-top">{r.name}</td>
                  <td className="p-2 align-top">{r.rating}</td>
                  <td className="p-2 align-top max-w-lg"><div className="truncate">{r.comment}</div></td>
                  <td className="p-2 align-top">{new Date(r.createdAt).toLocaleString()}</td>
                  <td className="p-2 align-top">{r.status}</td>
                  <td className="p-2 align-top">
                    <div className="flex gap-2">
                      {r.status !== 'approved' && <button onClick={()=>handleApprove(r.id)} className="px-3 py-1 bg-green-100 text-green-700 rounded">Approve</button>}
                      {r.status !== 'rejected' && <button onClick={()=>handleReject(r.id)} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded">Reject</button>}
                      <button onClick={()=>handleDelete(r.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReviewsAdmin;