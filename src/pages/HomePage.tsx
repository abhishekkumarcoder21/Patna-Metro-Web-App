import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Train, Ticket, CreditCard, AlertTriangle, Info, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { stations } from '../data/stations';

const HomePage: React.FC = () => {
  const { translations } = useLanguage();
  const { theme } = useTheme();
  
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [showStationDropdown, setShowStationDropdown] = useState<'from' | 'to' | null>(null);
  
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowStationDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleStationSelect = (station: string) => {
    if (showStationDropdown === 'from') {
      setFromStation(station);
    } else if (showStationDropdown === 'to') {
      setToStation(station);
    }
    setShowStationDropdown(null);
  };
  
  const filteredStations = () => {
    const searchTerm = showStationDropdown === 'from' ? fromStation : toStation;
    return stations.filter(station => 
      station.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  };
  
  const quickAccessCards = [
    {
      title: translations.liveTrainStatus,
      icon: <Train className="h-6 w-6 text-blue-500" />,
      description: translations.viewLiveStatus,
      path: '/live-train-status',
      color: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      title: translations.smartTicketing,
      icon: <Ticket className="h-6 w-6 text-green-500" />,
      description: translations.buyTicket,
      path: '/smart-ticketing',
      color: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      title: translations.journeyPlanner,
      icon: <MapPin className="h-6 w-6 text-purple-500" />,
      description: translations.planJourney,
      path: '/journey-planner',
      color: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      title: translations.crowdManagement,
      icon: <CreditCard className="h-6 w-6 text-orange-500" />,
      description: translations.crowdLevel,
      path: '/crowd-management',
      color: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    }
  ];
  
  const newsUpdates = [
    {
      title: "Patna Metro Yellow Line Extension",
      date: "June 5, 2025",
      description: "The Yellow Line will be extended to Danapur, adding 3 new stations to the network."
    },
    {
      title: "Metro Service Hours Extended",
      date: "May 28, 2025",
      description: "Weekend service hours extended until midnight, effective from next month."
    },
    {
      title: "New Smart Card Features",
      date: "May 15, 2025",
      description: "Updated Metro Cards now support UPI-based auto-recharge and family accounts."
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Metro Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {translations.welcomeHeading}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 dark:text-blue-200">
              {translations.welcomeSubheading}
            </p>
          </div>
          
          {/* Journey Planner Form */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-[1.01]">
            <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/30 px-6 py-4">
              <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                {translations.planJourney}
              </h2>
              <div className="flex space-x-2">
                <Link 
                  to="/live-train-status"
                  className="text-sm text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
                >
                  {translations.viewLiveStatus}
                </Link>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <Link 
                  to="/smart-ticketing"
                  className="text-sm text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
                >
                  {translations.buyTicket}
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translations.fromStation}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fromStation}
                      onChange={(e) => setFromStation(e.target.value)}
                      onFocus={() => setShowStationDropdown('from')}
                      ref={fromInputRef}
                      className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={translations.fromStation}
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {showStationDropdown === 'from' && (
                    <div 
                      ref={dropdownRef}
                      className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-700 shadow-lg rounded-md py-1 text-gray-800 dark:text-white"
                    >
                      {filteredStations().map((station) => (
                        <div
                          key={station.id}
                          className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer"
                          onClick={() => handleStationSelect(station.name)}
                        >
                          {station.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translations.toStation}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={toStation}
                      onChange={(e) => setToStation(e.target.value)}
                      onFocus={() => setShowStationDropdown('to')}
                      ref={toInputRef}
                      className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={translations.toStation}
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {showStationDropdown === 'to' && (
                    <div 
                      ref={dropdownRef}
                      className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-700 shadow-lg rounded-md py-1 text-gray-800 dark:text-white"
                    >
                      {filteredStations().map((station) => (
                        <div
                          key={station.id}
                          className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer"
                          onClick={() => handleStationSelect(station.name)}
                        >
                          {station.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {translations.departureTime}
                  </label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="md:col-span-3">
                  <Link
                    to={`/journey-planner?from=${fromStation}&to=${toStation}&time=${departureTime}`}
                    className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      (!fromStation || !toStation) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={(e) => {
                      if (!fromStation || !toStation) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Search className="mr-2 h-5 w-5" />
                    {translations.searchRoutes}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
            <path 
              fill={theme === 'dark' ? '#0f172a' : '#f8fafc'} 
              fillOpacity="1" 
              d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,53.3C1120,43,1280,21,1360,10.7L1440,0L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Quick Access Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {translations.quickAccess}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccessCards.map((card, index) => (
              <Link 
                key={index} 
                to={card.path}
                className={`block p-6 rounded-xl border ${card.borderColor} ${card.color} shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm mr-3">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {card.description}
                </p>
                <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                  <span>{translations.exploreMetro}</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Metro Features Section */}
      <section className="py-16 bg-blue-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {translations.metroFeatures}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 transform transition-all hover:scale-[1.02]">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Train className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Real-time Train Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track train locations, arrivals, and departures in real-time with our advanced tracking system.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 transform transition-all hover:scale-[1.02]">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Smart Card System
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enjoy hassle-free travel with our digital smart cards, contactless payments, and easy recharges.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 transform transition-all hover:scale-[1.02]">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Crowd Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Make informed travel decisions with real-time crowd levels and predictive analytics.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Updates Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {translations.latestUpdates}
            </h2>
            <Link 
              to="/updates"
              className="text-blue-600 dark:text-blue-400 flex items-center hover:text-blue-800 dark:hover:text-blue-300"
            >
              <span className="mr-1">View all</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsUpdates.map((update, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden transform transition-all hover:shadow-md"
              >
                <div className="h-3 bg-blue-600"></div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    {update.date}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {update.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {update.description}
                  </p>
                  <Link 
                    to="#"
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* App Download Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {translations.downloadApp}
              </h2>
              <p className="text-blue-100 dark:text-blue-200 mb-6 text-lg">
                Get the Patna Metro app for a seamless travel experience. Plan journeys, buy tickets, and get real-time updates on the go.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#"
                  className="flex items-center bg-black hover:bg-gray-900 text-white rounded-xl px-5 py-3"
                >
                  <div className="mr-3">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                      <path d="M17.5,2 C17.2,2 16.9,2.1 16.7,2.3 L11.3,7.6 L12.7,9 L18.1,3.7 C18.5,3.3 18.5,2.7 18.1,2.3 C17.9,2.1 17.8,2 17.5,2 Z M8.3,7.6 L2.3,13.6 C2.1,13.8 2,14.1 2,14.4 C2,14.7 2.1,15 2.3,15.2 L4.8,17.7 C5,17.9 5.3,18 5.6,18 C5.9,18 6.2,17.9 6.4,17.7 L12.4,11.7 L8.3,7.6 Z M21.8,11.7 L19.3,9.2 C19.1,9 18.8,8.9 18.5,8.9 C18.2,8.9 17.9,9 17.7,9.2 L15.2,11.7 L19.3,15.8 L21.8,13.3 C22,13.1 22.1,12.8 22.1,12.5 C22.1,12.2 22,11.9 21.8,11.7 Z M12.4,15.8 L6.4,21.8 C6.2,22 5.9,22.1 5.6,22.1 C5.3,22.1 5,22 4.8,21.8 L2.3,19.3 C2.1,19.1 2,18.8 2,18.5 C2,18.2 2.1,17.9 2.3,17.7 L8.3,11.7 L12.4,15.8 Z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
                <a 
                  href="#"
                  className="flex items-center bg-black hover:bg-gray-900 text-white rounded-xl px-5 py-3"
                >
                  <div className="mr-3">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                      <path d="M22,17.5 C21.9,17.8 21.7,18.1 21.5,18.3 C21.2,18.7 20.9,19 20.6,19.2 C20.1,19.7 19.6,20 19,20 C18.6,20 18.1,19.9 17.6,19.6 C17.1,19.3 16.6,19.2 16.1,19.2 C15.5,19.2 15,19.3 14.5,19.6 C14,19.9 13.6,20 13.1,20 C12.5,20 12,19.7 11.5,19.2 C11.2,19 10.9,18.7 10.6,18.3 C10.1,17.6 9.8,16.9 9.6,16.1 C9.4,15.3 9.2,14.5 9.2,13.7 C9.2,12.8 9.4,12 9.7,11.4 C9.9,10.9 10.2,10.5 10.6,10.1 C11,9.7 11.4,9.5 11.9,9.5 C12.3,9.5 12.8,9.6 13.4,9.9 C14,10.1 14.4,10.3 14.6,10.3 C14.8,10.3 15.2,10.2 15.9,9.9 C16.5,9.6 17.1,9.5 17.6,9.5 C18,9.5 18.4,9.6 18.8,9.8 C19.2,10 19.5,10.3 19.7,10.6 C19.1,11 18.7,11.5 18.5,12.1 C18.3,12.7 18.3,13.4 18.5,14.1 C18.7,14.8 19,15.3 19.5,15.8 C19.8,16.1 20.1,16.3 20.4,16.5 C20.6,16.6 20.8,16.8 21,17.1 C21.1,17.3 21.2,17.4 21.2,17.5 L22,17.5 Z M16.9,3.1 C17.5,3.8 17.9,4.6 18,5.6 C18,5.7 18,5.8 18,5.9 C18,5.9 18,6 18,6.1 C17.3,6.1 16.7,5.9 16,5.4 C15.3,4.9 14.9,4.2 14.7,3.4 C14.7,3.3 14.7,3.2 14.7,3.1 C14.7,3 14.7,3 14.7,2.9 C14.9,2.9 15,2.9 15.2,2.9 C15.5,2.9 15.9,3 16.3,3.1 C16.5,3.1 16.7,3.1 16.9,3.1 Z M13.7,0 C13.7,0.1 13.7,0.1 13.7,0.2 C13.7,0.3 13.7,0.4 13.7,0.5 C13.7,1.2 13.5,1.9 13.2,2.7 C12.8,3.5 12.3,4.1 11.7,4.4 C11.2,4.7 10.7,4.9 10.2,4.9 C10.2,4.8 10.2,4.7 10.2,4.5 C10.2,4.3 10.2,4.2 10.2,4 C10.2,3.3 10.4,2.6 10.8,1.9 C11.2,1.2 11.7,0.6 12.4,0.3 C12.8,0.1 13.2,0 13.5,0 L13.7,0 Z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="md:w-2/5">
              <img 
                src="https://images.pexels.com/photos/6913135/pexels-photo-6913135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Patna Metro App" 
                className="rounded-xl shadow-2xl border-8 border-white dark:border-slate-800"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;