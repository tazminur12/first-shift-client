import React from 'react';

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-red-100 via-red-200 to-red-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-red-600 mb-6 select-none">403</h1>
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Access Denied</h2>
        <p className="text-gray-600 mb-8">
          Sorry, you don’t have permission to view this page.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
        >
          Go Back Home
        </a>
      </div>
      <footer className="mt-10 text-sm text-gray-400 select-none">
        © {new Date().getFullYear()} YourCompanyName. All rights reserved.
      </footer>
    </div>
  );
};

export default ForbiddenPage;
