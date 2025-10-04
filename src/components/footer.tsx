import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-gray-900 border-t border-gray-200 px-4 lg:px-32 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="md:col-span-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-blue-900 via-red-500 to-yellow-300 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">
              PH
            </div>
            <div>
              <h2 className="text-xl font-semibold">Hotlines PH</h2>
              <p className="text-sm text-gray-600">Emergency Services Philippines</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your comprehensive directory for emergency services, hotlines, and public assistance
            across the Philippines.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Emergency Services */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900">Emergency Numbers</h3>
          <ul className="space-y-2">
            <li>
              <span className="text-gray-600">Police: </span>
              <span className="text-red-600 font-semibold">117</span>
            </li>
            <li>
              <span className="text-gray-600">Fire: </span>
              <span className="text-red-600 font-semibold">116</span>
            </li>
            <li>
              <span className="text-gray-600">Emergency: </span>
              <span className="text-red-600 font-semibold">911</span>
            </li>
            <li>
              <span className="text-gray-600">Red Cross: </span>
              <span className="text-red-600 font-semibold">143</span>
            </li>
          </ul>
        </div>

        {/* Contribute */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900">Contribute</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="https://github.com/waffensultan/hotlines-bettergov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>View Source</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/waffensultan/hotlines-bettergov/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span>Report Issue</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/waffensultan/hotlines-bettergov/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>Contribute</span>
              </a>
            </li>
            <li>
              <Link
                href="/submit-hotline"
                className="text-gray-600 hover:text-red-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                <span>Submit Hotline</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-600 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Hotlines PH. Built for the Filipino community.
        </div>
      </div>
    </footer>
  );
}
