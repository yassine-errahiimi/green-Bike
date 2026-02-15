import React, { useState } from 'react';
import Hero from './Hero';
import Filters from './Filters';
import BikeCard from './BikeCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import ReservationModal from './ReservationModal';
import { Bike } from '../types';

interface HomeProps {
  loading: boolean;
  filteredBikes: Bike[];
  selectedCity: string;
  selectedType: string;
  onCityChange: (city: string) => void;
  onTypeChange: (type: string) => void;
  onApply: () => void;
}

const Home: React.FC<HomeProps> = ({
  loading,
  filteredBikes,
  selectedCity,
  selectedType,
  onCityChange,
  onTypeChange,
  onApply,
}) => {
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReserveClick = (bike: Bike) => {
    setSelectedBike(bike);
    setIsModalOpen(true);
  };
  return (
    <>
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-20">
        <Filters 
          
          selectedType={selectedType}
          onCityChange={onCityChange}
          onTypeChange={onTypeChange}
          onApply={onApply}
        />

        {!loading && (
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              {filteredBikes.length > 0 ? 'Available Bikes' : ''}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredBikes.length} {filteredBikes.length === 1 ? 'result' : 'results'} found
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : filteredBikes.length > 0 ? (
            filteredBikes.map((bike) => (
              <BikeCard 
                key={bike.id} 
                bike={bike} 
                onReserve={handleReserveClick}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </main>

      {selectedBike && (
        <ReservationModal 
          bike={selectedBike}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Home;
