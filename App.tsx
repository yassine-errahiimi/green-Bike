import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Bikes from './components/Bikes';
import Contact from './components/Contact';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { MOCK_BIKES } from './services/mockData';
import { Bike } from './types';

type Page = 'home' | 'bikes' | 'contact' | 'login' | 'register';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [loading, setLoading] = useState(true);
  const [bikes, setBikes] = useState<Bike[]>([]);
  
  // Filter States
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedType, setSelectedType] = useState('All');

  // Simulate API fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setBikes(MOCK_BIKES);
      setLoading(false);
    }, 1500); // 1.5s loading time to show skeleton

    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredBikes = useMemo(() => {
    return bikes.filter(bike => {
      const matchCity = selectedCity === 'All Cities' || bike.city === selectedCity;
      const matchType = selectedType === 'All' || bike.type === selectedType;
      return matchCity && matchType;
    });
  }, [bikes, selectedCity, selectedType]);

  const handleApplyFilters = () => {
    // In a real app, this might trigger a new API call
    // Here we just re-trigger loading to simulate "Searching" feel
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            loading={loading}
            filteredBikes={filteredBikes}
            selectedCity={selectedCity}
            selectedType={selectedType}
            onCityChange={setSelectedCity}
            onTypeChange={setSelectedType}
            onApply={handleApplyFilters}
          />
        );
      case 'bikes':
        return <Bikes />;
      case 'contact':
        return <Contact />;
      case 'login':
        return (
          <LoginPage 
            onBack={() => setCurrentPage('home')} 
            onRegister={() => setCurrentPage('register')} 
          />
        );
      case 'register':
        return (
          <RegisterPage 
            onBack={() => setCurrentPage('home')} 
            onLogin={() => setCurrentPage('login')} 
          />
        );
      default:
        return <Home 
          loading={loading}
          filteredBikes={filteredBikes}
          selectedCity={selectedCity}
          selectedType={selectedType}
          onCityChange={setSelectedCity}
          onTypeChange={setSelectedType}
          onApply={handleApplyFilters}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      {renderPage()}
      
      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} GreenBike Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;