"use client";
import services from "@/services";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stat, setStat] = useState();

  useEffect(function fetchStats() {
    (async () => {
      setStat(await services.getStats());
    })();
  }, []);

  return (
    <div className="p-10">
      <h1 className="font-bold text-3xl ml-2 font-poppins mb-8">Dashboard</h1>
      <div className="flex gap-4">
        <div className="stats  bg-secondary text-secondary-content shadow">
          <div className="stat">
            <div className="stat-title text-gray-300">Total Page Views</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc text-gray-300">
              21% more than last month
            </div>
          </div>
        </div>
        <div className="stats bg-primary text-primary-content shadow">
          <div className="stat">
            <div className="stat-title text-gray-300">Total Page Views</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc text-gray-300">
              21% more than last month
            </div>
          </div>
        </div>
        <div className="stats bg-neutral text-neutral-content shadow">
          <div className="stat">
            <div className="stat-title text-gray-300">In Progress Trips</div>
            <div className="stat-value">{stat}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-300">Finished Trips</div>
            <div className="stat-value">{stat}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
