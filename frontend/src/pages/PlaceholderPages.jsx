// Simple placeholder pages
import React from 'react';

export const CocktailList = () => (
  <div className="p-8"><h1 className="text-2xl font-bold">Lista de Cócteles</h1></div>
);

export const CocktailDetail = () => (
  <div className="p-8"><h1 className="text-2xl font-bold">Detalle del Cóctel</h1></div>
);

export const CreateCocktail = () => (
  <div className="p-8"><h1 className="text-2xl font-bold">Crear Cóctel</h1></div>
);

export const Profile = () => (
  <div className="p-8"><h1 className="text-2xl font-bold">Mi Perfil</h1></div>
);

export const Dashboard = () => (
  <div className="p-8"><h1 className="text-2xl font-bold">Dashboard</h1></div>
);

export const About = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Acerca de Nosotros</h1>
    <p>Plataforma de mixología en desarrollo.</p>
  </div>
);

export const NotFound = () => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold">404 - Página no encontrada</h1>
  </div>
);

// Default exports for individual pages
export default CocktailList;
