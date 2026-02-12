"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-xl font-bold text-red-600 mb-2">
        Something went wrong
      </h2>

      <p className="text-gray-600 mb-4">Service is temporarily unavailable</p>
    </div>
  );
}
