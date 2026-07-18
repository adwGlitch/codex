"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-6">
      <div className="p-6 bg-red-500/10 rounded-full border border-red-500/20">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">Something went wrong!</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          We encountered an unexpected error while rendering this page. 
          Please try refreshing or going back to the home page.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300"
      >
        <RefreshCcw className="w-4 h-4" />
        Try again
      </button>
    </div>
  );
}
