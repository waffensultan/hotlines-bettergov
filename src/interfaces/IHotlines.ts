export interface IHotlinesResponse {
  hotlines: IHotline[];
}

export interface IHotline {
  id: string;
  hotlineType:
    | 'Emergency Hotlines'
    | 'Medical Hotlines'
    | 'Utility Hotlines'
    | 'Government Hotlines';
  hotlineName: string;
  hotlineNumber: string;
  region: string;
  city: string;
  category:
    | 'police_hotlines'
    | 'fire_hotlines'
    | 'medical_hotlines'
    | 'utility_hotlines'
    | 'government_hotlines';
  availability: string;
  alternateNumbers: string[];
  abbreviation?: string;
  isActive: boolean;
}
