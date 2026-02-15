import React, { useState } from 'react';
import { Bike, Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: 'home' | 'bikes' | 'contact' | 'login') => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { label: string; id: 'home' | 'bikes' | 'contact' }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Bikes', id: 'bikes' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Bike className="h-8 w-8 text-green-600" />
            <span className="font-bold text-xl text-gray-900 tracking-tight">GreenBike</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-medium transition-colors ${
                  currentPage === item.id ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => onNavigate('login')}
              className={`${
                currentPage === 'login' ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'
              } text-white px-5 py-2 rounded-full font-medium transition-all shadow-sm hover:shadow-md`}
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.id 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4">
              <button 
                onClick={() => {
                  onNavigate('login');
                  setIsOpen(false);
                }}
                className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;