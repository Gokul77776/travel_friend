'use client';

import Sidebar from "@/components/Sidebar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export default function Page() {
  const params = useParams();
  const userId = params.id;

  const [user, setUser] = useState(null);  
  const [posts, setPosts] = useState([]);  

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`http://localhost:3000/api/users/${userId}/profile`, {
        cache: "no-store",
      });
      const data = await res.json();
      setUser(data.user);  
    };

    const getPosts = async () => {
      const res = await fetch(`http://localhost:3000/api/users/${userId}/post`, {
        cache: "no-store",
      });
      const data = await res.json();
      setPosts(data.posts);
    };

    if (userId) {
      getUser();
      getPosts();
    }
  }, [userId]);

  const handleDelete = async (postId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/${userId}/post/${postId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        alert("Post deleted successfully!");
        // Remove the deleted post from UI
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
      } else {
        alert(data.message || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[250px]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-gradient-to-r from-orange-600 via-orange-400 to-orange-400 w-full min-h-28 p-2 text-white">
          {user && (
            <div className="flex justify-between">
              <img
                src={user.profileImage}
                alt={`${user.user.name}'s profile`}
                className="w-56 h-60 rounded object-cover"
              />
              <div className="mt-6 text-white p-4 w-full max-w-md space-y-3">
                <p className="text-lg">
                  <span className="font-bold">👤 Username:</span> {user.user.name}
                </p>
                <p className="text-lg">
                  <span className="font-bold">🧾 Bio:</span> {user.bio}
                </p>
                <p className="text-lg">
                  <span className="font-bold">📧 Email:</span> {user.user.email}
                </p>
                <p className="text-lg">
                  <span className="font-bold">📍 Location:</span> {user.location}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">📸 User's Posts</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post._id} className="bg-white rounded-lg shadow-md p-4 relative">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-56 object-cover rounded mb-3"
                  />
                  <p className="text-gray-800 font-medium mb-2">{post.description}</p>
                  <p className="text-sm text-gray-600">📍 {post.location}</p>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="absolute bottom-2 right-2 text-red-500 hover:text-red-700"
                    title="Delete Post"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
