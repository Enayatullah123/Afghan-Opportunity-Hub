import React, { useState } from 'react';
import { savePost } from './utils.js';

const AddSuccessStory = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [studentName, setStudentName] = useState('');
  const [program, setProgram] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const post = {
      id: Date.now(),
      type: 'success-story',
      title: { en: title || studentName || 'Success Story' },
      description: {
        en: `Student: ${studentName}\nProgram/Job: ${program}\nCountry: ${country}\n\n${description}`,
      },
      studentName,
      program,
      country,
      createdAt: new Date().toISOString(),
    };

    savePost(post);

    setTitle('');
    setDescription('');
    setStudentName('');
    setProgram('');
    setCountry('');

    alert('Success story added.');
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Success Story</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Story title"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Student name"
            required
          />
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Country"
          />
        </div>

        <input
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Program / Job secured"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={5}
          placeholder="Story details"
          required
        />

        <button type="submit" className="px-4 py-2 bg-[#1E73BE] text-white rounded hover:bg-blue-700">
          Save Story
        </button>
      </form>
    </div>
  );
};

export default AddSuccessStory;
