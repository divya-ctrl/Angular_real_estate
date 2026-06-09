export interface PropertyItem {
  id?: string;
  title: string;
  location: string;
  price: string;
  area: string;
  type: string;
  description: string;
  features: string[];
  images: string[];
  contactName: string;
  contactPhone: string;
  active: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export type PropertyPayload = Omit<PropertyItem, 'id' | 'createdAt' | 'updatedAt'>;
