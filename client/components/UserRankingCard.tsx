// components/UserRankingCard.tsx
"use client"; // This directive makes sure this component is rendered on the client side

import React from "react";

interface User {
  profilePicture: string;
  rank: string;
  username: string;
  totalTradingVolume: string;
  averageWinRate: string;
  averageROI: string;
  PNL: string;
  TotalPNL: string;
}

interface UserRankingCardProps {
  user: User;
}

const UserRankingCard: React.FC<UserRankingCardProps> = ({ user }) => {
  return (
    <div className="bg-[#1e1e1e] p-4 border-2 rounded-md shadow-lg border-transparent">
      <div className="flex items-center mb-4">
        <img
          alt="Profile"
          src={user.profilePicture}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            {/* Assuming RankIcon is another component that accepts `rank` as a prop */}
            <span className="text-2xl font-semibold text-white ml-2">
              {user.username}
            </span>
          </div>
          <div className="mt-1 text-sm text-gray-400">
            <p>
              <span className="font-semibold">Rank:</span> {user.rank}
            </p>
          </div>
        </div>
      </div>
      <div className="text-sm">
        <p className="mb-2">
          <span className="text-xs font-semibold">Total Trading Volume:</span>
          <span className="text-lg font-bold">{user.totalTradingVolume}</span>
        </p>
        <p className="mb-2">
          <span className="text-xs font-semibold">Win Rate:</span>
          <span className="text-lg font-bold">{user.averageWinRate}</span>
        </p>
        <p className="mb-2">
          <span className="text-xs font-semibold">ROI:</span>
          <span className="text-lg font-bold">{user.averageROI}</span>
        </p>
        <div className="mt-2">
          <p className="mb-2">
            <span className="text-xs font-semibold text-green-500">PNL:</span>
            <span className="text-lg font-bold text-green-500">{user.PNL}</span>
          </p>
          <p>
            <span className="text-xs font-semibold text-green-500">
              Total PNL:
            </span>
            <span className="text-lg font-bold text-green-500">
              {user.TotalPNL}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRankingCard;
