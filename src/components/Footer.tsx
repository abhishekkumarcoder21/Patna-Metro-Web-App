import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import PatnaMetroLogo from './PatnaMetroLogo';

const Footer: React.FC = () => {
  const { translations } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PatnaMetroLogo />
              <span className="font-bold text-xl text-white">
                {translations.patnaMetro}
              </span>
            </div>
            <p className="text-sm mb-4">
              {translations.footerDescription}
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-blue-900/30 rounded-full hover:bg-blue-900/50 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-blue-900/30 rounded-full hover:bg-blue-900/50 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-blue-900/30 rounded-full hover:bg-blue-900/50 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-blue-900/30 rounded-full hover:bg-blue-900/50 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4">{translations.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/live-train-status" className="text-sm hover:text-blue-400 transition-colors">
                  {translations.liveTrainStatus}
                </Link>
              </li>
              <li>
                <Link to="/smart-ticketing" className="text-sm hover:text-blue-400 transition-colors">
                  {translations.smartTicketing}
                </Link>
              </li>
              <li>
                <Link to="/crowd-management" className="text-sm hover:text-blue-400 transition-colors">
                  {translations.crowdManagement}
                </Link>
              </li>
              <li>
                <Link to="/journey-planner" className="text-sm hover:text-blue-400 transition-colors">
                  {translations.journeyPlanner}
                </Link>
              </li>
              <li>
                <Link to="/lost-found" className="text-sm hover:text-blue-400 transition-colors">
                  {translations.lostFound}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4">{translations.supportLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/helpline" className="text-sm hover:text-blue-400 transition-colors">
                  {translations.helpline}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-blue-400 transition-colors">
                  {translations.faq}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-blue-400 transition-colors">
                  {translations.termsConditions}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-blue-400 transition-colors">
                  {translations.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-sm hover:text-blue-400 transition-colors">
                  {translations.accessibility}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4">{translations.contactUs}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  {translations.metroHeadquartersAddress}
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a href="tel:+911234567890" className="text-sm hover:text-blue-400 transition-colors">
                  +91 1234 567 890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a href="mailto:info@patnametro.org" className="text-sm hover:text-blue-400 transition-colors">
                  info@patnametro.org
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} {translations.patnaMetro}. {translations.allRightsReserved}
          </p>
          <div className="mt-4 md:mt-0">
            <img 
              src="https://www.dmrc.org/sites/default/files/inline-images/cert1.png" 
              alt="Certifications" 
              className="h-10"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;