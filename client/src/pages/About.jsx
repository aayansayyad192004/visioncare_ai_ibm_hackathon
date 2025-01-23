import React from 'react';

export default function About() {
  return (
    <div className='px-6 py-12 max-w-6xl mx-auto'>
      {/* Header */}
      <h1 className='text-4xl font-bold mb-6 text-slate-800'>
        About <span className='text-green-600'>VisionCare AI</span>
      </h1>

      {/* Introduction */}
      <div className='mb-6 text-lg text-slate-700 leading-relaxed'>
        <p className='mb-6'>
          <strong className='text-slate-900'>VisionCare AI</strong> is a revolutionary platform designed to enhance eye health monitoring for senior citizens. Our AI-driven insights allow individuals to track their eye health, predict potential diseases, and receive personalized care suggestions—all in one place.
        </p>

        <p className='mb-6'>
          By utilizing <strong>symptom tracking</strong>, <strong>disease prediction</strong>, and <strong>personalized recommendations</strong>, VisionCare AI offers tools tailored to the needs of senior citizens to ensure they maintain healthy vision for years to come.
        </p>

        <p className='mb-6'>
          Empowering seniors with real-time health insights, VisionCare AI makes managing eye health simple and effective, enabling early detection of diseases and providing personalized care recommendations based on individual needs.
        </p>
      </div>

      {/* Why Choose VisionCare AI */}
      <div className='my-8 bg-gray-50 p-6 rounded-lg shadow-md'>
        <h2 className='text-3xl font-semibold mb-8 text-green-600'>
          Why Choose <span className='text-slate-800'>VisionCare AI?</span>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='flex items-start space-x-4'>
            <div className='bg-green-100 p-3 rounded-full'>
              {/* Placeholder for symptom tracking icon */}
            </div>
            <div>
              <h3 className='font-semibold text-slate-900'>
                Symptom Tracking
              </h3>
              <p className='text-slate-700'>
                Track eye-related symptoms like vision changes for better management and timely interventions.
              </p>
            </div>
          </div>
          <div className='flex items-start space-x-4'>
            <div className='bg-green-100 p-3 rounded-full'>
              {/* Placeholder for disease prediction icon */}
            </div>
            <div>
              <h3 className='font-semibold text-slate-900'>
                Disease Prediction
              </h3>
              <p className='text-slate-700'>
                Leverage AI to detect early signs of potential eye diseases, ensuring timely care and prevention.
              </p>
            </div>
          </div>

          
          
        </div>
      </div>

      {/* Final Section */}
      <div className='mt-8 text-lg text-slate-700 leading-relaxed'>
        <p className='mb-6'>
          At <strong className='text-slate-900'>VisionCare AI</strong>, our mission is to improve the quality of life for senior citizens by providing the tools and insights needed to maintain healthy vision. Join us in empowering seniors to take control of their eye health and ensure a better future for all.
        </p>

        <p>
          Learn more about how VisionCare AI can help enhance the lives of senior citizens and contribute to a healthier tomorrow.
        </p>
      </div>
    </div>
  );
}
