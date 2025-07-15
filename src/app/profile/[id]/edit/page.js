
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProfile() {
  const { id } = useParams();
  const router = useRouter();
  console.log(id);
  

  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  

  // TO get the user data 
  useEffect(() => {
    const getData = async ()=>{
      try {
        const res = await fetch(`http://localhost:3000/api/users/${id}/profile`);
        const data = await res.json();
        setProfile(data.user.profileImage)
        setBio(data.user.bio)
        setLocation(data.user.location)
        setDateOfBirth(data.user.dateOfBirth)
        console.log(data.user);
        
      } catch (error) {
        console.log("error occured while fetchig the data",error); 
      }
    }
  getData();
     
  }, [id]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (profile) formData.append("profileImage", profile);
    formData.append("bio", bio);
    formData.append("location", location);
    formData.append("dateOfBirth", dateOfBirth);

    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}/profile`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Profile updated successfully!");
        router.push(`/profile/${id}/main`);
      } else {
        alert("❌ Failed to update profile: " + data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-10 shadow-md rounded-lg m-10 border border-amber-600 grid place-items-center">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleUpdate} >
        <div className="mb-4 flex justify-center items-center flex-col">
          <label className="block mb-2 font-semibold">Profile Image</label>
          <div className='h-56 w-56' >
          <img
            src={previewUrl ? previewUrl : profile}
            alt="User Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

          <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border px-3 py-2 mt-4 rounded"
      />

        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Bio</label>
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your city"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Date of Birth</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition cursor-pointer"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
