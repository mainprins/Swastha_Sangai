import React from 'react';

export default function HomePage({ userEmail }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Welcome, {userEmail}!</h1>
      <p className="mt-4">This is your homepage.</p>
    </div>
  );
}
