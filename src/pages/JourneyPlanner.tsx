import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Clock, Calendar, Users, ArrowRight, Filter, Heart, TrendingDown, AlertTriangle, Check, Train, CreditCard } from 'lucide-react';
import { stations } from '../data/stations';

interface RouteOption {
  id: string;
  departureStation: string;
  arrivalStation: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  transfers: number;
  fare: number;
  crowdLevel: 'low' | 'moderate' | 'high';
  walkingDistance: number;
  lines: string[];
}

const JourneyPlanner: React.FC = () => {
  const { translations } = useLanguage();
  const [searchParams] = useSearchParams();
  
  const [fromStation, setFromStation] = useState(searchParams.get('from') || '');
  const [toStation, setToStation] = useState(searchParams.get('to') || '');
  const [journeyDate, setJourneyDate] = useState(new Date().toISOString().split('T')[0]);
  const [journeyTime, setJourneyTime] = useState('');
  const [showStationDropdown, setShowStationDropdown] = useState<'from' | 'to' | null>(null);
  const [passengerCount, setPassengerCount] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [sortBy, setSortBy] = useState<'duration' | 'fare' | 'crowd'>('duration');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    setJourneyTime(`${hours}:${minutes}`);
    
    if (fromStation && toStation) {
      setShowOptions(true);
    }
  }, [fromStation, toStation]);
  
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
  
  const handleSearch = () => {
    if (fromStation && toStation) {
      setShowOptions(true);
    }
  };
  
  // Mock route options generation
  const generateRouteOptions = (): RouteOption[] => {
    const baseOptions = [
      {
        id: '1',
        departureStation: fromStation,
        arrivalStation: toStation,
        departureTime: '08:30',
        arrivalTime: '09:10',
        duration: 40,
        transfers: 0,
        fare: 25,
        crowdLevel: 'high' as const,
        walkingDistance: 200,
        lines: ['blue']
      },
      {
        id: '2',
        departureStation: fromStation,
        arrivalStation: toStation,
        departureTime: '08:45',
        arrivalTime: '09:35',
        duration: 50,
        transfers: 1,
        fare: 30,
        crowdLevel: 'moderate' as const,
        walkingDistance: 150,
        lines: ['blue', 'green']
      },
      {
        id: '3',
        departureStation: fromStation,
        arrivalStation: toStation,
        departureTime: '09:15',
        arrivalTime: '10:05',
        duration: 50,
        transfers: 0,
        fare: 25,
        crowdLevel: 'low' as const,
        walkingDistance: 200,
        lines: ['blue']
      },
      {
        id: '4',
        departureStation: fromStation,
        arrivalStation: toStation,
        departureTime: '09:30',
        arrivalTime: '10:15',
        duration: 45,
        transfers: 1,
        fare: 35,
        crowdLevel: 'low' as const,
        walkingDistance: 100,
        lines: ['yellow', 'green']
      }
    ];
    
    // Sort options based on selected criteria
    if (sortBy === 'duration') {
      return baseOptions.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === 'fare') {
      return baseOptions.sort((a, b) => a.fare - b.fare);
    } else if (sortBy === 'crowd') {
      const crowdOrder = { low: 0, moderate: 1, high: 2 };
      return baseOptions.sort((a, b) => crowdOrder[a.crowdLevel] - crowdOrder[b.crowdLevel]);
    }
    
    return baseOptions;
  };
  
  const routeOptions = generateRouteOptions();
  
  const getCrowdLevelBadge = (level: 'low' | 'moderate' | 'high') => {
    switch (level) {
      case 'low':
        return <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>{translations.lowCrowd}</span>;
      case 'moderate':
        return <span className="px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium flex items-center"><div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>{translations.moderateCrowd}</span>;
      case 'high':
        return <span className="px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs font-medium flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>{translations.highCrowd}</span>;
      default:
        return null;
    }
  };
  
  const getLineColor = (line: string) => {
    switch (line) {
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="min-h-screen pb-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-900 dark:to-purple-950 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {translations.journeyPlannerHeading}
          </h1>
          <p className="text-purple-100 dark:text-purple-200 mb-6">
            {translations.journeyPlannerSubheading}
          </p>
        </div>
      </section>
      
      {/* Journey Planner Form */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                        className="px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900/30 cursor-pointer"
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
                    className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                        className="px-4 py-2 hover:bg-purple-50 dark:hover:bg-purple-900/30 cursor-pointer"
                        onClick={() => handleStationSelect(station.name)}
                      >
                        {station.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date & Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      type="date"
                      value={journeyDate}
                      onChange={(e) => setJourneyDate(e.target.value)}
                      className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="relative">
                    <input
                      type="time"
                      value={journeyTime}
                      onChange={(e) => setJourneyTime(e.target.value)}
                      className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Passengers
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                    className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSortBy('duration')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center ${
                    sortBy === 'duration'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-500'
                      : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {translations.fastestRoute}
                </button>
                <button
                  onClick={() => setSortBy('fare')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center ${
                    sortBy === 'fare'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-500'
                      : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Cheapest
                </button>
                <button
                  onClick={() => setSortBy('crowd')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center ${
                    sortBy === 'crowd'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-500'
                      : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <Users className="h-3 w-3 mr-1" />
                  Least Crowded
                </button>
              </div>
              
              <button
                onClick={handleSearch}
                className={`w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  (!fromStation || !toStation) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!fromStation || !toStation}
              >
                <Search className="mr-2 h-5 w-5" />
                {translations.searchRoutes}
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Route Options */}
      {showOptions && (
        <section className="container mx-auto px-4 py-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {translations.routeOptions}
          </h2>
          
          <div className="space-y-6">
            {routeOptions.map((route) => (
              <div 
                key={route.id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700/50 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex space-x-1 mr-3">
                      {route.lines.map((line, index) => (
                        <div 
                          key={index} 
                          className={`w-4 h-4 rounded-full ${getLineColor(line)}`}
                          title={`${line.charAt(0).toUpperCase() + line.slice(1)} Line`}
                        ></div>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {route.id === '1' ? translations.fastestRoute : 
                       route.id === '3' ? 'Recommended' :
                       route.id === '2' ? translations.optimalRoute :
                       translations.leastTransfers}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {route.id === '3' && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Best Option
                      </span>
                    )}
                    <button className="p-1 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="flex-shrink-0 mr-6">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {route.departureTime}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {route.departureStation}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <div className="w-20 sm:w-32 md:w-40 h-0.5 bg-purple-500"></div>
                        
                        <div className="flex flex-col items-center mx-2">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                            {route.duration} min
                          </div>
                          {route.transfers > 0 && (
                            <div className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs">
                              {route.transfers} {route.transfers === 1 ? 'transfer' : 'transfers'}
                            </div>
                          )}
                        </div>
                        
                        <div className="w-20 sm:w-32 md:w-40 h-0.5 bg-purple-500"></div>
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      </div>
                      
                      <div className="flex-shrink-0 ml-6">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {route.arrivalTime}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {route.arrivalStation}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {translations.rs}{route.fare * passengerCount}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {passengerCount > 1 ? `${translations.rs}${route.fare} × ${passengerCount}` : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{translations.estimatedTime}: {route.duration} min</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{translations.walkingDistance}: {route.walkingDistance}m</span>
                      </div>
                      <div className="flex items-center">
                        {getCrowdLevelBadge(route.crowdLevel)}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 text-sm font-medium rounded-md text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50">
                        {translations.saveRoute}
                      </button>
                      <button className="px-4 py-2 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                        {translations.startJourney}
                      </button>
                    </div>
                  </div>
                  
                  {route.crowdLevel === 'high' && (
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-md flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-yellow-800 dark:text-yellow-300 font-medium">
                          High crowd expected
                        </p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-400">
                          Consider traveling at 09:15 for a less crowded experience.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Fare Calculator */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700/50">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {translations.estimatedFare}
            </h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                  Fare Details
                </h3>
                
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-md p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Base Fare</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{translations.rs}20</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Distance (5 km)</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{translations.rs}5</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Peak Hour Surcharge</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{translations.rs}0</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Total Fare</span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{translations.rs}25</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Train className="h-4 w-4 text-purple-500 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Metro Card: 10% discount</span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-purple-500 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">UPI Payment: 5% cashback</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                  Fare Zones & Passes
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-900 rounded-md p-4">
                    <h4 className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-2">
                      Day Pass
                    </h4>
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {translations.rs}100
                    </div>
                    <p className="text-xs text-purple-700 dark:text-purple-400 mb-3">
                      Unlimited travel for 24 hours
                    </p>
                    <button className="w-full px-3 py-1 text-xs font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                      Buy Pass
                    </button>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-md p-4">
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                      Tourist Pass
                    </h4>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {translations.rs}250
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mb-3">
                      3-day unlimited travel + city attractions
                    </p>
                    <button className="w-full px-3 py-1 text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Buy Pass
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Fare Zones
                  </h4>
                  <div className="flex space-x-2 mb-2">
                    <div className="w-8 h-4 bg-green-500 rounded-sm"></div>
                    <div className="w-8 h-4 bg-yellow-500 rounded-sm"></div>
                    <div className="w-8 h-4 bg-red-500 rounded-sm"></div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Fares are calculated based on zones traveled. Your journey crosses 1 zone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Saved Routes & Recommendations */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700/50">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Routes
              </h2>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-purple-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Patna Junction → Gandhi Maidan
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      2 days ago
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <Train className="h-3 w-3 mr-1 text-blue-500" />
                    <span>Blue Line • 15 min • {translations.rs}20</span>
                  </div>
                </div>
                
                <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-purple-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Danapur → Patliputra
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      1 week ago
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <Train className="h-3 w-3 mr-1 text-green-500" />
                    <span>Green Line • 25 min • {translations.rs}25</span>
                  </div>
                </div>
                
                <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-purple-500 mr-1" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Rajendra Nagar → Patna Junction
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      2 weeks ago
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                    <Train className="h-3 w-3 mr-1 text-yellow-500" />
                    <span>Yellow Line • 20 min • {translations.rs}25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700/50">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Smart Recommendations
              </h2>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-900">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Best Time to Travel
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        Travel between 10:00-11:30 or 14:00-16:00 for 40% less crowd on your route.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-900">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Station Insight
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        Use the south entrance at Gandhi Maidan station for faster access and less crowding.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md border border-purple-200 dark:border-purple-900">
                  <div className="flex items-start">
                    <Train className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Money-Saving Tip
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        A Day Pass (₹100) would be economical if you plan to make 4+ trips today.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-md border border-orange-200 dark:border-orange-900">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Service Update
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        Partial maintenance on Blue Line this weekend. Plan for additional 10-15 minutes in your journey.
                      </p>
                    </div>
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

export default JourneyPlanner;