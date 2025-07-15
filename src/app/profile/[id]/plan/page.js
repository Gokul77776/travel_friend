'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackgroundAnimation from '@/components/BackgroundAnimation';

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    image: null,
    description: '',
    location: '',
    date: '',
    totalAmount: '',
    requiredAmount: '',
    totalMembers: '',
    requiredMembers: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('image', formData.image);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('date', formData.date);
    data.append('totalAmount', formData.totalAmount);
    data.append('requiredAmount', formData.requiredAmount);
    data.append('totalMembers', formData.totalMembers);
    data.append('requiredMembers', formData.requiredMembers);

    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}/plan`, {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to create plan');

      toast.success('🎉 Plan created successfully!');
      setTimeout(() => {
        router.push(`/profile/${id}/main`);
      }, 2000); // Delay redirect so user sees the toast
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ backgroundPosition: '0% 50%' }}
      animate={{ backgroundPosition: '100% 50%' }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      className="p-1 rounded-xl bg-gradient-to-r from-orange-500 via-purple-500 to-orange-600 bg-[length:200%_200%] max-w-md m-auto text-center"
    >
      <BackgroundAnimation />

      <form className="bg-white rounded-xl p-6 space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold">Create New Plan</h2>

        <input type="file" name="image" onChange={handleChange} required />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount"
          value={formData.totalAmount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="requiredAmount"
          placeholder="Required Amount"
          value={formData.requiredAmount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="totalMembers"
          placeholder="Total Members"
          value={formData.totalMembers}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="requiredMembers"
          placeholder="Required Members"
          value={formData.requiredMembers}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 disabled:opacity-70 cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Create Plan'}
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
}
