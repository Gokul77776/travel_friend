'use client';
import { useState, useRef, useEffect } from "react";
import { useParams } from 'next/navigation';

const ProfileForm = () => {
  const params = useParams();
  const userId = params.id;
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error("User not found");
        const userData = await res.json();
        setUsername(userData.name);  
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    setProfileImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileImage) return alert("Please upload a profile image");

    const formData = new FormData();
    formData.append("profileImage", profileImage);
    formData.append("bio", bio);
    formData.append("location", location);
    formData.append("dateOfBirth", dateOfBirth);

    try {
      const res = await fetch(`/api/users/${userId}/profile`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Profile uploaded successfully!");
        alert("Profile uploaded successfully!");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("Network error occurred.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-50 bg-[var(--primary-color)] text-5xl text-center text-white flex items-center justify-center  ">
        {username ? `Welcome, ${username}` : ""}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative max-w-md mx-auto bg-white p-5 rounded-lg shadow space-y-4 pt-16 border border-[var(--primary-color)]"
      >
        {/* Profile image */}
        <div
          className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-50 h-50 rounded-full border-4 border-white overflow-hidden bg-gray-100 cursor-pointer shadow-md"
          onClick={handleImageClick}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 text-3xl font-bold">
              +
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>

        <div className="mt-25 space-y-6">
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border border-[var(--primary-color)] p-2 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-[var(--primary-color)] p-2 rounded"
          />
          <input
            type="date"
            value={dateOfBirth}
            placeholder="DOB"
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full border border-[var(--primary-color)] p-2 rounded"
          />

          <button
            type="submit"
            className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:brightness-110 w-full cursor-pointer"
          >
            Submit
          </button>

          {message && <p className=" text-center text-green-600">{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
