import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Mixología Web
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Inicio
              </Link>
              <Link to="/tabu" className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                Tabú Mixología
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
