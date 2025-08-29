import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { User, Settings, CreditCard, History, Award, Star, Edit, Trash2, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const { translations } = useLanguage();
  const { user, logout } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-900 dark:to-purple-950 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {translations.profileHeading}
          </h1>
          <p className="text-purple-100 dark:text-purple-200">
            Manage your account, view travel history, and track rewards
          </p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                  <User className="h-12 w-12" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {user.email}
                </p>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm font-medium rounded-md text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50">
                    <Edit className="h-4 w-4 inline-block mr-1" />
                    Edit Profile
                  </button>
                  <button 
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium rounded-md text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50"
                  >
                    <LogOut className="h-4 w-4 inline-block mr-1" />
                    Logout
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Account Settings
                </h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md">
                    <Settings className="h-5 w-5 mr-3 text-gray-400" />
                    Account Settings
                  </button>
                  <button className="w-full flex items-center px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md">
                    <CreditCard className="h-5 w-5 mr-3 text-gray-400" />
                    Payment Methods
                  </button>
                  <button className="w-full flex items-center px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md">
                    <History className="h-5 w-5 mr-3 text-gray-400" />
                    Travel History
                  </button>
                  <button className="w-full flex items-center px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md">
                    <Trash2 className="h-5 w-5 mr-3" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            {/* Metro Points Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Metro Points
                </h3>
                <div className="flex items-center text-2xl font-bold text-purple-600 dark:text-purple-400">
                  <Star className="h-6 w-6 mr-2" />
                  {user.points} pts
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-900">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    This Month
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    150 pts
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                    +23% from last month
                  </div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-900">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total Trips
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    47
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                    Regular Traveler
                  </div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-900">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Rewards Available
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    3
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    View Rewards →
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Recent Activity
                </h3>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Card Recharged
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Added ₹500 to Metro Card
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-900 dark:text-white">
                        ₹500
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        2 hours ago
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Badge Earned
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Early Bird - 10 morning rides completed
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-900 dark:text-white">
                        +50 pts
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Yesterday
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <History className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Journey Completed
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Patna Junction → Gandhi Maidan
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-900 dark:text-white">
                        ₹20
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        2 days ago
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges and Achievements */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Badges & Achievements
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
                  <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-2">
                    <Star className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white text-center">
                    Early Bird
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    10 morning rides
                  </div>
                </div>

                <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white text-center">
                    Regular Rider
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    25 rides completed
                  </div>
                </div>

                <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-2">
                    <Star className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white text-center">
                    Eco Warrior
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    50 green trips
                  </div>
                </div>

                <div className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-900">
                  <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2">
                    <Star className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white text-center">
                    Explorer
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    All stations visited
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;