import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Mail, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import PatnaMetroLogo from '../components/PatnaMetroLogo';

const Login: React.FC = () => {
  const { translations } = useLanguage();
  const { login, loading } = useUser();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(translations.errorInvalidCredentials);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <PatnaMetroLogo />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            {translations.login}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {translations.dontHaveAccount}{' '}
            <Link 
              to="/signup" 
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              {translations.signupNow}
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-md p-4 flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-800 dark:text-red-300">
              {error}
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {translations.email}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {translations.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <Link 
                to="/forgot-password" 
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              >
                {translations.forgotPassword}
              </Link>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                </span>
              ) : null}
              {loading ? 'Signing in...' : translations.login}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400">
                Demo Accounts
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-3">
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Regular User:</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Email: user@example.com</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Password: password</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin User:</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Email: admin@example.com</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Password: password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;