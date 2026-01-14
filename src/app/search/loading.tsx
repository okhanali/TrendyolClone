import React, { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white border rounded-lg p-4 h-80 flex flex-col gap-3">
            <div className="bg-gray-200 h-48 w-full rounded animate-pulse"></div>
            <div className="bg-gray-200 h-4 w-3/4 rounded animate-pulse"></div>
            <div className="bg-gray-200 h-4 w-1/2 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
