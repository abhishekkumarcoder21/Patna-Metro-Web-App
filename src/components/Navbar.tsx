import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Train, Moon, Sun, Globe, Bell, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import PatnaMetroLogo from './PatnaMetroLogo';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, translations } = useLanguage();
  const { user, logout } = useUser();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: translations.liveTrainStatus, path: '/live-train-status' },
    { name: translations.smartTicketing, path: '/smart-ticketing' },
    { name: translations.crowdManagement, path: '/crowd-management' },
    { name: translations.journeyPlanner, path: '/journey-planner' },
    { name: translations.lostFound, path: '/lost-found' },
    { name: translations.helpline, path: '/helpline' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/95 dark:bg-slate-900/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 z-10" onClick={closeMenu}>
            <PatnaMetroLogo />
            <span className="font-bold text-xl text-blue-700 dark:text-blue-400">
              {translations.patnaMetro}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={translations.changeLanguage}
            >
              <Globe size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={theme === 'dark' ? translations.lightMode : translations.darkMode}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {user ? (
              <div className="relative group">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <User size={20} />
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {translations.profile}
                  </Link>
                  {user.isAdmin && (
                    <Link 
                      to="/admin" 
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {translations.adminPanel}
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {translations.logout}
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {translations.login}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-slate-900 pt-16">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-4 rounded-md text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                <div className="flex space-x-4">
                  <button
                    onClick={toggleLanguage}
                    className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label={translations.changeLanguage}
                  >
                    <Globe size={20} />
                    <span className="ml-2">{language === 'en' ? 'हिंदी' : 'English'}</span>
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label={theme === 'dark' ? translations.lightMode : translations.darkMode}
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    <span className="ml-2">
                      {theme === 'dark' ? translations.lightMode : translations.darkMode}
                    </span>
                  </button>
                </div>
                
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      onClick={closeMenu}
                    >
                      {translations.profile}
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-md hover:bg-green-700"
                        onClick={closeMenu}
                      >
                        {translations.adminPanel}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="px-4 py-2 text-sm font-medium text-center text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    >
                      {translations.logout}
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      onClick={closeMenu}
                    >
                      {translations.login}
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 text-sm font-medium text-center text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50"
                      onClick={closeMenu}
                    >
                      {translations.signup}
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;