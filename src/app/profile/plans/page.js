"use client";

import { ProfileCard } from '@/components/Card';
import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/users/plans");
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  // Filter plans by location
  const filteredData = data.filter(item =>
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* 🔍 Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 p-2 border border-orange-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <ProfileCard
              key={index}
              description={item.des}
              image={item.image}
              followers={item.location}
              following={item.requiredMembers}
              amount={item.requiredAmount}
              isFollowing={item.user}
              name={item.user.name}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg py-10">
            No results found for "<span className="font-semibold">{searchTerm}</span>"
          </div>
        )}
      </div>
    </div>
  );
}
