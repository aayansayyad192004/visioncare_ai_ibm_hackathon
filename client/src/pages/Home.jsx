import React from 'react';
import { FaEye, FaHeartbeat, FaStethoscope } from 'react-icons/fa'; // Removed FaClipboardList for "Continuous Monitoring"

const HomePage = () => {
  const primaryColor = "bg-green-600"; // Main green color for healthcare
  const secondaryColor = "bg-green-100"; // Lighter green for secondary sections
  const buttonColor = "bg-green-200"; // Light green button color for contrast
  const buttonBorderColor = "border-2 border-green-700"; // Darker border color for buttons

  const handleGetStarted = () => {
    window.location.href = '/Dashboard'; // Redirect to the Dashboard page
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen font-sans">
      {/* Hero Section */}
      <section className={`flex flex-col items-center justify-center text-center py-20 ${primaryColor} text-white shadow-lg`}>
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-wide leading-tight">
          Empowering Senior Citizens with <span className="text-green-200">VisionCare AI</span>
        </h1>
        <p className="text-lg sm:text-2xl mb-6 max-w-3xl mx-auto opacity-80">
          AI-driven insights to monitor eye health, predict diseases, and provide personalized care for senior citizens.
        </p>
        <button
          onClick={handleGetStarted}
          className={`${buttonColor} ${buttonBorderColor} px-8 py-4 text-xl sm:text-xl font-extrabold tracking-wide leading-tight text-green-500 font-semibold rounded-full shadow-xl transform hover:scale-105 hover:bg-green-900 hover:text-white hover:border-green-500 transition ease-in-out duration-300`}
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${secondaryColor}`}>
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12 text-gray-900">
          Key Features for Senior Citizens
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"> {/* Updated grid to 3 columns */}
          <FeatureCard
            icon={<FaEye />}
            title="Symptom Tracking"
            description="Easily track eye-related symptoms, including vision changes, for better management of health."
          />
          <FeatureCard
            icon={<FaHeartbeat />}
            title="Disease Prediction"
            description="AI-driven early predictions help detect potential eye diseases like glaucoma, cataracts, and macular degeneration."
          />
          <FeatureCard
            icon={<FaStethoscope />}
            title="Personalized Recommendations"
            description="Receive tailored advice based on individual health needs and preferences."
          />
        </div>
      </section>

      {/* Insights Section */}
      <section className={`py-16 ${secondaryColor}`}>
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12 text-gray-900">
          Health Insights for Senior Citizens
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-lg transition transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Easy-to-Use Tracking</h3>
            <p className="text-gray-600">
              Simple and intuitive symptom tracking, designed for seniors to easily manage their eye health.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg transition transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Preventive Care</h3>
            <p className="text-gray-600">
              Early identification of potential issues ensures timely intervention, reducing the risk of severe conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white dark:text-green-300 py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} VisionCare AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg transition transform hover:scale-105 hover:shadow-xl">
    <div className="text-5xl text-green-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default HomePage;
