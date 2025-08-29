import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, MessageSquare, Clock, MapPin, AlertTriangle, Shield, FileText, HelpCircle, Info, ChevronDown, ChevronUp, ExternalLink, Check } from 'lucide-react';

const Helpline: React.FC = () => {
  const { translations } = useLanguage();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };
  
  const emergencyContacts = [
    {
      title: translations.customerSupport,
      phone: '1800-123-4567',
      hours: '24x7',
      description: 'For general inquiries, ticket booking assistance, and travel information.'
    },
    {
      title: translations.securityHelpline,
      phone: '1800-123-9876',
      hours: '24x7',
      description: 'For security concerns, suspicious activities, or emergency situations.'
    },
    {
      title: translations.technicalSupport,
      phone: '1800-123-5678',
      hours: '8 AM - 10 PM',
      description: 'For issues with smart cards, mobile app, or website.'
    },
    {
      title: translations.lostFoundContact,
      phone: '1800-123-6789',
      hours: '8 AM - 8 PM',
      description: 'For reporting lost items or claiming found possessions.'
    }
  ];
  
  const faqs = [
    {
      question: 'What are the operating hours of Patna Metro?',
      answer: 'Patna Metro operates from 6:00 AM to 11:00 PM on weekdays and 6:00 AM to 10:00 PM on weekends and holidays. First and last train timings may vary by station, so please check the station information or use our mobile app for exact details.'
    },
    {
      question: 'How do I recharge my Metro Smart Card?',
      answer: 'You can recharge your Metro Smart Card at any ticket counter at metro stations, through the Patna Metro mobile app, via our website, or using authorized recharge partners including select UPI apps. The minimum recharge amount is ₹100 and the maximum balance allowed is ₹2000.'
    },
    {
      question: 'What items are prohibited on the metro?',
      answer: 'Prohibited items include flammable materials, explosives, sharp objects, oversized luggage (exceeding 80x60x30cm), pets (except service animals), alcoholic beverages, and items that may cause discomfort to other passengers. All luggage is subject to security screening.'
    },
    {
      question: 'Is there a lost and found service?',
      answer: 'Yes, Patna Metro maintains a Lost and Found office at the Patna Junction Metro Station. Items found on trains or at stations are kept for 90 days. You can report lost items through our website, mobile app, or by calling our Lost & Found helpline at 1800-123-6789.'
    },
    {
      question: 'How do I file a complaint or provide feedback?',
      answer: 'You can file complaints or provide feedback through multiple channels: the Patna Metro mobile app, our website\'s feedback form, by emailing feedback@patnametro.org, calling our customer service at 1800-123-4567, or by filling a feedback form at any station\'s customer service desk.'
    },
    {
      question: 'Are there any discounts available for regular travelers?',
      answer: 'Yes, we offer various travel passes: Daily Pass (₹100 for unlimited travel within a day), Tourist Pass (₹250 for 3 days), and Monthly Pass (₹1200). Senior citizens (above 60 years), students, and differently-abled passengers can avail a 15% discount on all ticket types with valid ID proof.'
    }
  ];
  
  const stationHelpDesks = [
    { name: 'Patna Junction', location: 'Main Concourse, Gate 1', hours: '6 AM - 11 PM' },
    { name: 'Gandhi Maidan', location: 'Ticket Hall, Level 1', hours: '6 AM - 11 PM' },
    { name: 'Danapur', location: 'Near Exit Gate, Ground Floor', hours: '6 AM - 10 PM' },
    { name: 'Patliputra', location: 'Information Center, Level 1', hours: '6 AM - 10 PM' }
  ];
  
  return (
    <div className="min-h-screen pb-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-900 dark:to-indigo-950 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {translations.helplineHeading}
          </h1>
          <p className="text-indigo-100 dark:text-indigo-200 mb-6">
            {translations.helplineSubheading}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-indigo-100">Main Helpline</div>
                  <div className="text-xl font-bold text-white">1800-123-4567</div>
                </div>
              </div>
              <a 
                href="tel:18001234567"
                className="px-4 py-2 bg-white text-indigo-700 rounded-md font-medium text-sm hover:bg-indigo-50 transition-colors"
              >
                {translations.callHelpline}
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-indigo-100">Customer Support</div>
                  <div className="text-xl font-bold text-white">Live Chat Support</div>
                </div>
              </div>
              <button 
                className="px-4 py-2 bg-white text-indigo-700 rounded-md font-medium text-sm hover:bg-indigo-50 transition-colors"
              >
                {translations.chatWithUs}
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Emergency Contacts */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {translations.emergencyContacts}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencyContacts.map((contact, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  {index === 0 ? (
                    <Phone className="h-6 w-6" />
                  ) : index === 1 ? (
                    <Shield className="h-6 w-6" />
                  ) : index === 2 ? (
                    <HelpCircle className="h-6 w-6" />
                  ) : (
                    <MapPin className="h-6 w-6" />
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {contact.title}
                  </h3>
                  <div className="mt-1 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {contact.phone}
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {contact.hours}
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {contact.description}
                  </p>
                  <div className="mt-4">
                    <a 
                      href={`tel:${contact.phone.replace(/-/g, '')}`}
                      className="inline-flex items-center px-4 py-2 border border-indigo-600 dark:border-indigo-500 text-sm font-medium rounded-md text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Station Help Desks */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Station Help Desks
        </h2>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-slate-700/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Station
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Hours
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Services
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                {stationHelpDesks.map((desk, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {desk.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {desk.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {desk.hours}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                          Information
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          Lost & Found
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                          Card Services
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* Safety & Emergency */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Safety & Emergency
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                Emergency Procedures
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Press emergency buttons located in trains and platforms</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Inform the nearest station staff immediately</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Call emergency helpline: 112 or metro emergency: 1800-123-9876</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Follow staff instructions and evacuation procedures</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Help fellow passengers, especially children, elderly and differently-abled</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                Safety Features
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>24/7 CCTV surveillance in all trains and stations</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Security personnel deployed at all stations</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Emergency communication systems in all coaches</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Automated fire detection and suppression systems</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Regular safety drills and staff training</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Info className="h-5 w-5" />
              </div>
              <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                Passenger Advisories
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Mind the gap between train and platform</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Stand behind the yellow line while waiting</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Report unattended baggage to security personnel</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Use designated areas for boarding and deboarding</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Keep emergency exits clear at all times</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Feedback & Complaints */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="ml-4 text-2xl font-semibold text-gray-900 dark:text-white">
                {translations.feedbackComplaints}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Submit Your Feedback
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email or Phone
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your contact information"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Feedback Type
                    </label>
                    <select
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select type</option>
                      <option value="complaint">Complaint</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="appreciation">Appreciation</option>
                      <option value="query">General Query</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Your feedback or complaint details"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Other Ways to Reach Us
                </h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Call Our Feedback Hotline
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          1800-123-7890 (Toll-free, 8 AM - 8 PM)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Email Us
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          feedback@patnametro.org
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Visit Customer Service Center
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Patna Junction Metro Station, Level 1 (Open 10 AM - 6 PM)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Use Our Mobile App
                        </h4>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Download the Patna Metro app and use the feedback feature
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6">
              <button
                onClick={() => toggleFaq(index)}
                className="flex w-full text-left items-start justify-between focus:outline-none"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 text-indigo-600 dark:text-indigo-400">
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </button>
              {expandedFaq === index && (
                <div className="mt-3 text-base text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      {/* External Resources */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Additional Resources
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a 
            href="#"
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex items-start"
          >
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400">
              <FileText className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600">
                Passenger Charter
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Rights, responsibilities, and service standards
              </p>
              <div className="mt-2 flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                <span>View document</span>
                <ExternalLink className="ml-1 h-4 w-4" />
              </div>
            </div>
          </a>
          
          <a 
            href="#"
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex items-start"
          >
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
              <Download className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600">
                Metro Map & Guide
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Downloadable maps, timetables, and travel guides
              </p>
              <div className="mt-2 flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                <span>Download files</span>
                <ExternalLink className="ml-1 h-4 w-4" />
              </div>
            </div>
          </a>
          
          <a 
            href="#"
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex items-start"
          >
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-indigo-600">
                How-to Guides
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Videos and tutorials for using metro services
              </p>
              <div className="mt-2 flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                <span>Watch tutorials</span>
                <ExternalLink className="ml-1 h-4 w-4" />
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Helpline;