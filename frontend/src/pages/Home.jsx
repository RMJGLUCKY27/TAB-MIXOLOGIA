import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          Mixología Web
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Bienvenido a nuestra plataforma de mixología donde encontrarás 
          las mejores recetas de cócteles y experiencias únicas.
        </p>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🥂 Tabú Mixología
            </h2>
            <p className="text-gray-600 mb-6">
              Experimenta nuestra exclusiva SPA de mixología con diseño sofisticado 
              y experiencias sensoriales únicas.
            </p>
            <Link 
              to="/tabu"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg 
                         font-semibold hover:bg-gray-800 transition-colors duration-300
                         transform hover:scale-105 shadow-lg"
            >
              Entrar a Tabú Mixología →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📚 Biblioteca de Cócteles
              </h3>
              <p className="text-gray-600 text-sm">
                Explora nuestra colección completa de recetas clásicas y modernas.
              </p>
              <Link 
                to="/cocktails" 
                className="inline-block mt-4 text-purple-600 hover:text-purple-800 font-medium"
              >
                Ver Cócteles
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                👤 Mi Perfil
              </h3>
              <p className="text-gray-600 text-sm">
                Guarda tus recetas favoritas y crea tu colección personal.
              </p>
              <Link 
                to="/profile" 
                className="inline-block mt-4 text-purple-600 hover:text-purple-800 font-medium"
              >
                Mi Cuenta
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ℹ️ Acerca de
              </h3>
              <p className="text-gray-600 text-sm">
                Conoce más sobre nuestra misión y el arte de la mixología.
              </p>
              <Link 
                to="/about" 
                className="inline-block mt-4 text-purple-600 hover:text-purple-800 font-medium"
              >
                Saber Más
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Desarrollado con ❤️ para los amantes de la mixología</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
