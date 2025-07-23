import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

// Components
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CocktailList from './pages/CocktailList'
import CocktailDetail from './pages/CocktailDetail'
import CreateCocktail from './pages/CreateCocktail'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import NotFound from './pages/NotFound'

// Tabú Mixología SPA
import TabuMixologia from './pages/tabu/TabuMixologia'

// Import SPA styles
import './styles/tabu/globals.css'
import './styles/tabu/components.css'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Tabú Mixología SPA - Standalone route */}
          <Route path="/tabu" element={<TabuMixologia />} />
          
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="cocktails" element={<CocktailList />} />
            <Route path="cocktails/:id" element={<CocktailDetail />} />
            <Route path="about" element={<About />} />
            
            {/* Protected routes */}
            <Route path="create" element={
              <ProtectedRoute>
                <CreateCocktail />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
