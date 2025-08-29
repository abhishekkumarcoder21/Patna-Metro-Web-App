import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { 
  LayoutDashboard, Users, MapPin, Train, BarChart2, Settings, 
  Bell, Filter, Download, ChevronDown, Search, Calendar, TrendingUp,
  Clock, AlertCircle, UserPlus, Edit, Trash2, X, Check, Save, RefreshCw
} from 'lucide-react';

// Mock data for the admin dashboard
const mockUsers = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', tickets: 35, joined: '2025-01-15', status: 'active' },
  { id: '2', name: 'Priya Patel', email: 'priya@example.com', tickets: 28, joined: '2025-02-10', status: 'active' },
  { id: '3', name: 'Amit Kumar', email: 'amit@example.com', tickets: 15, joined: '2025-03-05', status: 'inactive' },
  { id: '4', name: 'Meera Singh', email: 'meera@example.com', tickets: 42, joined: '2025-01-25', status: 'active' },
  { id: '5', name: 'Vikram Joshi', email: 'vikram@example.com', tickets: 10, joined: '2025-04-12', status: 'active' },
];

const mockStations = [
  { id: '1', name: 'Patna Junction', footfall: 15000, status: 'operational', maintenanceDate: null },
  { id: '2', name: 'Gandhi Maidan', footfall: 12500, status: 'operational', maintenanceDate: null },
  { id: '3', name: 'Danapur', footfall: 8000, status: 'maintenance', maintenanceDate: '2025-06-10' },
  { id: '4', name: 'Patliputra', footfall: 9500, status: 'operational', maintenanceDate: null },
  { id: '5', name: 'Rajendra Nagar', footfall: 7500, status: 'operational', maintenanceDate: null },
];

const mockAlerts = [
  { id: '1', type: 'delay', message: 'Trains on Blue Line delayed by 10 mins due to technical issue', time: '09:30', date: '2025-05-22' },
  { id: '2', type: 'maintenance', message: 'Danapur station escalator maintenance scheduled', time: '14:00', date: '2025-06-10' },
  { id: '3', type: 'crowd', message: 'High crowd expected at Gandhi Maidan station due to event', time: '17:00', date: '2025-05-25' },
];

