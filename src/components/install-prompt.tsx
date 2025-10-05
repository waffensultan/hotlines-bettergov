'use client';

import { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 pb-safe z-50">
      <div className="max-w-md mx-auto px-4 py-4 sm:py-5">
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 tracking-tight">Install App</h3>
          {isIOS && (
            <p className="text-sm text-gray-600 text-center px-2 leading-relaxed">
              To install this app on your iOS device, tap the share button
              <span role="img" aria-label="share icon" className="mx-2 inline-block">
                ⎋
              </span>
              and then "Add to Home Screen"
              <span role="img" aria-label="plus icon" className="mx-2 inline-block">
                ➕
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
