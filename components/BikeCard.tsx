import React from 'react';
import { Bike } from '../types';
import { Zap, Mountain, MapPin } from 'lucide-react';

interface BikeCardProps {
  bike: Bike;
  onReserve: (bike: Bike) => void;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike, onReserve }) => {
  // Helper to get icon based on type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Electric': return <Zap className="w-3 h-3 mr-1" />;
      case 'VTT': return <Mountain className="w-3 h-3 mr-1" />;
  
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
     switch (type) {
      case 'Electric': return 'bg-yellow-100 text-yellow-700';
      case 'VTT': return 'bg-stone-100 text-stone-700';
  
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={bike.image} 
          alt={bike.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getTypeColor(bike.type as string)}`}>
            {getTypeIcon(bike.type as string)}
            {bike.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{bike.title}</h3>
        </div>
        
      

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase font-semibold">Price</span>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-green-600">${bike.price}</span>
              <span className="text-gray-500 text-sm ml-1">/ day</span>
            </div>
          </div>
          
          <button 
            onClick={() => onReserve(bike)}
            className="px-5 py-2 bg-gray-900 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-300 shadow-sm"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;