const AdminPanel: React.FC = () => {
  const { translations } = useLanguage();
  const { user } = useUser();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'stations' | 'trains' | 'analytics' | 'settings'>('dashboard');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('week');
  const [showNewAlertForm, setShowNewAlertForm] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditStationForm, setShowEditStationForm] = useState<string | null>(null);
  
  // Function to get color based on value
  const getPercentageColor = (value: number) => {
    if (value < 40) return 'text-green-500';
    if (value < 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Analytics data
  const dailyRidership = [
    { day: 'Monday', value: 35000 },
    { day: 'Tuesday', value: 32000 },
    { day: 'Wednesday', value: 30000 },
    { day: 'Thursday', value: 34000 },
    { day: 'Friday', value: 38000 },
    { day: 'Saturday', value: 25000 },
    { day: 'Sunday', value: 20000 },
  ];
  
  const hourlyRidership = [
    { hour: '06:00', value: 2000 },
    { hour: '08:00', value: 7500 },
    { hour: '10:00', value: 3500 },
    { hour: '12:00', value: 4000 },
    { hour: '14:00', value: 3800 },
    { hour: '16:00', value: 4200 },
    { hour: '18:00', value: 8000 },
    { hour: '20:00', value: 3500 },
    { hour: '22:00', value: 1800 },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-slate-800 shadow-md hidden md:block">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {translations.adminPanel}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.name || 'Admin User'}
            </p>
          </div>
          
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center px-4 py-2 rounded-md ${
                activeTab === 'dashboard'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              <span>{translations.adminDashboard}</span>
            </button>
            
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center px-4 py-2 rounded-md ${
                activeTab === 'users'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              <span>{translations.userManagement}</span>
            </button>
            
            <button
              onClick={() => setActiveTab('stations')}
              className={`w-full flex items-center px-4 py-2 rounded-md ${
                activeTab === 'stations'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <MapPin className="h-5 w-5 mr-3" />
              <span>{translations.stationManagement}</span>
            </button>
            
            <button
              onClick={() => setActiveTab('trains')}
              className={`w-full flex items-center px-4 py-2 rounded-md ${
                activeTab === 'trains'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Train className="h-5 w-5 mr-3" />
              <span>{translations.trainManagement}</span>
            </button>
            
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center px-4 py-2 rounded-md ${
                activeTab === 'analytics'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <BarChart2 className="h-5 w-5 mr-3" />
              <span>{translations.reportAnalytics}</span>
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center px-4 py-2 rounded-md ${
                activeTab === 'settings'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>{translations.systemSettings}</span>
            </button>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white dark:bg-slate-800 shadow-sm">
            <div className="flex items-center justify-between p-4">
              <button
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
              >
                <LayoutDashboard className="h-6 w-6" />
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </button>
                </div>
                
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
              </div>
            </div>
          </header>
          
          {/* Content Area */}
          <main className="flex-1 overflow-auto p-4">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {translations.adminDashboard}
                  </h1>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setDateRange('today')}
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        dateRange === 'today'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Today
                    </button>
                    <button
                      onClick={() => setDateRange('week')}
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        dateRange === 'week'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      This Week
                    </button>
                    <button
                      onClick={() => setDateRange('month')}
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        dateRange === 'month'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      This Month
                    </button>
                  </div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Total Ridership
                      </h3>
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Users className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      214,582
                    </div>
                    <div className="mt-1 flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">+12.5%</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">from last {dateRange}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Ticket Revenue
                      </h3>
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <CreditCard className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      ₹4.28M
                    </div>
                    <div className="mt-1 flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">+8.2%</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">from last {dateRange}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Active Users
                      </h3>
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <User className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      18,432
                    </div>
                    <div className="mt-1 flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">+5.8%</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">from last {dateRange}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        System Status
                      </h3>
                      <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      1 Alert Active
                    </div>
                    <div className="mt-1 flex items-center text-sm">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Charts and Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Ridership Trends
                      </h3>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        View Full Report
                      </button>
                    </div>
                    
                    {/* Chart placeholder */}
                    <div className="h-64 bg-gray-50 dark:bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
                      <div className="flex h-48 w-full items-end space-x-2 px-4">
                        {dailyRidership.map((item, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div 
                              className="w-full bg-blue-500 dark:bg-blue-600 rounded-t"
                              style={{ height: `${(item.value / 40000) * 100}%` }}
                            ></div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              {item.day.substring(0, 3)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div>Average: 30,714 passengers</div>
                      <div>Peak: Monday (35,000)</div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        System Alerts
                      </h3>
                      <button 
                        onClick={() => setShowNewAlertForm(!showNewAlertForm)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        + New Alert
                      </button>
                    </div>
                    
                    {showNewAlertForm && (
                      <div className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Alert Type
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                              <option value="delay">Delay</option>
                              <option value="maintenance">Maintenance</option>
                              <option value="crowd">Crowd</option>
                              <option value="emergency">Emergency</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Message
                            </label>
                            <textarea 
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                              rows={3}
                              placeholder="Alert message"
                            ></textarea>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => setShowNewAlertForm(false)}
                              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                              Send Alert
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      {mockAlerts.map((alert) => (
                        <div 
                          key={alert.id}
                          className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                                alert.type === 'delay' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                                alert.type === 'maintenance' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                              }`}>
                                {alert.type === 'delay' ? <Clock className="h-4 w-4" /> :
                                 alert.type === 'maintenance' ? <Settings className="h-4 w-4" /> :
                                 <Users className="h-4 w-4" />}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {alert.message}
                                </div>
                                <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {alert.date} • {alert.time}
                                </div>
                              </div>
                            </div>
                            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Station Performance */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Station Performance
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                        <Filter className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-slate-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Station
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Daily Footfall
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Peak Hour Occupancy
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {mockStations.map((station) => (
                          <tr key={station.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {station.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-white">
                                {station.footfall.toLocaleString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-32">
                                <div 
                                  className={`absolute h-full rounded-full ${
                                    station.footfall > 12000 ? 'bg-red-500' :
                                    station.footfall > 8000 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${(station.footfall / 15000) * 100}%` }}
                                ></div>
                              </div>
                              <div className="mt-1 text-xs">
                                <span className={getPercentageColor((station.footfall / 15000) * 100)}>
                                  {Math.round((station.footfall / 15000) * 100)}%
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                station.status === 'operational'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                              }`}>
                                {station.status.charAt(0).toUpperCase() + station.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {translations.userManagement}
                  </h1>
                  
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-64 pl-9 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search users..."
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    <button
                      onClick={() => setShowAddUserForm(!showAddUserForm)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Add User
                    </button>
                  </div>
                </div>
                
                {showAddUserForm && (
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Add New User
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          placeholder="Email address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          placeholder="Password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Role
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                          <option value="user">Regular User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => setShowAddUserForm(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Add User
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-slate-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Tickets Purchased
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Join Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
                                {user.name.charAt(0)}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {user.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {user.tickets}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.joined}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                              user.status === 'active'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                            }`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing 5 of 25 users
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      3
                    </button>
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Station Management Tab */}
            {activeTab === 'stations' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {translations.stationManagement}
                  </h1>
                  
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-64 pl-9 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search stations..."
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      <MapPin className="h-4 w-4 mr-1" />
                      Add Station
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {mockStations.map((station) => (
                    <div 
                      key={station.id}
                      className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6"
                    >
                      {showEditStationForm === station.id ? (
                        <div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Station Name
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                              defaultValue={station.name}
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Status
                            </label>
                            <select 
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                              defaultValue={station.status}
                            >
                              <option value="operational">Operational</option>
                              <option value="maintenance">Maintenance</option>
                              <option value="closed">Closed</option>
                            </select>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button 
                              onClick={() => setShowEditStationForm(null)}
                              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={() => setShowEditStationForm(null)}
                              className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                {station.name}
                              </h3>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                station.status === 'operational'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                              }`}>
                                {station.status.charAt(0).toUpperCase() + station.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => setShowEditStationForm(station.id)}
                                className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500 dark:text-gray-400">Daily Footfall</span>
                              <span className="font-medium text-gray-900 dark:text-white">{station.footfall.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500 dark:text-gray-400">Peak Hour Load</span>
                              <span className={getPercentageColor((station.footfall / 15000) * 100)}>
                                {Math.round((station.footfall / 15000) * 100)}%
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500 dark:text-gray-400">Maintenance Schedule</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {station.maintenanceDate || 'None scheduled'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30">
                              <Settings className="h-4 w-4 mr-1" />
                              Manage Facilities
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Metro Map
                  </h3>
                  
                  {/* Metro Map Placeholder */}
                  <div className="h-96 bg-gray-50 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
                      <MapPin className="h-8 w-8 mb-2" />
                      Interactive Metro Map would appear here
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Train Management Tab */}
            {activeTab === 'trains' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {translations.trainManagement}
                  </h1>
                  
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh Status
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      <Train className="h-4 w-4 mr-1" />
                      Add Train
                    </button>
                  </div>
                </div>
                
                {/* Train Status Dashboard */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Live Train Status
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-900">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Operational Trains
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            28
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                          <Check className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-900">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Delayed Trains
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            3
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                          <Clock className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Maintenance
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            2
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Settings className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Metro Line Status */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                        <h4 className="text-md font-medium text-gray-900 dark:text-white">
                          Blue Line
                        </h4>
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                          Operational
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <div className="flex-grow h-1 bg-blue-500"></div>
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <div className="flex-grow h-1 bg-blue-500"></div>
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <div className="flex-grow h-1 bg-blue-500"></div>
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <div className="flex-grow h-1 bg-blue-500"></div>
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <div>Patna Junction</div>
                        <div>Gandhi Maidan</div>
                        <div>Danapur</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                        <h4 className="text-md font-medium text-gray-900 dark:text-white">
                          Green Line
                        </h4>
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                          Minor Delays
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <div className="flex-grow h-1 bg-green-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <div className="flex-grow h-1 bg-green-500"></div>
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="flex-grow h-1 bg-green-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <div className="flex-grow h-1 bg-green-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <div>Patliputra</div>
                        <div>Rajendra Nagar</div>
                        <div>Danapur</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Train Schedule Table */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Train Schedule
                    </h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-slate-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Train ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Line
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Current Station
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Next Station
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            ETA
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="hover:bg-gray-50 dark:hover:bg-slate-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              TRN-1001
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
                              <div className="text-sm text-gray-900 dark:text-white">
                                Blue Line
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              Patna Junction
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              Gandhi Maidan
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              3 min
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                              On Time
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-2">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                              View
                            </button>
                          </td>
                        </tr>
                        
                        <tr className="hover:bg-gray-50 dark:hover:bg-slate-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              TRN-1002
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                              <div className="text-sm text-gray-900 dark:text-white">
                                Green Line
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              Patliputra
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              Rajendra Nagar
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              7 min
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                              Delayed (5 min)
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-2">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                              View
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {translations.reportAnalytics}
                  </h1>
                  
                  <div className="flex space-x-2">
                    <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </button>
                    <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </button>
                  </div>
                </div>
                
                {/* Ridership by Day */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Ridership by Day
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setDateRange('week')}
                        className={`px-3 py-1 text-sm font-medium rounded-md ${
                          dateRange === 'week'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Week
                      </button>
                      <button
                        onClick={() => setDateRange('month')}
                        className={`px-3 py-1 text-sm font-medium rounded-md ${
                          dateRange === 'month'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        Month
                      </button>
                    </div>
                  </div>
                  
                  {/* Chart placeholder */}
                  <div className="h-64 bg-gray-50 dark:bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
                    <div className="flex h-48 w-full items-end space-x-2 px-4">
                      {dailyRidership.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-blue-500 dark:bg-blue-600 rounded-t"
                            style={{ height: `${(item.value / 40000) * 100}%` }}
                          ></div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {item.day.substring(0, 3)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Hourly Distribution */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                    Hourly Ridership Distribution
                  </h3>
                  
                  {/* Chart placeholder */}
                  <div className="h-64 bg-gray-50 dark:bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
                    <div className="flex h-48 w-full items-end space-x-2 px-4">
                      {hourlyRidership.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center group relative">
                          <div 
                            className={`w-full rounded-t ${
                              item.value > 6000 ? 'bg-red-500 dark:bg-red-600' :
                              item.value > 4000 ? 'bg-yellow-500 dark:bg-yellow-600' :
                              'bg-green-500 dark:bg-green-600'
                            }`}
                            style={{ height: `${(item.value / 8000) * 100}%` }}
                          ></div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {item.hour}
                          </div>
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {item.hour}: {item.value.toLocaleString()} passengers
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Low Traffic (&lt;4000)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Moderate (4000-6000)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Peak (&gt;6000)</span>
                    </div>
                  </div>
                </div>
                
                {/* Station Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Top Stations by Footfall
                    </h3>
                    
                    <div className="space-y-4">
                      {mockStations
                        .sort((a, b) => b.footfall - a.footfall)
                        .slice(0, 5)
                        .map((station, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-8 text-sm font-medium text-gray-500 dark:text-gray-400">
                              #{index + 1}
                            </div>
                            <div className="flex-grow">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {station.name}
                              </div>
                            </div>
                            <div className="w-24 text-right text-sm font-medium text-gray-900 dark:text-white">
                              {station.footfall.toLocaleString()}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Revenue by Ticket Type
                    </h3>
                    
                    {/* Pie chart placeholder */}
                    <div className="h-64 bg-gray-50 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        Pie chart would be displayed here
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Single Journey (45%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Return (30%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Group (15%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Tourist (10%)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Download Reports */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Generated Reports
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                          <BarChart2 className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            Monthly Ridership Report
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Generated on May 22, 2025
                          </div>
                        </div>
                      </div>
                      <button className="flex items-center px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            Revenue Analysis Report
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Generated on May 20, 2025
                          </div>
                        </div>
                      </div>
                      <button className="flex items-center px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            User Activity Report
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Generated on May 15, 2025
                          </div>
                        </div>
                      </div>
                      <button className="flex items-center px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-700 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-1" />
                      Generate New Report
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {translations.systemSettings}
                  </h1>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      System Preferences
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Configure general system settings and defaults
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Maintenance Mode
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Puts the system in maintenance mode, allowing only admins to access
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                          <input
                            type="checkbox"
                            id="toggle-1"
                            className="absolute w-6 h-6 transition duration-200 ease-in-out translate-x-0 bg-white border-2 border-gray-300 rounded-full appearance-none cursor-pointer peer checked:translate-x-6 checked:border-blue-600 dark:checked:border-blue-500 dark:border-gray-600 dark:bg-slate-700"
                          />
                          <label
                            htmlFor="toggle-1"
                            className="block w-full h-full bg-gray-200 rounded-full cursor-pointer peer-checked:bg-blue-500 dark:bg-gray-700"
                          ></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Auto-refresh Dashboard
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Automatically refresh dashboard data every 5 minutes
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                          <input
                            type="checkbox"
                            id="toggle-2"
                            className="absolute w-6 h-6 transition duration-200 ease-in-out translate-x-6 bg-white border-2 border-blue-600 rounded-full appearance-none cursor-pointer peer dark:border-blue-500 dark:bg-slate-700 checked:translate-x-6 checked:border-blue-600"
                            defaultChecked
                          />
                          <label
                            htmlFor="toggle-2"
                            className="block w-full h-full bg-blue-500 rounded-full cursor-pointer dark:bg-blue-700"
                          ></label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Email Notifications
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Send email notifications for system alerts and updates
                          </p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                          <input
                            type="checkbox"
                            id="toggle-3"
                            className="absolute w-6 h-6 transition duration-200 ease-in-out translate-x-6 bg-white border-2 border-blue-600 rounded-full appearance-none cursor-pointer peer dark:border-blue-500 dark:bg-slate-700 checked:translate-x-6 checked:border-blue-600"
                            defaultChecked
                          />
                          <label
                            htmlFor="toggle-3"
                            className="block w-full h-full bg-blue-500 rounded-full cursor-pointer dark:bg-blue-700"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        API Configuration
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage API keys and access tokens
                      </p>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            API Key
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white"
                              value="pk_live_123456789abcdefghijklmnopqrst"
                              readOnly
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                              Regenerate
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Webhook URL
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            placeholder="https://your-webhook-url.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        Backup & Restore
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage system backups and restore points
                      </p>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        <button className="flex items-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600">
                          <Download className="h-4 w-4 mr-2" />
                          Create System Backup
                        </button>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Recent Backups
                          </h4>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                              <div className="text-sm">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  Daily Backup
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  May 22, 2025 • 02:00 AM
                                </div>
                              </div>
                              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                                Restore
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                              <div className="text-sm">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  Weekly Backup
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  May 20, 2025 • 01:00 AM
                                </div>
                              </div>
                              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                                Restore
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                    System Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Server Status
                      </h4>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">System Version</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">v2.5.3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Last Updated</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">May 15, 2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Server Status</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">Operational</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Database Status</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">Connected</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Storage
                      </h4>
                      
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500 dark:text-gray-400">Database Storage</span>
                            <span className="font-medium text-gray-900 dark:text-white">75% (750 MB / 1 GB)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500 dark:text-gray-400">Media Storage</span>
                            <span className="font-medium text-gray-900 dark:text-white">40% (2 GB / 5 GB)</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between">
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                        Check for Updates
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Save Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;