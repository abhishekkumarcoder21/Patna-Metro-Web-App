// import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LiveTrainStatus from './pages/LiveTrainStatus';
import SmartTicketing from './pages/SmartTicketing';
import CrowdManagement from './pages/CrowdManagement';
import JourneyPlanner from './pages/JourneyPlanner';
import LostFound from './pages/LostFound';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Helpline from './pages/Helpline';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/live-train-status" element={<LiveTrainStatus />} />
                  <Route path="/smart-ticketing" element={<SmartTicketing />} />
                  <Route path="/crowd-management" element={<CrowdManagement />} />
                  <Route path="/journey-planner" element={<JourneyPlanner />} />
                  <Route path="/lost-found" element={<LostFound />} />
                  <Route path="/helpline" element={<Helpline />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <ProtectedRoute adminOnly>
                      <AdminPanel />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;