export type HotlineType = 'police' | 'fire' | 'health';

type HotlinesType = {
  name: string;
  location: string;
  contact: string;
  hotlineType: HotlineType;
  region: string;
};

const hotlines: HotlinesType[] = [
  {
    name: 'Bureau of Fire Protection',
    location: 'Iloilo',
    contact: '(033) 337-3011',
    hotlineType: 'fire',
    region: 'PH-ILI',
  },
];

export default hotlines;
