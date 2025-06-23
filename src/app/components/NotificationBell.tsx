"use client";

import React from 'react';

interface NotificationBellProps {
  notifications: number;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notifications }) => {
  return (
    <div className="relative inline-block">
      {/* Icono de campana */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
            6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 
            8 7.388 8 8.75v5.408c0 .538-.214 1.055-.595 
            1.437L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>

      {/* Círculo amarillo con número */}
      {notifications > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-black bg-yellow-400 rounded-full transform translate-x-1/2 -translate-y-1/2">
          {notifications}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
