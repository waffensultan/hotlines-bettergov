'use client';

import { Share, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const standalone = window.matchMedia('(display-mode: standalone)').matches;

    setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream);
    setIsStandalone(standalone);

    // Listen for the beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default mini-infobar from appearing
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`User response: ${outcome}`);

    // Clear the deferredPrompt so it can only be used once
    setDeferredPrompt(null);
  };

  // Don't show if already installed
  if (isStandalone) {
    return null;
  }

  // Don't show if no install capability detected
  if (!isIOS && !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 pb-safe z-50">
      <div className="max-w-md mx-auto px-4 py-4 sm:py-5">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2">
            <Smartphone size={20} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800 tracking-tight">Install App</h3>
          </div>

          {/* Android/Chrome - Native Install Button */}
          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm"
            >
              Add to Home Screen
            </button>
          )}

          {/* iOS - Manual Instructions */}
          {isIOS && (
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm text-gray-600 text-center px-2 leading-relaxed">
                To install this app, tap the share button
                <span role="img" aria-label="share icon" className="mx-1 inline-block align-middle">
                  <Share size={16} className="inline" />
                </span>
                and then select <span className="font-semibold">"Add to Home Screen"</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
