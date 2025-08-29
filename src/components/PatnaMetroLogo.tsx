import React from 'react';
import { Train } from 'lucide-react';

const PatnaMetroLogo: React.FC = () => {
  return (
    <div className="relative h-10 w-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-blue-600 dark:bg-blue-500 rounded-full opacity-20"></div>
      <div className="absolute inset-1 bg-blue-500 dark:bg-blue-400 rounded-full opacity-40"></div>
      <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full shadow-inner"></div>
      <Train className="relative text-white h-5 w-5" />
    </div>
  );
};

export default PatnaMetroLogo;