import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 – Page Not Found | DocAppoint';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <div className="text-[10rem] font-heading text-gray-100 dark:text-slate-800 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">🩺</div>
          </div>
        </div>
        <h1 className="font-heading text-3xl text-gray-900 dark:text-white mb-3">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/" className="btn-primary">Go Home</Link>
          <Link to="/appointments" className="btn-outline">Browse Doctors</Link>
        </div>
      </div>
    </div>
  );
}
