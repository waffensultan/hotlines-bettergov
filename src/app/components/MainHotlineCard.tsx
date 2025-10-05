'use client';

import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const MainHotlineCard = () => {
  return (
    <div className="bg-primary-500 mx-4 p-6 rounded-xl flex flex-col gap-1">
      <div className="text-white font-bold text-5xl">911</div>
      <div className="flex flex-row justify-between items-center">
        <div className="text-white">Emergency hotline</div>
        <div>
          <Button
            variant="default"
            className="rounded-xl bg-primary-400 text-white"
            size="lg"
            onClick={() => (window.location.href = 'tel:911')}
          >
            <Phone />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainHotlineCard;
