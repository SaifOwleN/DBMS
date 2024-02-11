"use client";
import services from "@/services";
import { useEffect, useMemo, useState } from "react";
import { Chart } from "react-charts";

const Dashboard = () => {
  const [stat, setStat] = useState();
  const data = [
    {
      label: "React Charts",
      data: [
        {
          date: new Date(2020, 10, 10),
          stars: 2021,
        },
        {
          date: new Date(2021, 10, 10),
          stars: 20213,
        },
        {
          date: new Date(2022, 10, 10),
          stars: 202123,
        },
      ],
    },
    {
      label: "React Query",
      data: [
        {
          date: new Date(2020, 10, 10),
          stars: 102342,
        },
        {
          date: new Date(2021, 10, 10),
          stars: 1023423,
        },
        {
          date: new Date(2022, 10, 10),
          stars: 10234230,
        },
      ],
    },
  ];

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.date,
    }),
    [],
  );

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.stars,
      },
    ],
    [],
  );

  useEffect(function fetchStats() {
    (async () => {
      setStat(await services.getStats());
    })();
  }, []);

  return (
    <div className="flex justify-between">
      <div className="p-10 flex flex-col gap-5">
        <h1 className="font-bold text-3xl ml-2 font-poppins mb-3">Dashboard</h1>
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
              <div className="stat-title text-gray-100">In Progress Trips</div>
              <div className="stat-value">{stat}</div>
              <div className="stat-desc text-gray-400">
                21% more than last month
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-gray-100">Finished Trips</div>
              <div className="stat-value">{stat}</div>
              <div className="stat-desc text-gray-400">
                21% more than last month
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-[#191919] rounded-lg">
          <h1 className="text-white mb-4">Trips</h1>
          <div className="w-full h-80">
            <Chart options={{ data, primaryAxis, secondaryAxes, dark: true }} />
          </div>
        </div>
      </div>

      <div className="p-10 flex flex-col gap-5 mt-[4.2rem]">
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
              <div className="stat-title text-gray-100">In Progress Trips</div>
              <div className="stat-value">{stat}</div>
              <div className="stat-desc text-gray-400">
                21% more than last month
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-gray-100">Finished Trips</div>
              <div className="stat-value">{stat}</div>
              <div className="stat-desc text-gray-400">
                21% more than last month
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-[#191919] rounded-lg">
          <h1 className="text-white mb-4">Employees</h1>
          <div className="w-full h-80">
            <Chart options={{ data, primaryAxis, secondaryAxes, dark: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
