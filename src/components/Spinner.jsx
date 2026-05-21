export default function Spinner({ full = false }) {
  if (full) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-16">
      <div className="spinner" />
    </div>
  );
}
