import React from 'react';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear Cuenta
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div>
            <input
              type="text"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="Nombre completo"
            />
            <input
              type="email"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="Email"
            />
            <input
              type="password"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Contraseña"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
            >
              Crear Cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
