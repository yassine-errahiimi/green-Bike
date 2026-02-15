export type BikeCategory = 'All' | 'VTT' | 'City' | 'Electric';

export interface Bike {
  id: number;
  title: string;
  type: BikeCategory | string; // string to allow specific types from backend
  city: string;
  price: number;
  image: string;
}

export interface FilterState {
  city: string;
  type: BikeCategory;
}