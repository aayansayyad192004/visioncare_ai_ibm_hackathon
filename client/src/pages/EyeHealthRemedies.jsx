import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // For Vite

const EyeHealthRemedies = () => {
  const [symptoms, setSymptoms] = useState("");
  const [remedies, setRemedies] = useState("");
  const [nutritionAdvice, setNutritionAdvice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchHealthAdvice = async () => {
      if (!symptoms) return;

      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chatSession = await model.startChat({
          generationConfig: {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
          },
          history: [
            {
              role: "user",
              parts: [
                {
                  text: `
                    Please provide only the separate remedies and nutritional advice for the following symptoms:
                    Symptom: ${symptoms}

                    Structure the response exactly as:
                    - List of remedies (no headings)
                    - List of nutritional advice (no headings)
                    Remove any section titles like "Remedies" or "Nutritional Advice".
                  `,
                },
              ],
            },
          ],
        });

        const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
        let rawResponse = await result.response.text();

        // Clean up response by removing unnecessary formatting or disclaimers
        rawResponse = rawResponse.replace(/\*\*+/g, ''); // Remove "**" characters
        rawResponse = rawResponse.replace(/Important Note:[\s\S]*$/, ''); // Remove the disclaimer part
        rawResponse = rawResponse.replace(/Nutritional Advice:/g, ''); // Remove the section title

        // Split the response into remedies and nutrition advice based on content
        const parts = rawResponse.split('\n');

        let tempRemedies = [];
        let tempNutrition = [];
        let isRemedySection = true;

        // Categorize parts into remedies and nutritional advice
        parts.forEach((line) => {
          if (line.includes("Omega-3") || line.includes("carrots") || line.includes("spinach") || line.includes("water")) {
            isRemedySection = false;
          }

          if (isRemedySection) {
            tempRemedies.push(line.trim());
          } else {
            tempNutrition.push(line.trim());
          }
        });

        // Set the remedies and nutritional advice state
        setRemedies(tempRemedies.join("\n") || "");
        setNutritionAdvice(tempNutrition.join("\n") || "");
      } catch (error) {
        console.error("Error fetching advice from Gemini:", error);
      }
    };

    fetchHealthAdvice();
  }, [symptoms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Define color theme
  const primaryColor = "bg-green-600"; // Main green color for healthcare
  const secondaryColor = "bg-green-100"; // Lighter green for secondary sections
  const buttonColor = "bg-green-600"; // Light green button color for contrast
  const buttonBorderColor = "border-2 border-green-700"; // Darker border color for buttons

  return (
    <div className={`${primaryColor} container mx-auto px-4 py-8 min-h-screen max-w-7xl text-white`}>
      <h1 className="text-4xl font-bold mb-8 text-center">Eye Health Advice</h1>

      <div className={`space-y-6 ${secondaryColor} text-black p-6 rounded-lg shadow-xl`}>
        <div>
          <label htmlFor="symptoms" className="block mb-2 font-semibold text-teal-700">Enter Eye Symptoms:</label>
          <textarea
            id="symptoms"
            className="w-full p-3 border rounded-md focus:ring focus:ring-teal-300"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows="4"
            placeholder="Enter symptoms like blurred vision, dry eyes, eye pain, etc."
          />
        </div>

        <button
          className={`${buttonColor} ${buttonBorderColor} text-white px-6 py-3 rounded-md hover:bg-green-300 transition duration-300 ease-in-out`}
          onClick={handleSubmit}
        >
          Get Remedies and Nutrition Advice
        </button>
      </div>

      {isSubmitted && (
        <div className={`space-y-8 ${secondaryColor} text-black p-6 rounded-lg shadow-xl mt-6`}>
          <h2 className="text-3xl font-semibold text-center text-teal-700">Your Eye Health Recommendations</h2>

          <div className="mb-4">
            <h3 className="text-xl font-semibold text-teal-600">Remedies:</h3>
            <div className="space-y-2">
              {remedies.split("\n").map((remedy, index) => (
                <p key={index} className="text-lg">{remedy.trim()}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-teal-600">Nutritional Advice:</h3>
            <div className="space-y-2">
              {nutritionAdvice.split("\n").map((advice, index) => (
                <p key={index} className="text-lg">{advice.trim()}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EyeHealthRemedies;
