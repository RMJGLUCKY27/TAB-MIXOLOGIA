import React from 'react';

const NotFound = () => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold">404 - Página no encontrada</h1>
    <p className="mt-4 text-gray-600">La página que buscas no existe.</p>
    <a href="/" className="mt-4 inline-block text-purple-600 hover:text-purple-800">
      Volver al inicio
    </a>
  </div>
);

export default NotFound;
