'use client';

import { HotlineType } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Copy, Flame, Hospital, Landmark, Phone, Siren } from 'lucide-react';
import { toast } from 'sonner';

type HotlineCardProps = {
  type: HotlineType;
  name: string;
  contact: string;
  location?: string;
};

const icons = {
  police: <Siren size={20} />,
  fire: <Flame size={20} />,
  health: <Hospital size={20} />,
  other: <Landmark size={20} />,
};

const colors = {
  police: {
    background: 'bg-primary-100',
    text: 'text-primary-500',
  },
  fire: {
    background: 'bg-red-100',
    text: 'text-red-500',
  },
  health: {
    background: 'bg-green-100',
    text: 'text-green-500',
  },
  other: {
    background: 'bg-gray-100',
    text: 'text-gray-500',
  },
};

const HotlineCard: React.FC<HotlineCardProps> = ({ type, name, contact, location }) => {
  return (
    <div className="flex flex-row border-gray-300 mx-4 border py-4 px-6 rounded-xl shadow-xs gap-4 bg-white">
      <div>
        <div className={cn('rounded-xl', 'p-3', colors[type].background, colors[type].text)}>
          {icons[type]}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="font-bold">{name}</div>
          <div className="flex flex-col">
            {location && <div className="text-gray-700 text-xs">{location}</div>}
            <div className="text-gray-700 text-xs">{contact}</div>
          </div>
        </div>
        <div className="flex flex-row">
          <div
            className="flex flex-row gap-2 items-center py-2 px-3 rounded-lg"
            role="button"
            onClick={() => {
              window.location.href = `tel:${contact}`;
            }}
          >
            <Phone size={16} />
            <span>Call</span>
          </div>
          <div
            className="flex flex-row gap-2 items-center py-2 px-3 rounded-lg"
            role="button"
            onClick={() => {
              navigator.clipboard.writeText(contact);
              toast.success('Successfully copied to clipboard.');
            }}
          >
            <Copy size={16} />
            <span>Copy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotlineCard;
