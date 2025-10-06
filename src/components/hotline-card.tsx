'use client';

import { THotlineCategory } from '@/interfaces/IHotlines';
import { cn } from '@/lib/utils';
import { Copy, Flame, Hospital, Landmark, LucideIcon, Phone, Siren } from 'lucide-react';
import { toast } from 'sonner';

type HotlineCardProps = {
  type: THotlineCategory;
  name: string;
  contact: string;
  location?: string;
};

const HotlineCard: React.FC<HotlineCardProps> = ({ type, name, contact, location }) => {
  const icons: Record<THotlineCategory, LucideIcon> = {
    police_hotlines: Siren,
    fire_hotlines: Flame,
    medical_hotlines: Hospital,
    government_hotlines: Landmark,
    utility_hotlines: Landmark,
    traffic_hotlines: Landmark,
  };

  const colors: Record<THotlineCategory, Record<string, string>> = {
    police_hotlines: {
      background: 'bg-primary-100',
      text: 'text-primary-500',
    },
    fire_hotlines: {
      background: 'bg-red-100',
      text: 'text-red-500',
    },
    medical_hotlines: {
      background: 'bg-green-100',
      text: 'text-green-500',
    },
    government_hotlines: {
      background: 'bg-gray-100',
      text: 'text-gray-500',
    },
    utility_hotlines: {
      background: 'bg-gray-100',
      text: 'text-gray-500',
    },
    traffic_hotlines: {
      background: 'bg-gray-100',
      text: 'text-gray-500',
    },
  };

  const Icon = icons[type];

  return (
    <div className="flex flex-row border-gray-300 mx-4 border py-4 px-6 rounded-xl shadow-xs gap-4 bg-white">
      <div>
        <div className={cn('rounded-xl', 'p-3', colors[type].background, colors[type].text)}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-base">{name}</div>
          <div className="flex flex-col gap-1">
            {location && <div className="text-gray-500 text-xs">{location}</div>}
            <div className="text-gray-800 text-sm font-semibold">{contact}</div>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div
            className="flex items-center justify-center py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors cursor-pointer shadow-md flex-[0.7]"
            role="button"
            onClick={() => {
              window.location.href = `tel:${contact}`;
            }}
          >
            <Phone size={16} />
            <span className="ml-2 font-semibold text-sm">CALL</span>
          </div>
          <div
            className="flex items-center justify-center py-2 px-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors cursor-pointer flex-[0.3]"
            role="button"
            onClick={() => {
              navigator.clipboard.writeText(contact);
              toast.success('Copied!', {
                description: `${contact} copied to clipboard`,
                duration: 2000,
              });
            }}
          >
            <Copy size={14} />
            <span className="ml-1 font-medium text-xs">COPY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotlineCard;
