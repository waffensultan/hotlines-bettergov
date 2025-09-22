export default function AboutPage() {
  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-blue-800 min-h-[30vh] flex flex-col justify-center px-4 md:px-32">
        <div className="flex flex-col space-y-3 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            About Hotlines PH
          </h1>
          <p className="text-white/90 text-lg md:text-xl tracking-tight">
            Your comprehensive directory for emergency services across the Philippines
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-32 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Mission Statement */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Hotlines PH is dedicated to providing quick and reliable access to emergency services,
              government hotlines, and public assistance numbers across all regions of the
              Philippines. In times of crisis, every second counts, and we ensure that help is just
              a phone call away.
            </p>
          </div>

          {/* What We Offer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-red-600 mb-2">Emergency Services</h3>
                  <p className="text-gray-600">
                    Police, fire department, medical emergency, and rescue services hotlines
                    organized by region and city.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-red-600 mb-2">Government Hotlines</h3>
                  <p className="text-gray-600">
                    Access to local government units, barangay offices, and public service
                    departments across the Philippines.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-red-600 mb-2">Public Assistance</h3>
                  <p className="text-gray-600">
                    Social services, healthcare facilities, disaster response teams, and community
                    support organizations.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-red-600 mb-2">Easy Search</h3>
                  <p className="text-gray-600">
                    Filter by region, province, city, and service type to quickly find the exact
                    assistance you need.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Comprehensive Coverage</h3>
                  <p className="text-gray-600">
                    Hotlines from all 17 regions of the Philippines, including major cities and
                    municipalities.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Mobile Responsive</h3>
                  <p className="text-gray-600">
                    Optimized for mobile devices so you can access emergency numbers anywhere,
                    anytime.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Regular Updates</h3>
                  <p className="text-gray-600">
                    Our database is continuously updated to ensure all contact information remains
                    accurate and current.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Community Driven</h3>
                  <p className="text-gray-600">
                    Open source project that welcomes contributions from the Filipino community to
                    improve and expand our services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Numbers */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Remember These Emergency Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">911</div>
                <div className="text-gray-700 font-medium">Emergency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">117</div>
                <div className="text-gray-700 font-medium">Police</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">116</div>
                <div className="text-gray-700 font-medium">Fire</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">143</div>
                <div className="text-gray-700 font-medium">Red Cross</div>
              </div>
            </div>
          </div>

          {/* Get Involved */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Involved</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Help us improve Hotlines PH by contributing to our open-source project. Whether
              you&apos;re reporting outdated information, suggesting new features, or adding missing
              hotlines, your contributions make a difference in keeping our communities safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/waffensultan/hotlines-bettergov"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium text-center"
              >
                View on GitHub
              </a>
              <a
                href="https://github.com/waffensultan/hotlines-bettergov/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium text-center"
              >
                Report an Issue
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
