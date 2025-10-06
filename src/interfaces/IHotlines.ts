export interface IHotlinesResponse {
  hotlines: IHotline[];
}

export interface IHotline {
  id: string;
  hotlineType: THotlineType;
  hotlineName: string;
  hotlineNumber: string;
  regionName: string;
  regionCode: string;
  province: string;
  city: string;
  category: THotlineCategory;
  availability: string;
  alternateNumbers: string[];
  abbreviation?: string;
  isActive: boolean;
}

export type THotlineType =
  | 'Emergency Hotlines'
  | 'Medical Hotlines'
  | 'Utility Hotlines'
  | 'Government Hotlines';

export type THotlineCategory =
  | 'police_hotlines'
  | 'fire_hotlines'
  | 'medical_hotlines'
  | 'utility_hotlines'
  | 'government_hotlines'
  | 'traffic_hotlines';
