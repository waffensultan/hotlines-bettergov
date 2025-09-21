export interface IMetadata {
  totalHotlines: number;
  regions: IRegion[];
  hotlineTypes: string[];
  categories: string[];
  lastUpdated: string;
}

export interface IRegion {
  code: string;
  name: string;
  cities: string[];
}
