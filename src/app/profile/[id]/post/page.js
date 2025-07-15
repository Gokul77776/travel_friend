'use client';

import { useState } from 'react';
import { useParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import BackgroundAnimation from '@/components/BackgroundAnimation'; // Adjust path if needed

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !description || !location) {
      toast.error("Please fill all fields", { position: 'top-right' });
      return;
    }

    const formData = new FormData();
    formData.append('image', e.target.image.files[0]);
    formData.append('description', description);
    formData.append('location', location);

    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}/post`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        toast.success('Post created successfully!', { position: 'top-right' });
        setTimeout(() => {
          router.push(`/profile/${userId}/main`);
        }, 2000);
      } else {
        toast.error(result.message || 'Error creating post', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while creating the post.', { position: 'top-right' });
    }
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0">
        <BackgroundAnimation />
      </div>

      {/* Form Content */}
      <div className="relative z-10 w-full h-full sm:w-1/2 lg:w-1/3 p-6 bg-white rounded-lg shadow-md border-2 border-orange-400 overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a New Post</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-lg font-medium mb-2">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
              className={`p-2 w-full border-2 rounded-md ${file ? 'border-orange-500' : 'border-orange-300'}`}
            />
            {file && (
              <div className="mt-4">
                <img src={file} alt="Selected Preview" className="w-full h-auto rounded-md border-2 border-orange-400" />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-lg font-medium mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className={`p-2 w-full border-2 rounded-md ${description ? 'border-orange-500' : 'border-orange-300'}`}
              rows="4"
              placeholder="Enter your post description"
            ></textarea>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-lg font-medium mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className={`p-2 w-full border-2 rounded-md ${location ? 'border-orange-500' : 'border-orange-300'}`}
              placeholder="Enter location"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 w-full cursor-pointer"
          >
            Create Post
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}