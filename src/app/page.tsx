'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import logo2 from '/public/bettergov-horizontal-logo.png';

import Image from 'next/image';
import HotlineCard from '@/components/hotline-card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { IMetadataResponse } from '@/interfaces/IMetadata';
import { IHotlinesResponse, THotlineCategory } from '@/interfaces/IHotlines';

import { Button } from '@/components/ui/button';
import { LucideIcon, Phone } from 'lucide-react';
import { ChevronsUpDownIcon } from 'lucide-react';
import { CheckIcon } from 'lucide-react';
import { PhoneIcon } from 'lucide-react';
import { CircleAlertIcon } from 'lucide-react';
import { AmbulanceIcon } from 'lucide-react';
import { DropletIcon } from 'lucide-react';
import { LandmarkIcon } from 'lucide-react';

const HomeContent = () => {
  const [metadata, setMetadata] = useState<IMetadataResponse | null>();
  const [hotlines, setHotlines] = useState<IHotlinesResponse | null>();
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);

  const [filterOptions, setFilterOptions] = useState({
    city: '',
    category: 'All Hotlines', // default
  });

  const [citySelectOpen, setCitySelectOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metadataRes = await fetch('/data/metadata.json');
        const metadata = await metadataRes.json();
        setMetadata(metadata);

        const hotlinesRes = await fetch('/data/hotlines.json');
        const hotlines = await hotlinesRes.json();
        setHotlines(hotlines);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Initialize service worker for PWA functionality
    if (process.env.NODE_ENV === 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!metadata) {
      return;
    }

    const detectLocation = () => {
      const getCoords = (): Promise<GeolocationPosition> => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            error => {
              console.error('Geolocation error:', error);
              reject(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
            }
          );
        });
      };

      const getLocation = async () => {
        try {
          const location = await getCoords();
          const { longitude, latitude } = location.coords;

          console.log('Coords:', { latitude, longitude });

          const response = await fetch(
            `/api/reverse-geocode?latitude=${latitude}&longitude=${longitude}`
          );

          if (!response.ok) {
            throw new Error('Failed to reverse geocode');
          }

          const data = await response.json();
          const city = data.city;

          // Check if the detected city exists
          // If it does, set it as a filtering option
          const cityExists = metadata?.metadata.regions.some(region =>
            region.provinces.some(province => province.cities.includes(city))
          );

          console.log('Metadata:', metadata);
          console.log('City:', city);
          console.log('City exists:', cityExists);

          if (cityExists) {
            localStorage.setItem('lastSavedLocation', city);
            console.log('City:', city);
            console.log('Saved location!');

            setFilterOptions(prev => ({
              ...prev,
              city: city,
            }));
          }

          setIsDetectingLocation(false);
        } catch (err) {
          console.error('Error detecting location:', err);

          // Offline/denied
          const stored = localStorage.getItem('lastSavedLocation');
          if (stored) {
            setFilterOptions(prev => ({
              ...prev,
              city: stored,
            }));
          }

          setIsDetectingLocation(false);
        }
      };

      getLocation();
    };

    detectLocation();

    setFilterOptions(prev => ({
      ...prev,
      city: metadata.metadata.regions[0].provinces[0].cities[0],
    }));
  }, [metadata]);

  if (!hotlines || !metadata || isDetectingLocation) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="relative inline-flex">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-blue-900 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  let selectedHotlines = hotlines.hotlines.filter(hotline => hotline.city === filterOptions.city);

  if (filterOptions.category && filterOptions.category !== 'All Hotlines') {
    selectedHotlines = selectedHotlines.filter(
      hotline => hotline.category === filterOptions.category
    );
  }

  return (
    <div className="flex flex-col bg-slate-50 min-h-[100vh] mx-auto items-center pb-40">
      {/* NAV/HEADER */}
      <div className="px-4 py-2 flex flex-row justify-start items-center gap-3 bg-white mb-4 w-full border-b border-gray-300">
        <Image height={200} width={200} src={logo2} alt="Logo" />
      </div>

      {/* FITERING OPTIONS */}
      <div className="flex flex-col gap-2 w-full px-3 pb-5 max-w-2xl">
        <Popover open={citySelectOpen} onOpenChange={setCitySelectOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              role="combobox"
              aria-expanded={citySelectOpen}
              className="w-full justify-between rounded-full"
            >
              {filterOptions.city !== '' ? filterOptions.city : 'Select City'}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
            <Command>
              <CommandInput placeholder="Search cities..." />
              <CommandList>
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup>
                  {metadata.metadata.regions.map(region =>
                    region.provinces.map(province =>
                      province.cities.map(city => (
                        <CommandItem
                          key={city}
                          value={city}
                          onSelect={currentValue => {
                            setFilterOptions(prev => ({
                              ...prev,
                              city: currentValue,
                            }));
                            setCitySelectOpen(false);
                            localStorage.setItem('lastSavedLocation', city);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              'mr-2 h-4 w-4',
                              filterOptions.city === city ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {city}
                        </CommandItem>
                      ))
                    )
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 max-w-2xl">
        <div className="flex w-full flex-row justify-center items-center gap-2 pb-5 flex-wrap">
          {['All Hotlines', 'Emergency', 'Medical', 'Utility', 'Government'].map(
            (hotlineType, index) => {
              const icons: Record<string, LucideIcon> = {
                'All Hotlines': PhoneIcon,
                Emergency: CircleAlertIcon,
                Medical: AmbulanceIcon,
                Utility: DropletIcon,
                Government: LandmarkIcon,
              };

              const value: Record<string, THotlineCategory> = {
                Emergency: 'police_hotlines',
                Medical: 'medical_hotlines',
                Utility: 'utility_hotlines',
                Government: 'government_hotlines',
              };

              const Icon = icons[hotlineType];

              return (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  role="combobox"
                  aria-expanded={citySelectOpen}
                  className={`${(filterOptions.category === value[hotlineType] || filterOptions.category === hotlineType) && 'bg-primary-500 text-white'} justify-between rounded-full hover:bg-primary-500 hover:text-white`}
                  onClick={() =>
                    setFilterOptions(prev => ({
                      ...prev,
                      category: value[hotlineType] || hotlineType,
                    }))
                  }
                >
                  <Icon className="mr-1 h-4 w-4 shrink-0" />
                  {hotlineType}
                </Button>
              );
            }
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-[600px] w-full">
        <div className="relative mx-4">
          <div className="absolute top-1 left-0 right-0 bg-gradient-to-br from-primary-400 to-primary-600 p-6 rounded-2xl shadow-lg z-0"></div>

          <div className="relative bg-gradient-to-br from-primary-400 to-primary-600 p-6 rounded-2xl flex flex-col gap-1 shadow-lg z-10">
            <div className="text-white font-bold text-6xl">911</div>
            <div className="flex flex-row justify-between items-center">
              <div className="text-white text-lg">National Emergency hotline</div>
              <div className="relative">
                <div className="absolute top-1 left-0 bg-white/15 rounded-full w-12 h-12 z-0 transition-all duration-150"></div>

                <div className="relative transition-all duration-150 active:translate-y-0.5">
                  <Button
                    variant="default"
                    className="relative rounded-full bg-white/25 hover:bg-white/35 active:bg-white/40 text-white backdrop-blur-sm w-12 h-12 z-10 transition-all duration-150 active:shadow-none"
                    size="lg"
                    onClick={() => (window.location.href = 'tel:911')}
                  >
                    <Phone />
                  </Button>
                </div>
              </div>
            </div>
      <div className="flex flex-col gap-4 max-w-2xl w-full">
        {/* MAIN HOTLINE CARD */}
        <div className="bg-gradient-to-br from-primary-400 to-primary-600 mx-4 p-6 rounded-2xl flex flex-col gap-1 shadow-lg">
          <div className="text-white font-bold text-6xl">911</div>
          <div className="flex flex-row justify-between items-center">
            <div className="text-white text-lg">National Emergency hotline</div>
            <Button
              variant="default"
              className="rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              size="lg"
              onClick={() => (window.location.href = 'tel:911')}
            >
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {selectedHotlines.map((hotline, index) => (
          <HotlineCard
            key={index}
            type={hotline.category}
            name={hotline.hotlineName}
            contact={hotline.hotlineNumber}
            location={hotline.city}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeContent;
