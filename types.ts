
export interface Attraction {
  name: string;
  distance: string;
  time: string;
  description: string;
  image: string;
  coordinates: { x: number; y: number }; // Virtual coordinates for the compass interaction
}

export interface Room {
  id: string;
  title: string;
  type: 'Entire House' | 'Private Suite';
  capacity: string;
  price: string;
  description: string;
  amenities: string[];
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
