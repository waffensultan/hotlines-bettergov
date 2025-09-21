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

  return (
    <div>
      <div className="relative bg-gradient-to-br from-orange-600 to-yellow-300 min-h-[50vh] md:min-h-[30vh] flex flex-col justify-center px-4 md:px-32 pb-8">
        {/* Main Title */}
        <div className="flex flex-col space-y-3">
          <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight">
            Philippines Emergency Hotlines
          </h1>
          <div className="flex flex-col items-start">
            <p className="text-white/90 md:text-lg tracking-tight">
              Quick access to emergency services across the Philippines.
            </p>
            <p className="text-white/90 md:text-lg tracking-tight">
              Find police, fire, medical, and government hotlines in your area.
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH INPUT */}
      <div className="flex justify-center items-center px-4 md:px-32 py-6 -mt-12 relative z-10">
        <div className="flex flex-col gap-5 w-full max-w-6xl">
          <input
            type="text"
            placeholder="Search by hotline, city, or region..."
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-orange-500 transition-colors shadow-lg bg-white"
          />

          {/* TODO: Update this so that it uses the selected region and then shows its respective cities (use a state for this) */}
          {metadata ? (
            <div className="flex flex-row items-center gap-5">
              <Select defaultValue={metadata.regions[0].code}>
                <SelectTrigger className="w-[250px] py-5 bg-white text-lg font-normal border-gray-300 rounded-full">
                  <SelectValue placeholder={`Region: ${metadata.regions[0].code} test`} />
                </SelectTrigger>
                <SelectContent className="text-lg border-gray-300">
                  {metadata.regions.map(region => (
                    <SelectItem key={region.code} value={region.code}>
                      Region: {region.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue={metadata.regions[0].cities[0]}>
                <SelectTrigger className="w-[250px] py-5 bg-white text-lg font-normal border-gray-300 rounded-full">
                  <SelectValue placeholder={`City: ${metadata.regions[0].cities[0]}`} />
                </SelectTrigger>
                <SelectContent className="text-lg border-gray-300">
                  {metadata.regions[0].cities.map(city => (
                    <SelectItem key={city} value={city}>
                      City: {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select defaultValue={metadata.hotlineTypes[0]}>
                <SelectTrigger className="w-[270px] py-5 bg-white text-lg font-normal border-gray-300 rounded-full">
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
