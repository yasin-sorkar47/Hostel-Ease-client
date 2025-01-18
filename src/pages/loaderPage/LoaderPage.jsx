export default function LoaderPage() {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 text-white">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="loader-reel w-16 h-16 border-4 border-t-blue-500 border-gray-400 rounded-full animate-spin"></div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-400">
          Loading Your data...
        </h1>
        <p className="mt-2 text-gray-700 dark:text-gray-400">
          get some rest while we set the data!
        </p>
      </div>
    </div>
  );
}
