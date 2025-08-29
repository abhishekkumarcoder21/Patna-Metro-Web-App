import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, MapPin, Calendar, Phone, Mail, Camera, Upload, AlertTriangle, Clock, CheckCircle, User, ChevronDown, X, Filter } from 'lucide-react';
import { stations } from '../data/stations';

interface LostItem {
  id: string;
  name: string;
  category: string;
  station: string;
  date: string;
  status: 'pending' | 'found' | 'claimed';
  description: string;
  contact: string;
  image?: string;
}

const LostFound: React.FC = () => {
  const { translations } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'report' | 'find'>('report');
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [lostStation, setLostStation] = useState('');
  const [lostDate, setLostDate] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the report to a backend
    setShowConfirmation(true);
  };
  
  const resetForm = () => {
    setItemName('');
    setItemCategory('');
    setLostStation('');
    setLostDate('');
    setContactDetails('');
    setDescription('');
    setShowConfirmation(false);
  };
  
  const categories = [
    'Electronics',
    'Personal Items',
    'Bags/Luggage',
    'Clothing',
    'Documents',
    'Jewelry/Accessories',
    'Other'
  ];
  
  const lostItems: LostItem[] = [
    {
      id: 'L12345',
      name: 'Blue Backpack',
      category: 'Bags/Luggage',
      station: 'Patna Junction',
      date: '2025-05-15',
      status: 'found',
      description: 'Blue Adidas backpack with laptop and charger',
      contact: '+91 98765 43210',
      image: 'https://images.pexels.com/photos/346748/pexels-photo-346748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'L12346',
      name: 'iPhone 14 Pro',
      category: 'Electronics',
      station: 'Gandhi Maidan',
      date: '2025-05-18',
      status: 'pending',
      description: 'Black iPhone with blue case',
      contact: '+91 98765 12345'
    },
    {
      id: 'L12347',
      name: 'Prescription Glasses',
      category: 'Personal Items',
      station: 'Danapur',
      date: '2025-05-20',
      status: 'claimed',
      description: 'Black frame with gold rims',
      contact: '+91 87654 32109',
      image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'L12348',
      name: 'Red Wallet',
      category: 'Personal Items',
      station: 'Patliputra',
      date: '2025-05-22',
      status: 'pending',
      description: 'Red leather wallet with ID cards and cash',
      contact: '+91 76543 21098'
    },
    {
      id: 'L12349',
      name: 'Water Bottle',
      category: 'Personal Items',
      station: 'Rajendra Nagar',
      date: '2025-05-23',
      status: 'found',
      description: 'Blue metal water bottle with stickers',
      contact: '+91 65432 10987',
      image: 'https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];
  
  const filteredItems = lostItems.filter(item => {
    let matchesSearch = true;
    let matchesCategory = true;
    let matchesStatus = true;
    
    if (searchQuery) {
      matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.station.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    if (filterCategory) {
      matchesCategory = item.category === filterCategory;
    }
    
    if (filterStatus) {
      matchesStatus = item.status === filterStatus;
    }
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium">Pending</span>;
      case 'found':
        return <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium">Found</span>;
      case 'claimed':
        return <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium">Claimed</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen pb-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-900 dark:to-amber-950 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {translations.lostFoundHeading}
          </h1>
          <p className="text-amber-100 dark:text-amber-200 mb-6">
            {translations.lostFoundSubheading}
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'report'
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              {translations.reportLostItem}
            </button>
            <button
              onClick={() => setActiveTab('find')}
              className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'find'
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Search className="h-5 w-5 mr-2" />
              {translations.findItem}
            </button>
          </div>
          
          {/* Report Lost Item Tab */}
          {activeTab === 'report' && (
            <div className="p-6">
              {showConfirmation ? (
                <div className="max-w-lg mx-auto text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {translations.successReportSubmit}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your report has been submitted successfully. We will contact you if your item is found.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 mb-6">
                    <div className="flex flex-col space-y-2 text-left">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Report ID:</span>
                        <span className="font-medium text-gray-900 dark:text-white">LF{Math.floor(Math.random() * 100000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Item:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{itemName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Category:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{itemCategory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Station:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{lostStation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Date:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{lostDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Contact:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{contactDetails}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={resetForm}
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
                    >
                      Report Another Item
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitReport} className="max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {translations.itemDescription}
                      </label>
                      <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="E.g., Blue Backpack, Smartphone, etc."
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Item Category
                      </label>
                      <select
                        value={itemCategory}
                        onChange={(e) => setItemCategory(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {translations.locationOfLoss}
                      </label>
                      <select
                        value={lostStation}
                        onChange={(e) => setLostStation(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        required
                      >
                        <option value="">Select station</option>
                        {stations.map((station) => (
                          <option key={station.id} value={station.name}>
                            {station.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {translations.dateOfLoss}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={lostDate}
                          onChange={(e) => setLostDate(e.target.value)}
                          className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          max={new Date().toISOString().split('T')[0]}
                          required
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Detailed Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Please provide as much detail as possible about the item (color, brand, contents, identifying features, etc.)"
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {translations.contactDetails}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={contactDetails}
                          onChange={(e) => setContactDetails(e.target.value)}
                          className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Phone number or email"
                          required
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Upload Image (Optional)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          className="sr-only"
                          id="item-image"
                          accept="image/*"
                        />
                        <label
                          htmlFor="item-image"
                          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 cursor-pointer"
                        >
                          <Upload className="mr-2 h-5 w-5 text-gray-400" />
                          Upload Photo
                        </label>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-900">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Important Information
                        </h4>
                        <ul className="mt-1 text-xs text-gray-600 dark:text-gray-300 list-disc list-inside space-y-1">
                          <li>Please provide accurate contact details so we can reach you when your item is found</li>
                          <li>You will receive a confirmation email/SMS with your report details</li>
                          <li>Patna Metro is not responsible for lost items but will make reasonable efforts to help</li>
                          <li>For valuable items (electronics, jewelry, etc.), also file a police report</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                      {translations.submitReport}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
          
          {/* Find Lost Items Tab */}
          {activeTab === 'find' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                {/* Search and Filters */}
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Search by item name, description, or station..."
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    
                    <div className="flex space-x-2">
                      <div className="relative">
                        <select
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="appearance-none w-full px-4 py-2 pr-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option value="">All Categories</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                      
                      <div className="relative">
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="appearance-none w-full px-4 py-2 pr-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option value="">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="found">Found</option>
                          <option value="claimed">Claimed</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Results Count */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {filteredItems.length} items
                  </p>
                  <div className="flex items-center">
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <Filter className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <Clock className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Lost Items List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredItems.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex">
                        <div className="w-1/3 bg-gray-100 dark:bg-slate-600 flex items-center justify-center p-4">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-32 object-cover rounded-md"
                            />
                          ) : (
                            <Camera className="h-16 w-16 text-gray-300 dark:text-gray-500" />
                          )}
                        </div>
                        <div className="w-2/3 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </h3>
                            {getStatusBadge(item.status)}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                            <div className="w-full flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {item.station}
                            </div>
                            <div className="w-full flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(item.date).toLocaleDateString()}
                            </div>
                            <div className="w-full flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              Category: {item.category}
                            </div>
                          </div>
                          
                          {item.status === 'found' && (
                            <div className="mt-3">
                              <button className="w-full px-3 py-1.5 text-xs font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700">
                                Contact to Claim
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredItems.length === 0 && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 mb-4">
                      <Search className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No items found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Contact Information Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Lost & Found Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Phone className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Helpline
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  +91 1800 123 4567
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  (8 AM - 10 PM, All days)
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Mail className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  lostfound@patnametro.org
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  (Response within 24 hours)
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Central Lost & Found Office
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Patna Junction Metro Station, Level 1
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  (10 AM - 6 PM, Mon-Sat)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Lost & Found Process */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Lost & Found Process
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                1
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                Report
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Report your lost item through our online form, helpline, or visit any metro station customer service desk.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                Provide accurate description and details
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                Share when and where you lost the item
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                Include valid contact information
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                2
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                Track
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Follow up on your report using the reference number provided in your confirmation email/SMS.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Check status online or via helpline
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Receive notifications if your item is found
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Items are stored for 90 days
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                3
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                Claim
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If your item is found, you'll be notified. Visit the Lost & Found office to claim your belongings.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                Bring valid ID and report reference number
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                Describe the item in detail to verify ownership
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                Sign the release form upon receiving your item
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LostFound;