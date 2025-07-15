// app/plans/page.js
"use client";

import { useEffect, useState } from "react";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/plans");  
        const data = await res.json();

        if (res.ok) {
          setPlans(data);
        } else {
          setError(data.error || "Failed to fetch plans.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen bg-white text-orange-700 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-orange-600">
          Our Plans
        </h1>

        {loading && <p className="text-center">Loading plans...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-orange-50 border border-orange-300 rounded-xl shadow-md hover:shadow-lg transition p-6"
            >
              <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-sm text-orange-800 mb-4">
                {plan.description || "No description available."}
              </p>
              {/* You can add more plan details here */}
              <span className="text-orange-500 font-bold">
                {plan.price ? `₹${plan.price}` : "Contact for price"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
