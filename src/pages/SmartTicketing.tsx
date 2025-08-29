import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { 
  CreditCard, Ticket, Clock, MapPin, Calendar, Users, ChevronRight, 
  QrCode, CreditCard as CardIcon, Wallet, History, Download, ChevronDown, 
  Plus, Check, CheckCircle, AlertTriangle, Search
} from 'lucide-react';
import { stations } from '../data/stations';

const SmartTicketing: React.FC = () => {
  const { translations } = useLanguage();
  const { user } = useUser();
  
  const [activeTab, setActiveTab] = useState<'buy' | 'recharge' | 'history'>('buy');
  const [ticketType, setTicketType] = useState<'single' | 'return' | 'group' | 'tourist'>('single');
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [showStationDropdown, setShowStationDropdown] = useState<'from' | 'to' | null>(null);
  const [journeyDate, setJourneyDate] = useState(new Date().toISOString().split('T')[0]);
  const [journeyTime, setJourneyTime] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [fareAmount, setFareAmount] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'metro-card'>('card');
  const [rechargeAmount, setRechargeAmount] = useState(100);
  const [cardBalance, setCardBalance] = useState(user ? user.points : 150);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    setJourneyTime(`${hours}:${minutes}`);
  }, []);
  
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
  
  useEffect(() => {
    // Calculate fare based on stations, ticket type, and passenger count
    if (fromStation && toStation) {
      let baseFare = 20; // Base fare
      
      // Add distance-based fare (mock calculation)
      const fromIndex = stations.findIndex(s => s.name === fromStation);
      const toIndex = stations.findIndex(s => s.name === toStation);
      if (fromIndex !== -1 && toIndex !== -1) {
        const distance = Math.abs(fromIndex - toIndex);
        baseFare += distance * 5;
      }
      
      // Apply ticket type multiplier
      let fareMultiplier = 1;
      switch (ticketType) {
        case 'return':
          fareMultiplier = 1.8; // 10% discount on return
          break;
        case 'group':
          fareMultiplier = 0.9; // 10% discount for groups
          break;
        case 'tourist':
          fareMultiplier = 2.5; // Tourist day pass
          break;
        default:
          fareMultiplier = 1;
      }
      
      // Calculate total fare
      let totalFare = Math.round(baseFare * fareMultiplier);
      
      // Multiply by passenger count for group tickets
      if (ticketType === 'group') {
        totalFare = totalFare * passengerCount;
      }
      
      setFareAmount(totalFare);
    } else {
      setFareAmount(0);
    }
  }, [fromStation, toStation, ticketType, passengerCount]);
  
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
  
  const handlePayNow = () => {
    setShowPaymentModal(true);
  };
  
  const processPayment = () => {
    // Simulate payment processing
    setPaymentError(null);
    
    // Show loading for a moment
    setTimeout(() => {
      if (paymentMethod === 'metro-card' && cardBalance < fareAmount) {
        setPaymentError('Insufficient balance in your Metro Card. Please recharge or use a different payment method.');
        return;
      }
      
      // Successful payment
      if (paymentMethod === 'metro-card') {
        setCardBalance(prev => prev - fareAmount);
      }
      
      setShowPaymentModal(false);
      setShowPaymentSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowPaymentSuccess(false);
        setFromStation('');
        setToStation('');
        setTicketType('single');
        setPassengerCount(1);
      }, 5000);
    }, 1500);
  };
  
  const handleRecharge = () => {
    // Simulate recharge
    setPaymentError(null);
    
    // Show loading for a moment
    setTimeout(() => {
      // Successful recharge
      setCardBalance(prev => prev + rechargeAmount);
      setShowPaymentModal(false);
      
      // Show success message
      alert(translations.successCardRecharge);
    }, 1500);
  };
  
  const quickPurchaseOptions = [
    {
      from: 'Patna Junction',
      to: 'Gandhi Maidan',
      fare: 25,
    },
    {
      from: 'Danapur',
      to: 'Patliputra',
      fare: 30,
    },
    {
      from: 'Patna Junction',
      to: 'Rajendra Nagar',
      fare: 20,
    }
  ];
  
  const ticketHistory = [
    {
      id: 'TKT12345',
      from: 'Patna Junction',
      to: 'Gandhi Maidan',
      date: '2025-05-15',
      time: '09:30',
      fare: 25,
      status: 'used'
    },
    {
      id: 'TKT12346',
      from: 'Danapur',
      to: 'Patna Junction',
      date: '2025-05-18',
      time: '11:45',
      fare: 30,
      status: 'active'
    },
    {
      id: 'TKT12347',
      from: 'Rajendra Nagar',
      to: 'Patliputra',
      date: '2025-05-20',
      time: '14:15',
      fare: 35,
      status: 'upcoming'
    }
  ];
  
  return (
    <div className="min-h-screen pb-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-900 dark:to-green-950 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {translations.smartTicketingHeading}
          </h1>
          <p className="text-green-100 dark:text-green-200 mb-6">
            {translations.smartTicketingSubheading}
          </p>
          
          {/* Metro Card Summary */}
          {user && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-green-100">Metro Card Balance</div>
                    <div className="text-xl font-bold text-white">{translations.rs} {cardBalance}</div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setActiveTab('recharge');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-white text-green-700 rounded-md font-medium text-sm hover:bg-green-50 transition-colors"
                >
                  {translations.rechargeCard}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('buy')}
              className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'buy'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Ticket className="h-5 w-5 mr-2" />
              {translations.buyNewTicket}
            </button>
            <button
              onClick={() => setActiveTab('recharge')}
              className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'recharge'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              {translations.rechargeCard}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'history'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <History className="h-5 w-5 mr-2" />
              {translations.viewHistory}
            </button>
          </div>
          
          {/* Buy New Ticket Tab */}
          {activeTab === 'buy' && (
            <div className="p-6">
              {showPaymentSuccess ? (
                <div className="max-w-lg mx-auto text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {translations.successTicketPurchase}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your ticket has been sent to your email and is also available in your ticket history.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 mb-6">
                    <div className="flex justify-center mb-4">
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-xl">
                        <QrCode className="h-32 w-32 text-black dark:text-white" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 text-left">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Ticket ID:</span>
                        <span className="font-medium text-gray-900 dark:text-white">PM{Math.floor(Math.random() * 100000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">From:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{fromStation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">To:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{toStation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Date:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{journeyDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Time:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{journeyTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Passengers:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{passengerCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Ticket Type:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{ticketType.charAt(0).toUpperCase() + ticketType.slice(1)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                        <span className="font-medium text-gray-900 dark:text-white">Total:</span>
                        <span className="font-bold text-green-600 dark:text-green-400">{translations.rs} {fareAmount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowPaymentSuccess(false)}
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      Buy Another Ticket
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Journey Details
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                                  className="px-4 py-2 hover:bg-green-50 dark:hover:bg-green-900/30 cursor-pointer"
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
                              className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                                  className="px-4 py-2 hover:bg-green-50 dark:hover:bg-green-900/30 cursor-pointer"
                                  onClick={() => handleStationSelect(station.name)}
                                >
                                  {station.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Date
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              value={journeyDate}
                              onChange={(e) => setJourneyDate(e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Time
                          </label>
                          <div className="relative">
                            <input
                              type="time"
                              value={journeyTime}
                              onChange={(e) => setJourneyTime(e.target.value)}
                              className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Passengers
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={passengerCount}
                              onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                              className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {translations.ticketType}
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <button
                            type="button"
                            onClick={() => setTicketType('single')}
                            className={`px-4 py-3 rounded-md flex flex-col items-center justify-center border ${
                              ticketType === 'single'
                                ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700'
                                : 'bg-white dark:bg-slate-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                            }`}
                          >
                            <span className={`text-sm font-medium ${
                              ticketType === 'single'
                                ? 'text-green-700 dark:text-green-400'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {translations.singleJourney}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              One way ticket
                            </span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setTicketType('return')}
                            className={`px-4 py-3 rounded-md flex flex-col items-center justify-center border ${
                              ticketType === 'return'
                                ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700'
                                : 'bg-white dark:bg-slate-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                            }`}
                          >
                            <span className={`text-sm font-medium ${
                              ticketType === 'return'
                                ? 'text-green-700 dark:text-green-400'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {translations.returnJourney}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Round trip
                            </span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setTicketType('group')}
                            className={`px-4 py-3 rounded-md flex flex-col items-center justify-center border ${
                              ticketType === 'group'
                                ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700'
                                : 'bg-white dark:bg-slate-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                            }`}
                          >
                            <span className={`text-sm font-medium ${
                              ticketType === 'group'
                                ? 'text-green-700 dark:text-green-400'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {translations.groupTicket}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              10% discount
                            </span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setTicketType('tourist')}
                            className={`px-4 py-3 rounded-md flex flex-col items-center justify-center border ${
                              ticketType === 'tourist'
                                ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700'
                                : 'bg-white dark:bg-slate-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                            }`}
                          >
                            <span className={`text-sm font-medium ${
                              ticketType === 'tourist'
                                ? 'text-green-700 dark:text-green-400'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {translations.tourists}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Day pass
                            </span>
                          </button>
                        </div>
                      </div>
                      
                      {fromStation && toStation && (
                        <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {translations.ticketPrice}
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {translations.rs} {fareAmount}
                            </p>
                          </div>
                          <button
                            onClick={handlePayNow}
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm flex items-center"
                          >
                            {translations.payNow}
                            <ChevronRight className="ml-1 h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      {translations.quickPurchase}
                    </h2>
                    
                    <div className="space-y-4">
                      {quickPurchaseOptions.map((option, index) => (
                        <div 
                          key={index}
                          className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
                          onClick={() => {
                            setFromStation(option.from);
                            setToStation(option.to);
                            setTicketType('single');
                            setFareAmount(option.fare);
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                                <Ticket className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white">Single Journey</span>
                            </div>
                            <span className="text-sm font-bold text-green-600 dark:text-green-400">
                              {translations.rs} {option.fare}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <MapPin className="h-4 w-4 mr-1" />
                              {option.from}
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <MapPin className="h-4 w-4 mr-1" />
                              {option.to}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="mt-6">
                        <Link 
                          to="/journey-planner"
                          className="flex items-center text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                        >
                          View all popular routes
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                      
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          Savings Tips
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            Use return tickets for 10% savings
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            Group tickets offer discounts for 3+ people
                          </li>
                          <li className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                            Tourist day passes for unlimited travel
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Recharge Card Tab */}
          {activeTab === 'recharge' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {translations.addMoney}
                  </h2>
                  
                  <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {translations.cardBalance}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {translations.rs} {cardBalance}
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Wallet className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Amount
                      </label>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {[100, 200, 500].map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => setRechargeAmount(amount)}
                            className={`px-4 py-3 rounded-md text-center ${
                              rechargeAmount === amount
                                ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-400'
                                : 'bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-500'
                            }`}
                          >
                            {translations.rs} {amount}
                          </button>
                        ))}
                      </div>
                      
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Or Enter Custom Amount
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                              {translations.rs}
                            </span>
                          </div>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={rechargeAmount}
                            onChange={(e) => setRechargeAmount(parseInt(e.target.value))}
                            className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter amount"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm flex items-center justify-center"
                    >
                      Proceed to Recharge
                      <ChevronRight className="ml-1 h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-900">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Recharge Benefits
                        </h4>
                        <ul className="mt-1 text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          <li>• Recharge ₹500 or more to get 5% bonus</li>
                          <li>• Auto-recharge facility available</li>
                          <li>• Earn Metro Points on every recharge</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Recharge History
                  </h2>
                  
                  <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                      <thead className="bg-gray-50 dark:bg-slate-800">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Method
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-slate-700 divide-y divide-gray-200 dark:divide-gray-600">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            2025-05-20
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {translations.rs} 200
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            UPI
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                              Successful
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            2025-05-10
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {translations.rs} 500
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            Credit Card
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                              Successful
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            2025-04-25
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {translations.rs} 100
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            UPI
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                              Successful
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                      Recharge Options
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-md p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                            <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Auto-Recharge</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Automatically recharge when balance is low</p>
                          </div>
                        </div>
                        <button className="px-3 py-1 text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                          Set Up
                        </button>
                      </div>
                      
                      <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-md p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                            <QrCode className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Metro Card QR</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Scan to view/share your Metro Card</p>
                          </div>
                        </div>
                        <button className="px-3 py-1 text-xs font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                          View QR
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* View History Tab */}
          {activeTab === 'history' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Tickets
                </h2>
                <div className="flex items-center">
                  <div className="relative mr-2">
                    <input
                      type="text"
                      className="w-48 px-4 py-2 pl-9 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Search tickets"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="relative">
                    <select className="appearance-none w-32 px-4 py-2 pr-8 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option>All tickets</option>
                      <option>Active</option>
                      <option>Used</option>
                      <option>Upcoming</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {ticketHistory.map((ticket) => (
                  <div 
                    key={ticket.id}
                    className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="p-4 flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-grow flex flex-col md:flex-row md:items-center">
                        <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                          <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                            <Ticket className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {ticket.id}
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              Single Journey
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center">
                          <div className="mb-2 md:mb-0 md:mr-6">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              From
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {ticket.from}
                            </div>
                          </div>
                          
                          <ChevronRight className="hidden md:block h-4 w-4 text-gray-400 flex-shrink-0 md:mr-6" />
                          
                          <div className="mb-2 md:mb-0 md:mr-6">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              To
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {ticket.to}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Date
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {ticket.date}
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Time
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {ticket.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-4 md:mt-0">
                        <div className="mr-4">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Status
                          </div>
                          <div className="text-sm">
                            {ticket.status === 'active' && (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                Active
                              </span>
                            )}
                            {ticket.status === 'used' && (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                Used
                              </span>
                            )}
                            {ticket.status === 'upcoming' && (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                Upcoming
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                          <QrCode className="h-5 w-5" />
                        </button>
                        <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing 3 of 12 tickets
                </p>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Previous
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Next
                  </button>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                  Ticket Usage Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-slate-700 p-4 rounded-md">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Most Frequent Route
                    </div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                      Patna Junction → Gandhi Maidan
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      12 trips this month
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-700 p-4 rounded-md">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Total Spent
                    </div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                      {translations.rs} 750
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Last 30 days
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-700 p-4 rounded-md">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Metro Points Earned
                    </div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                      75 points
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      View rewards →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {activeTab === 'recharge' ? 'Recharge Metro Card' : 'Payment Details'}
                </h3>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {paymentError && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-md p-3 flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-800 dark:text-red-300">
                    {paymentError}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {activeTab === 'recharge' ? 'Recharge Amount' : 'Total Amount'}
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {translations.rs} {activeTab === 'recharge' ? rechargeAmount : fareAmount}
                    </div>
                  </div>
                  {activeTab !== 'recharge' && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {fromStation} → {toStation} ({ticketType.charAt(0).toUpperCase() + ticketType.slice(1)} Journey)
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Payment Method
                  </label>
                  <div className="space-y-3">
                    <div 
                      className={`flex items-center p-3 border rounded-md cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className={`h-5 w-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        paymentMethod === 'card'
                          ? 'border-green-500'
                          : 'border-gray-400'
                      }`}>
                        {paymentMethod === 'card' && (
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          Credit/Debit Card
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Visa, Mastercard, RuPay
                        </div>
                      </div>
                      <CardIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    
                    <div 
                      className={`flex items-center p-3 border rounded-md cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className={`h-5 w-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        paymentMethod === 'upi'
                          ? 'border-green-500'
                          : 'border-gray-400'
                      }`}>
                        {paymentMethod === 'upi' && (
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          UPI
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Google Pay, PhonePe, Paytm
                        </div>
                      </div>
                      <QrCode className="h-5 w-5 text-gray-400" />
                    </div>
                    
                    {activeTab !== 'recharge' && (
                      <div 
                        className={`flex items-center p-3 border rounded-md cursor-pointer ${
                          paymentMethod === 'metro-card'
                            ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        onClick={() => setPaymentMethod('metro-card')}
                      >
                        <div className={`h-5 w-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          paymentMethod === 'metro-card'
                            ? 'border-green-500'
                            : 'border-gray-400'
                        }`}>
                          {paymentMethod === 'metro-card' && (
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            Metro Card
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Current Balance: {translations.rs} {cardBalance}
                          </div>
                        </div>
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
                
                {(paymentMethod === 'card' || paymentMethod === 'upi') && (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      In a real app, this would show actual payment fields. For demo purposes, just click the button below to simulate payment.
                    </p>
                    {paymentMethod === 'upi' && (
                      <div className="flex justify-center mb-3">
                        <div className="bg-white p-3 rounded-md">
                          <QrCode className="h-24 w-24 text-black" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <button
                onClick={activeTab === 'recharge' ? handleRecharge : processPayment}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {activeTab === 'recharge' 
                  ? `Recharge ${translations.rs} ${rechargeAmount}`
                  : `Pay ${translations.rs} ${fareAmount}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartTicketing;