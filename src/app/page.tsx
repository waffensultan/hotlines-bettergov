'use client';

import { IMetadata } from '@/interfaces/IMetadata';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { IHotlinesResponse } from '@/interfaces/IHotlines';
import HotlinesDisplay from '@/components/hotlines-display';

export default function RootPage() {
  const [metadata, setMetadata] = useState<IMetadata | null>(null);
  const [hotlines, setHotlines] = useState<IHotlinesResponse | null>(null);

  const [selectedRegion, setSelectedRegion] = useState('Region IV-A'); // Default
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedHotlineType, setSelectedHotlineType] = useState('Emergency Hotlines'); // Default

  // Fetch data
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch('/api/metadata');
        const data: IMetadata = await response.json();

        setMetadata(data);

        const defaultRegion = data.regions.find(region => region.code === selectedRegion);
        if (defaultRegion && defaultRegion.provinces.length > 0) {
          setSelectedProvince(defaultRegion.provinces[0].province);
        }
        if (defaultRegion && defaultRegion.provinces[0].cities.length > 0) {
          setSelectedCity(defaultRegion.provinces[0].cities[0]);
        }
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchMetadata();
  }, []);

  useEffect(() => {
    const fetchHotlines = async () => {
      if (!selectedRegion || !selectedCity || !selectedHotlineType) {
        return;
      }

      try {
        const params = new URLSearchParams({
          region: selectedRegion,
          city: selectedCity,
          hotlineType: selectedHotlineType,
        });

        const response = await fetch(`/api/hotlines?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: IHotlinesResponse = await response.json();
        setHotlines(data);
      } catch (error) {
        console.error('Error fetching hotlines:', error);
        setHotlines(null);
      }
    };

    fetchHotlines();
  }, [selectedRegion, selectedCity, selectedHotlineType]);

  // On region change
  // Update `selectedProvince` to the new region's first available province
  // Update `selectedCity` to the new region's province's first available city
  const handleRegionChange = (newRegion: string) => {
    setSelectedRegion(newRegion);

    const region = metadata?.regions.find(region => region.code === newRegion);

    if (region && region.provinces.length > 0) {
      setSelectedProvince(region.provinces[0].province);
    }

    if (region && region.provinces[0].cities.length > 0) {
      setSelectedCity(region.provinces[0].cities[0]);
    }
  };

  // On province change
  // Update `selectedCity` to the new province's first available city
  const handleProvinceChange = (newProvince: string) => {
    setSelectedProvince(newProvince);

    const selectedProvinceData = availableProvincesOnRegion?.find(
      ({ province }) => province === newProvince
    );

    if (selectedProvinceData && selectedProvinceData.cities.length > 0) {
      setSelectedCity(selectedProvinceData.cities[0]);
    } else {
      setSelectedCity(null);
    }
  };

  const availableProvincesOnRegion = metadata?.regions.find(
    region => region.code === selectedRegion
  )?.provinces;
  const availableCitiesOnProvince = availableProvincesOnRegion?.find(
    ({ province }) => province === selectedProvince
  )?.cities;

  return (
    <div className="bg-neutral-50">
      <div className="relative bg-blue-800 min-h-[38vh] md:min-h-[35vh] flex flex-col justify-center px-4 md:px-32">
        <div className="flex flex-col space-y-3">
          <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight">
            Philippines Emergency Hotlines
          </h1>
          <div className="flex flex-col items-start">
            <p className="text-white/90 md:text-lg tracking-tight md:hidden">
              Quick access to emergency services across the Philippines. Find police, fire, medical,
              and government hotlines in your area.
            </p>
            <p className="hidden md:flex text-white/90 md:text-lg tracking-tight">
              Find police, fire, medical, and government hotlines in your area.
            </p>
            <p className="hidden md:flex text-white/90 md:text-lg tracking-tight">
              Quick access to emergency services across the Philippines.
            </p>
          </div>
        </div>
      </div>
      {/* SEARCH INPUT */}
      <div className="flex justify-center items-center px-4 md:px-32 py-6 -mt-11 relative z-10">
        <div className="flex flex-col gap-5 w-full max-w-6xl">
          {/* TODO: Update this so that it uses the selected region and then shows its respective cities (use a state for this) */}
          {metadata ? (
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-5 px-2 sm:px-6 w-full">
              <Select value={selectedRegion} onValueChange={handleRegionChange}>
                <SelectTrigger className="flex-1 min-w-0 sm:flex-none sm:w-[250px] py-5 bg-white text-sm sm:text-lg font-normal border-gray-300 rounded-full">
                  <SelectValue placeholder={`Region: ${metadata.regions[0].code}`}>
                    {selectedRegion ? `Region: ${selectedRegion}` : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="text-lg border-gray-300">
                  {metadata.regions.map(region => (
                    <SelectItem key={region.code} value={region.code}>
                      {region.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedProvince || ''} // Use value instead of defaultValue
                onValueChange={handleProvinceChange} // Add onValueChange handler
              >
                <SelectTrigger className="flex-1 min-w-0 sm:flex-none sm:w-[250px] py-5 bg-white text-sm sm:text-lg font-normal border-gray-300 rounded-full">
                  <SelectValue placeholder="Select Province">
                    {selectedProvince ? `Region: ${selectedProvince}` : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="text-lg border-gray-300">
                  {availableProvincesOnRegion?.map(({ province }) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedCity || ''} // Use value instead of defaultValue
                onValueChange={setSelectedCity} // Add onValueChange handler
              >
                <SelectTrigger className="flex-1 min-w-0 sm:flex-none sm:w-[250px] py-5 bg-white text-sm sm:text-lg font-normal border-gray-300 rounded-full">
                  <SelectValue placeholder={`City: ${metadata.regions[0].provinces[0].cities[0]}`}>
                    {selectedCity ? `City: ${selectedCity}` : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="text-lg border-gray-300">
                  {availableCitiesOnProvince?.map(city => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedHotlineType}
                onValueChange={value => setSelectedHotlineType(value)}
              >
                <SelectTrigger className="flex-1 min-w-0 sm:flex-none sm:w-[270px] py-5 bg-white text-sm sm:text-lg font-normal border-gray-300 rounded-full">
                  <SelectValue placeholder={`Service: ${metadata.hotlineTypes[0]}`}>
                    {selectedHotlineType ? `Type:  ${selectedHotlineType}` : null}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="text-lg border-gray-300">
                  {metadata.hotlineTypes.map(hotline => (
                    <SelectItem key={hotline} value={hotline}>
                      {hotline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-5 px-2 sm:px-6 w-full">
              {/* Region Filter Skeleton */}
              <div className="flex-1 min-w-0 sm:flex-none sm:w-[250px] h-[52px] bg-gray-200 rounded-full animate-pulse flex items-center px-4">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded flex-1 animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
              {/* Province Filter Skeleton */}
              <div className="flex-1 min-w-0 sm:flex-none sm:w-[250px] h-[52px] bg-gray-200 rounded-full animate-pulse flex items-center px-4">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded flex-1 animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
              {/* City Filter Skeleton */}
              <div className="flex-1 min-w-0 sm:flex-none sm:w-[250px] h-[52px] bg-gray-200 rounded-full animate-pulse flex items-center px-4">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded flex-1 animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Service Type Filter Skeleton */}
              <div className="flex-1 min-w-0 sm:flex-none sm:w-[270px] h-[52px] bg-gray-200 rounded-full animate-pulse flex items-center px-4">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded flex-1 animate-pulse"></div>
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 md:px-32">
        {/* HOTLINES DISPLAY */}
        <HotlinesDisplay
          hotlines={hotlines}
          selectedRegion={selectedRegion}
          selectedProvince={selectedProvince}
          selectedCity={selectedCity}
          selectedHotlineType={selectedHotlineType}
        />
      </div>
    </div>
  );
}
