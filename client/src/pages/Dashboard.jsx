import React, { useState, useEffect } from 'react';
import { FaCarrot,FaEye, FaChartLine, FaCode, FaMoneyBillWave, FaRobot, FaCamera, FaBookOpen, FaBriefcase, FaUserFriends } from 'react-icons/fa';
import { AiOutlineUpload } from 'react-icons/ai';
import { SiGithub, SiLeetcode } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileSetupStep, setProfileSetupStep] = useState(1);
  const [isFocused, setIsFocused] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating camera-based focus tracking
    const focusInterval = setInterval(() => {
      setIsFocused(Math.random() > 0.2); // 80% chance of being focused
    }, 5000);

    return () => clearInterval(focusInterval);
  }, []);

  const renderDashboard = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Eye Disease Prediction </h2>
  
      {/* Dashboard Grid */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        {/* Prediction Tracker Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Monitor Your Eye Health</h3>
          <p className="text-gray-600 mb-4">
            Get insights into your eye health with predictions and personalized recommendations for early detection and care.
          </p>
          <button
          onClick={() => (window.location.href = 'https://cloud-object-storage-cos-static-web-hosting-x5l.s3-web.us-east.cloud-object-storage.appdomain.cloud/')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-300 flex items-center"
          >
            <FaEye className="mr-2" /> Get Predictions
          </button>

        </div>
      </div>
  
      {/* Eye Health Tips Section */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Tips for Maintaining Healthy Eyes</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Regularly visit an eye specialist for check-ups and advice.</li>
          <li>Maintain a balanced diet rich in vitamins and antioxidants.</li>
          <li>Take breaks from screens to reduce eye strain and fatigue.</li>
          <li>Wear UV-protective eyewear when exposed to sunlight.</li>
        </ul>
      </div>
    </div>
  );
  
  
  


  const renderEyeHealthRemedies = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
  
      {/* Eye Health Remedies Grid */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Remedies for Eye Diseases</h3>
          <p className="text-gray-600 mb-4">Explore natural and effective remedies to maintain eye health and prevent diseases.</p>
          <button
            onClick={() => navigate('/EyeHealthRemedies')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-300 flex items-center"
          >
            <FaCarrot className="mr-2" /> Get Started
          </button>
        </div>
      </div>
  
      {/* Additional Tips or Sections */}
      <div className="bg-gray-100 p-4 rounded-lg mt-6">
        <h3 className="text-xl font-semibold mb-2">Tips for Healthy Eyes</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Consume a balanced diet rich in vitamins like A, C, and E.</li>
          <li>Practice the 20-20-20 rule to reduce eye strain.</li>
          <li>Stay hydrated to maintain optimal eye moisture levels.</li>
          <li>Protect your eyes from excessive screen exposure and UV rays.</li>
        </ul>
      </div>
    </div>
  );
  
  

  

  
  

  const renderContent = () => {
    switch (activeTab) {
      case 'overalldashboard':
        return renderDashboard();
     
      case 'EyeHealthRemedies':
        return renderEyeHealthRemedies();
      
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800"> Eye Disease Prediction</h1>
      </header>
      <div className="flex flex-col md:flex-row gap-8">
        <nav className="w-full md:w-64 bg-white shadow-md rounded-lg p-6">
          <ul>
            {[
              { id: 'overalldashboard', icon: <FaChartLine />, label: 'Eye Disease Prediction' },
             
              { id: 'EyeHealthRemedies', icon: < FaCarrot />, label: 'Eye Health Remedies' },
              

            ].map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center p-2 rounded ${activeTab === item.id ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 bg-white shadow-md rounded-lg p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};



export default Dashboard;
