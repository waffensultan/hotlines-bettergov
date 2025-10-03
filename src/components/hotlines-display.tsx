import React from 'react';
import { IHotlinesResponse } from '@/interfaces/IHotlines';
import { Phone, MapPin, Clock, Building2, Ambulance, Shield, Zap, Users } from 'lucide-react';

interface HotlinesDisplayProps {
  hotlines: IHotlinesResponse | null;
  selectedRegion: string;
  selectedProvince: string | null;
  selectedCity: string | null;
  selectedHotlineType: string;
}

const HotlinesDisplay: React.FC<HotlinesDisplayProps> = ({
  hotlines,
  selectedRegion,
  selectedProvince,
  selectedCity,
  selectedHotlineType,
}) => {
  // Helper function to get the appropriate icon for hotline category
  const getHotlineIcon = (category: string) => {
    switch (category) {
      case 'medical_hotlines':
        return Ambulance;
      case 'police_hotlines':
        return Shield;
      case 'fire_hotlines':
        return Ambulance;
      case 'utility_hotlines':
        return Zap;
      case 'government_hotlines':
        return Building2;
      default:
        return Phone;
    }
  };

  // Helper function to get color scheme based on hotline category
  const getColorScheme = (category: string) => {
    switch (category) {
      case 'medical_hotlines':
      case 'fire_hotlines':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          accent: 'text-red-600',
          icon: 'text-red-500',
        };
      case 'police_hotlines':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          accent: 'text-blue-600',
          icon: 'text-blue-500',
        };
      case 'utility_hotlines':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          accent: 'text-yellow-600',
          icon: 'text-yellow-500',
        };
      case 'government_hotlines':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          accent: 'text-green-600',
          icon: 'text-green-500',
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          accent: 'text-gray-600',
          icon: 'text-gray-500',
        };
    }
  };

  if (!hotlines) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotlines...</p>
        </div>
      </div>
    );
  }

  if (!hotlines.hotlines || hotlines.hotlines.filter(hotline => hotline.isActive).length === 0) {
    return (
      <div className="text-center py-12">
        <Phone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Hotlines Found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          No {selectedHotlineType.toLowerCase()} available for {selectedCity}, {selectedProvince} in{' '}
          {selectedRegion}.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Try selecting a different location or hotline type.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-32 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4" />
          <span>
            {selectedCity}, {selectedProvince} • {selectedRegion}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedHotlineType}</h2>
        <p className="text-gray-600">
          Found {hotlines.hotlines.filter(hotline => hotline.isActive).length} active hotline
          {hotlines.hotlines.filter(hotline => hotline.isActive).length !== 1 ? 's' : ''} in your
          area
        </p>
      </div>
      {/* Hotlines Grid */}
      <div className="grid gap-4 md:gap-6">
        {hotlines.hotlines
          .filter(hotline => hotline.isActive)
          .map(hotline => {
            const colorScheme = getColorScheme(hotline.category);
            const IconComponent = getHotlineIcon(hotline.category);

            return (
              <div
                key={hotline.id}
                className={`${colorScheme.bg} ${colorScheme.border} border rounded-xl p-6 transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`${colorScheme.icon} flex-shrink-0 mt-1`}>
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Hotline Name */}
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{hotline.hotlineName}</h3>
                      {hotline.abbreviation && (
                        <span className="text-sm text-gray-500 font-medium">
                          ({hotline.abbreviation})
                        </span>
                      )}
                    </div>

                    {/* Main Phone Number */}
                    <div className="mb-3">
                      <div className="flex items-center gap-3">
                        <Phone className={`h-4 w-4 ${colorScheme.accent}`} />
                        <a
                          href={`tel:${hotline.hotlineNumber}`}
                          className={`${colorScheme.accent} font-semibold text-lg hover:underline`}
                        >
                          {hotline.hotlineNumber}
                        </a>
                      </div>
                    </div>

                    {/* Alternate Numbers */}
                    {hotline.alternateNumbers && hotline.alternateNumbers.length > 0 && (
                      <div className="space-y-2 mb-3">
                        <p className="text-sm font-medium text-gray-700">Alternate Numbers:</p>
                        {hotline.alternateNumbers.map((number, numberIndex) => (
                          <div key={numberIndex} className="flex items-center gap-3 ml-4">
                            <Phone className={`h-4 w-4 ${colorScheme.accent}`} />
                            <a
                              href={`tel:${number}`}
                              className={`${colorScheme.accent} font-medium hover:underline`}
                            >
                              {number}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      {/* Availability */}
                      {hotline.availability && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{hotline.availability}</span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <span
                        className={`px-2 py-1 ${colorScheme.bg} ${colorScheme.accent} text-xs font-medium rounded-full border ${colorScheme.border}`}
                      >
                        {hotline.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">Emergency Information</p>
            <p className="text-sm text-blue-700">
              In life-threatening emergencies, call <strong>911</strong> immediately. These hotlines
              are provided for your convenience and may have specific operating hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotlinesDisplay;
