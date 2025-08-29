import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Clock, Train, Users, RefreshCw, MapPin, ChevronRight, Filter, Clock3 } from 'lucide-react';
import { lines, stations } from '../data/stations';
import { liveTrains } from '../data/liveTrains';

const LiveTrainStatus: React.FC = () => {
  const { translations } = useLanguage();
  const [selectedLine, setSelectedLine] = useState<string>(lines[0].id);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [showMap, setShowMap] = useState(false);

  const filteredStations = stations.filter(
    station => station.lines.includes(selectedLine)
  ).sort((a, b) => a.order - b.order);

  const refreshTrainStatus = () => {
    setRefreshing(true);
    // Simulating API call to refresh data
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated(new Date());
    }, 1500);
  };

  const getCrowdLevelIcon = (level: string) => {
    switch (level) {
      case 'low':
        return <div className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>{translations.lowCrowd}</div>;
      case 'moderate':
        return <div className="px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium flex items-center"><div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>{translations.moderateCrowd}</div>;
      case 'high':
        return <div className="px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs font-medium flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>{translations.highCrowd}</div>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-time':
        return <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium">{translations.statusOnTime}</span>;
      case 'delayed':
        return <span className="px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium">{translations.statusDelayed}</span>;
      case 'cancelled':
        return <span className="px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs font-medium">{translations.statusCancelled}</span>;
      case 'arriving':
        return <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium">{translations.statusArriving}</span>;
      case 'departed':
        return <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 text-xs font-medium">{translations.statusDeparted}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {translations.liveTrainStatusHeading}
          </h1>
          <p className="text-blue-100 dark:text-blue-200 mb-6">
            {translations.liveTrainStatusSubheading}
          </p>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-grow">
              <label className="block text-sm text-blue-100 mb-2">
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
            
            <button
              onClick={refreshTrainStatus}
              className="flex items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium text-white transition-colors"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              {translations.refreshStatus}
            </button>
            
            <button
              onClick={() => setShowMap(!showMap)}
              className="flex items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium text-white transition-colors"
            >
              <MapPin className="mr-2 h-4 w-4" />
              {showMap ? translations.hideMap : translations.viewMap}
            </button>
          </div>
        </div>
      </section>
      
      {/* Last Updated */}
      <div className="container mx-auto px-4 pt-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Clock3 className="h-4 w-4 mr-1" />
          <span>
            Last updated: {lastUpdated.toLocaleTimeString()} 
          </span>
        </div>
      </div>

      {/* Metro Map Section */}
      {showMap && (
        <section className="container mx-auto px-4 py-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {translations.metroMap}
            </h2>
            <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700 h-[500px] w-full">
              <div className="absolute inset-0 p-4">
                <svg viewBox="0 0 1000 500" className="w-full h-full">
                  {/* Background Grid */}
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Metro Lines */}
                  {lines.map(line => (
                    <path 
                      key={line.id}
                      d={line.path}
                      stroke={line.bgColor}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                  
                  {/* Metro Stations */}
                  {stations.map(station => (
                    <g key={station.id} transform={`translate(${station.x}, ${station.y})`}>
                      <circle 
                        r="6" 
                        fill="white" 
                        stroke="#333"
                        strokeWidth="2"
                      />
                      <text 
                        x="10" 
                        y="5" 
                        fontSize="12" 
                        fill="currentColor" 
                        className="text-gray-800 dark:text-gray-200"
                      >
                        {station.name}
                      </text>
                    </g>
                  ))}
                  
                  {/* Live Trains */}
                  {liveTrains
                    .filter(train => train.lineId === selectedLine)
                    .map(train => (
                    <g key={train.id} transform={`translate(${train.x}, ${train.y})`}>
                      <circle 
                        r="4" 
                        fill={train.status === 'delayed' ? 'yellow' : 'green'} 
                        stroke="white"
                        strokeWidth="1"
                      >
                        <animate 
                          attributeName="r" 
                          values="4;6;4" 
                          dur="2s" 
                          repeatCount="indefinite" 
                        />
                        <animate 
                          attributeName="opacity" 
                          values="0.8;1;0.8" 
                          dur="2s" 
                          repeatCount="indefinite" 
                        />
                      </circle>
                      <text 
                        x="8" 
                        y="4" 
                        fontSize="10" 
                        fill="white" 
                        stroke="rgba(0,0,0,0.5)" 
                        strokeWidth="3" 
                        paintOrder="stroke"
                      >
                        Train {train.id}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
              
              {/* Map Legend */}
              <div className="absolute bottom-4 right-4 bg-white dark:bg-slate-800 rounded-lg shadow-md p-3">
                <div className="text-sm font-medium text-gray-800 dark:text-white mb-2">Legend</div>
                <div className="flex flex-col space-y-2">
                  {lines.map(line => (
                    <div key={line.id} className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: line.bgColor }}
                      ></div>
                      <span className="text-xs text-gray-600 dark:text-gray-300">{line.name}</span>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse mr-2"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">Live Train</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Train Status Table */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Train Status
            </h2>
            <div className="flex items-center">
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <Filter className="h-5 w-5" />
              </button>
              <div className="ml-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <span className="mr-3">On time</span>
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                <span className="mr-3">Delayed</span>
                <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                <span>Cancelled</span>
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
                    {translations.nextTrain}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {translations.platform}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {translations.status}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {translations.crowdLevel}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStations.map((station) => {
                  const train = liveTrains.find(t => 
                    t.nextStationId === station.id && t.lineId === selectedLine
                  );
                  
                  return (
                    <tr key={station.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
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
                        {train ? (
                          <div>
                            <div className="text-sm text-gray-900 dark:text-white flex items-center">
                              <Train className="h-4 w-4 mr-1" />
                              Train {train.id} to {train.destination}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Arrives in {train.minutesToArrival} {translations.minutes}
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            No scheduled trains
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {train ? (
                          <div className="text-sm text-gray-900 dark:text-white">
                            Platform {train.platform}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 dark:text-gray-400">-</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {train ? getStatusBadge(train.status) : 
                          <div className="text-sm text-gray-500 dark:text-gray-400">-</div>
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {train ? getCrowdLevelIcon(train.crowdLevel) : 
                          <div className="text-sm text-gray-500 dark:text-gray-400">-</div>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Peak Hours Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              {translations.peakHours}
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Morning (8:00 - 10:00)</span>
                  <span className="text-xs text-red-600 dark:text-red-400 font-medium">{translations.highCrowd}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Afternoon (12:00 - 14:00)</span>
                  <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">{translations.moderateCrowd}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Evening (17:00 - 19:00)</span>
                  <span className="text-xs text-red-600 dark:text-red-400 font-medium">{translations.highCrowd}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Night (21:00 - 23:00)</span>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">{translations.lowCrowd}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              {translations.bestTravelTimes}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-grow">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Mid-morning (10:00 - 11:30)</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">After morning rush hour</div>
                </div>
                <div className="flex-shrink-0 text-green-600 dark:text-green-400 text-sm font-medium">
                  25% {translations.lowCrowd}
                </div>
              </div>
              <div className="flex items-center p-3 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-grow">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Early afternoon (14:00 - 16:00)</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Between lunch and evening rush</div>
                </div>
                <div className="flex-shrink-0 text-green-600 dark:text-green-400 text-sm font-medium">
                  30% {translations.lowCrowd}
                </div>
              </div>
              <div className="flex items-center p-3 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-grow">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Late evening (19:30 - 21:00)</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">After evening rush hour</div>
                </div>
                <div className="flex-shrink-0 text-green-600 dark:text-green-400 text-sm font-medium">
                  35% {translations.lowCrowd}
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/crowd-management"
                  className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  <span>View detailed crowd management</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveTrainStatus;