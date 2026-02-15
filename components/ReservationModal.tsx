import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Bike } from '../types';

interface ReservationModalProps {
  bike: Bike;
  isOpen: boolean;
  onClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ bike, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nom: '',
    phonnumber: '',
    age: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation data:', { bike, ...formData });
    setSubmitted(true);
    // Auto close after 2 seconds on success
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ nom: '', phonnumber: '', age: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="relative h-32 bg-green-600 flex items-center justify-center p-6 text-white">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Reserve Now</h2>
            <p className="text-green-100 text-sm">Reserving: {bike.title}</p>
          </div>
        </div>

        
        <div className="p-8">
          {submitted ? (
            <div className="text-center py-10 animate-in slide-in-from-bottom-4 duration-500">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reservation Successful!</h3>
              <p className="text-gray-500">We will contact you shortly to confirm.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom Complet
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  required
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="phonnumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de Téléphone
                </label>
                <input
                  type="tel"
                  id="phonnumber"
                  name="phonnumber"
                  required
                  value={formData.phonnumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Âge
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  min="12"
                  max="100"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="Votre âge"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow-md transition-all active:scale-95"
                >
                  Confirm
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
