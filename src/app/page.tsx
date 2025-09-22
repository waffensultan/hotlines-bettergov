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

export default function RootPage() {
  const [metadata, setMetadata] = useState<IMetadata | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('Region IV-A');

  // Fetch initial data
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch('/api/metadata');
        const data: IMetadata = await response.json();

        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchMetadata();
  }, []);

  const availableCitiesOnRegion = metadata?.regions.find(region => region.code === selectedRegion);

  return (
    <div>
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
      <div className="flex justify-center items-center px-4 md:px-32 py-6 -mt-13 relative z-10">
        <div className="flex flex-col gap-5 w-full max-w-6xl">
          <input
            type="text"
            placeholder="Search by hotline, city, or region..."
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-900 transition-colors shadow-lg bg-white"
          />

          {/* TODO: Update this so that it uses the selected region and then shows its respective cities (use a state for this) */}
          {metadata ? (
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-5 px-2 sm:px-6 w-full">
              <Select
                defaultValue={selectedRegion}
                onValueChange={value => setSelectedRegion(value)}
              >
                <SelectTrigger className="flex-1 min-w-0 sm:flex-none sm:w-[250px] py-5 bg-white text-sm sm:text-lg font-normal border-gray-300 rounded-full">
                  <SelectValue placeholder={`Region: ${metadata.regions[0].code}`} />
                </SelectTrigger>
                <SelectContent className="text-lg border-gray-300">
                  {metadata.regions.map(region => (
                    <SelectItem key={region.code} value={region.code}>
                      Region: {region.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue={availableCitiesOnRegion?.cities[0] || ''}>
                <SelectTrigger className="flex-1 min-w-0 sm:flex-none sm:w-[250px] py-5 bg-white text-sm sm:text-lg font-normal border-gray-300 rounded-full">
                  <SelectValue placeholder={`City: ${availableCitiesOnRegion?.cities[0] || ''}`} />
                </SelectTrigger>
                <SelectContent className="text-lg border-gray-300">
                  {availableCitiesOnRegion?.cities.map(city => (
                    <SelectItem key={city} value={city}>
                      City: {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue={metadata.hotlineTypes[0]}>
                <SelectTrigger className="flex-1 min-w-0 sm:flex-none sm:w-[270px] py-5 bg-white text-sm sm:text-lg font-normal border-gray-300 rounded-full">
                  <SelectValue placeholder={`Service: ${metadata.hotlineTypes[0]}`} />
                </SelectTrigger>
                <SelectContent className="text-lg border-gray-300">
                  {metadata.hotlineTypes.map(hotline => (
                    <SelectItem key={hotline} value={hotline}>
                      Type: {hotline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
