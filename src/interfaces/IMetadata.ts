export interface IMetadataResponse {
  metadata: IMetadata;
}

export interface IMetadata {
  totalHotlines: number;
  regions: IRegion[];
  categories: string[];
}

export interface IRegion {
  name: string;
  provinces: IProvince[];
}

export interface IProvince {
  province: string;
  cities: string[];
}
