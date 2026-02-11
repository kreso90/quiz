import React from "react";

export const Loader = () => {
  return (
    <div className="fixed z-50 top-0 left-0 w-full bg-white flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-14 w-14 border-3 border-t-transparent border-blue-500"></div>
    </div>
  );
};
