import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Clock, Calendar, AlertTriangle, TrendingUp, MapPin, Clock3, ArrowRight, Check } from 'lucide-react';
import { lines, stations } from '../data/stations';
import { Link } from 'react-router-dom';

const CrowdManagement: React.FC = () => {
  const { translations } = useLanguage();
  const [selectedLine, setSelectedLine] = useState<string>(lines[0].id);
  const [selectedDay, setSelectedDay] = useState<string>('today');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Auto update current time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);
  
  const getCrowdLevelColor = (level: number) => {
    if (level < 30) return 'bg-green-500';
    if (level < 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getCrowdLevelText = (level: number) => {
    if (level < 30) return translations.lowCrowd;
    if (level < 60) return translations.moderateCrowd;
    return translations.highCrowd;
  };
  
  const getCrowdLevelClass = (level: number) => {
    if (level < 30) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
    if (level < 60) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
    return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
  };
  
  const stationCrowdData = stations
    .filter(station => station.lines.includes(selectedLine))
    .map(station => ({
      ...station,
      crowdLevel: Math.floor(Math.random() * 100), // Simulated data
      trainArrival: 2 + Math.floor(Math.random() * 8)
    }))
    .sort((a, b) => b.crowdLevel - a.crowdLevel);
  
  const filteredStations = stations.filter(
    station => station.lines.includes(selectedLine)
  ).sort((a, b) => a.order - b.order);
  
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    level: (
      // Morning peak
      (i >= 8 && i <= 10) ? 70 + Math.floor(Math.random() * 30) :
      // Evening peak
      (i >= 17 && i <= 19) ? 80 + Math.floor(Math.random() * 20) :
      // Medium crowded periods
      (i >= 12 && i <= 14) || (i >= 15 && i <= 16) ? 40 + Math.floor(Math.random() * 20) :
      // Low crowded periods
      10 + Math.floor(Math.random() * 20)
    )
  }));
  
  const currentHour = currentTime.getHours();
  const bestTravelTimes = hourlyData
    .filter(item => item.hour > currentHour) // Only future hours
    .sort((a, b) => a.level - b.level) // Sort by crowd level
    .slice(0, 3); // Get top 3 least crowded times
  
  const weekdayData = [
    { day: 'Monday', level: 65 },
    { day: 'Tuesday', level: 60 },
    { day: 'Wednesday', level: 62 },
    { day: 'Thursday', level: 63 },
    { day: 'Friday', level: 70 },
    { day: 'Saturday', level: 45 },
    { day: 'Sunday', level: 30 },
  ];
  
  return (
    <div className="min-h-screen pb-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 dark:from-orange-900 dark:to-orange-950 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {translations.crowdManagementHeading}
          </h1>
          <p className="text-orange-100 dark:text-orange-200 mb-6">
            {translations.crowdManagementSubheading}
          </p>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-grow">
              <label className="block text-sm text-orange-100 mb-2">
                {translations.selectLine}
              </label>
              <div className="flex flex-wrap gap-2">
                {lines.map(line => (
                  <button
                    key={line.id}
                    onClick={() => setSelectedLine(line.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedLine === line.id
                        ? `bg-${line.color}-500 text-white`
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                    style={selectedLine === line.id ? { backgroundColor: line.bgColor } : {}}
                  >
                    {line.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <label className="block text-sm text-orange-100 mb-2">
                View Data For
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDay('today')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedDay === 'today'
                      ? 'bg-white text-orange-600'
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  {translations.today}
                </button>
                <button
                  onClick={() => setSelectedDay('tomorrow')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedDay === 'tomorrow'
                      ? 'bg-white text-orange-600'
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  {translations.tomorrow}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Current Time Display */}
      <div className="container mx-auto px-4 pt-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Clock3 className="h-4 w-4 mr-1" />
          <span>
            Current time: {currentTime.toLocaleTimeString()} | 
            {selectedDay === 'today' ? ` ${translations.today}` : ` ${translations.tomorrow}`}
          </span>
        </div>
      </div>
      
      {/* Current Station Crowd Levels */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {translations.stationCrowdLevels}
            </h2>
            <div className="flex items-center">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <span className="mr-3">{translations.lowCrowd}</span>
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                <span className="mr-3">{translations.moderateCrowd}</span>
                <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                <span>{translations.highCrowd}</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-slate-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {translations.stationName}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {translations.crowdLevel}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {translations.nextTrain}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Recommendation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                {stationCrowdData.map((station) => (
                  <tr key={station.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full">
                          <span className="text-sm font-medium">{station.order}</span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {station.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {station.area}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-3 overflow-hidden">
                          <div 
                            className={`h-full ${getCrowdLevelColor(station.crowdLevel)} rounded-full`} 
                            style={{ width: `${station.crowdLevel}%` }}
                          ></div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCrowdLevelClass(station.crowdLevel)}`}>
                          {station.crowdLevel}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      Arrives in {station.trainArrival} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {station.crowdLevel > 70 ? (
                        <div className="text-red-600 dark:text-red-400 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Consider alternative station
                        </div>
                      ) : station.crowdLevel > 40 ? (
                        <div className="text-yellow-600 dark:text-yellow-400 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Wait for next train if possible
                        </div>
                      ) : (
                        <div className="text-green-600 dark:text-green-400 flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Good time to travel
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Crowd Heatmap */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Hourly Crowd Levels
          </h2>
          
          <div className="relative h-64 mb-6">
            {/* Hourly bars */}
            <div className="flex h-48 items-end space-x-2">
              {hourlyData.map((item) => (
                <div 
                  key={item.hour} 
                  className="flex-1 relative group"
                >
                  <div 
                    className={`rounded-t w-full ${getCrowdLevelColor(item.level)}`}
                    style={{ height: `${item.level}%` }}
                  ></div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {`${item.hour}:00 - ${getCrowdLevelText(item.level)} (${item.level}%)`}
                  </div>
                  
                  {/* Current time indicator */}
                  {item.hour === currentHour && (
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-orange-600 dark:text-orange-400">
                      Now
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* X-axis labels */}
            <div className="flex h-8 items-center space-x-2 mt-2">
              {hourlyData.map((item) => (
                <div 
                  key={item.hour} 
                  className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400"
                >
                  {item.hour % 3 === 0 ? `${item.hour}:00` : ''}
                </div>
              ))}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
              <div>100%</div>
              <div>75%</div>
              <div>50%</div>
              <div>25%</div>
              <div>0%</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">&lt; 30% - {translations.lowCrowd}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">30-60% - {translations.moderateCrowd}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">&gt; 60% - {translations.highCrowd}</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Best Travel Times and Weekday Pattern */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-orange-600 dark:text-orange-400" />
              {translations.bestTravelTimes}
            </h3>
            <div className="space-y-3">
              {bestTravelTimes.map((time, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-3 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <div className="flex-grow">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {time.hour}:00 - {time.hour + 1}:00
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {time.hour < 12 ? 'Morning' : time.hour < 17 ? 'Afternoon' : 'Evening'}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-green-600 dark:text-green-400 text-sm font-medium">
                    {time.level}% {translations.lowCrowd}
                  </div>
                </div>
              ))}
              
              <div className="mt-4 p-4 border border-orange-200 dark:border-orange-900 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-orange-600 dark:text-orange-400" />
                  Avoid Peak Hours
                </h4>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                    Morning: 8:00 - 10:00
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                    Evening: 17:00 - 19:00
                  </li>
                </ul>
              </div>
              
              <div className="mt-4">
                <Link 
                  to="/journey-planner"
                  className="flex items-center text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300"
                >
                  <span>Plan your journey with best times</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-orange-600 dark:text-orange-400" />
              Weekly Crowd Pattern
            </h3>
            
            <div className="space-y-4">
              {weekdayData.map((day) => (
                <div key={day.day}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{day.day}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCrowdLevelClass(day.level)}`}>
                      {getCrowdLevelText(day.level)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getCrowdLevelColor(day.level)} rounded-full`} 
                      style={{ width: `${day.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
                  Weekly Insights
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-1 text-green-500 mt-0.5" />
                    Weekends have 35-45% less crowd compared to weekdays
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-1 text-green-500 mt-0.5" />
                    Friday evenings have the highest crowd levels of the week
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-1 text-green-500 mt-0.5" />
                    Tuesday and Wednesday are relatively better weekdays to travel
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Coach-level Crowd Management */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {translations.trainCrowdLevels}
          </h2>
          
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Train Visualization */}
              <div className="flex space-x-1">
                {Array.from({ length: 8 }, (_, i) => {
                  const crowdLevel = i === 0 || i === 7 ? 30 + Math.floor(Math.random() * 20) :
                                     i === 1 || i === 6 ? 50 + Math.floor(Math.random() * 20) :
                                     70 + Math.floor(Math.random() * 20);
                  return (
                    <div 
                      key={i} 
                      className={`w-20 h-32 rounded-lg border-2 ${
                        crowdLevel < 30 ? 'border-green-500 bg-green-100 dark:bg-green-900/30' :
                        crowdLevel < 60 ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/30' :
                        'border-red-500 bg-red-100 dark:bg-red-900/30'
                      } flex flex-col items-center justify-center relative`}
                    >
                      <span className="text-sm font-bold">{i + 1}</span>
                      <div className="mt-2">
                        <Users className={`h-5 w-5 ${
                          crowdLevel < 30 ? 'text-green-600 dark:text-green-400' :
                          crowdLevel < 60 ? 'text-yellow-600 dark:text-yellow-400' :
                          'text-red-600 dark:text-red-400'
                        }`} />
                      </div>
                      <span className={`text-xs font-medium mt-1 ${
                        crowdLevel < 30 ? 'text-green-600 dark:text-green-400' :
                        crowdLevel < 60 ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {crowdLevel}%
                      </span>
                      
                      {/* Recommendations */}
                      {(i === 0 || i === 7) && (
                        <div className="absolute -top-10 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded-full border border-green-500 whitespace-nowrap">
                          Recommended
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Train Directionality */}
              <div className="flex justify-between mt-2 px-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  ← Danapur
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Patna Junction →
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-blue-200 dark:border-blue-900 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                {translations.leastCrowdedCoaches}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                    1
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        First Coach
                      </div>
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        30% Full
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Located near the station entrance at Danapur
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                    8
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Last Coach
                      </div>
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        35% Full
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Located near the station exit at Patna Junction
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                Coach Selection Tips
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  First and last coaches are typically 30-40% less crowded than middle coaches
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Ladies coach (typically coach #2) has reserved sections for women travelers
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Coaches near station exits tend to be more crowded, especially during peak hours
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Plan your platform position based on the coach you want to board
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Predictions Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-orange-600 dark:text-orange-400" />
            {translations.crowdPredictions}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-blue-200 dark:border-blue-900 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                Weather Impact
              </h4>
              <div className="flex items-center mb-3">
                <div className="flex-shrink-0">
                  <svg className="h-10 w-10 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Clear, 32°C
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Current Weather
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Expected 15% increase in metro usage due to high temperatures. Air-conditioned coaches will be more crowded than usual.
              </p>
            </div>
            
            <div className="p-4 border border-purple-200 dark:border-purple-900 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                Events Impact
              </h4>
              <div className="space-y-2 mb-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Calendar className="h-3 w-3" />
                  </div>
                  <div className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    Gandhi Maidan Cultural Festival
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Expected 25% increase in crowd at Gandhi Maidan station between 16:00-20:00. Consider alternative routes if possible.
              </p>
            </div>
            
            <div className="p-4 border border-green-200 dark:border-green-900 rounded-lg bg-green-50 dark:bg-green-900/20">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                Smart Recommendations
              </h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Travel before 16:00 to avoid festival crowd at Gandhi Maidan
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Consider Patliputra station instead of Patna Junction during peak hours
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                  Board coaches 1 or 8 for a more comfortable journey today
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CrowdManagement;