'use client';

import logo from '../../public/web-app-manifest-192x192.png';
import Image from 'next/image';
import HotlineCard from './components/HotlineCard';
import hotlines from '@/lib/data';
import MainHotlineCard from './components/MainHotlineCard';
import { useEffect } from 'react';
// import CitySelect from "./components/CitySelect";
// import { useState } from "react";

const HomeContent = () => {
  // const [city, setCity] = useState("");

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });
    }
  }, []);

  return (
    <div className="flex flex-col bg-slate-50 min-h-[100vh] mx-auto items-center">
      <div className="px-4 py-4 flex flex-row items-center gap-3 bg-white mb-4 w-full border-b border-gray-300">
        <Image height={32} width={32} src={logo} alt="Logo" />
        <div>Hotlines PH by BetterGov.ph</div>
      </div>
      <div className="flex flex-col gap-4 max-w-[600px] w-full">
        {/* <div className="mx-4">
          <CitySelect
            value={city}
            onChange={(value) => {
              setCity(value);
            }}
          />
        </div> */}
        <MainHotlineCard />
        <HotlineCard name="Philippine National Police" type="police" contact="117" />
        <HotlineCard name="Red Cross" type="health" contact="143" />
        {hotlines.map(hotline => {
          return (
            <HotlineCard
              key={hotline.region + '_' + hotline.hotlineType}
              name={hotline.name}
              type={hotline.hotlineType}
              contact={hotline.contact}
              location={hotline.location}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomeContent;
