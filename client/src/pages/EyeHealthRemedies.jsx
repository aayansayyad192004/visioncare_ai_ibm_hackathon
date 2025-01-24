import React, { useState, useEffect, useRef } from "react";
import WavEncoder from "wav-encoder";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // For Vite
const ibmApiKey = "0_1VyuPxBk1QDu030_3KTuyqjanDeHVWV0wqQ3y_-BzX"; // IBM API Key
const ibmSpeechToTextUrl =
  "https://api.au-syd.speech-to-text.watson.cloud.ibm.com/instances/fb1b7816-c3a2-4548-a728-4dc5faf60418/v1/recognize";

const EyeHealthRemedies = () => {
  const [symptoms, setSymptoms] = useState("");
  const [remedies, setRemedies] = useState("");
  const [nutritionAdvice, setNutritionAdvice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const audioChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const wavFile = await convertToWav(audioBlob);
        setAudioFile(wavFile);
        setIsRecording(false);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const convertToWav = async (audioBlob) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const channelData = [];
    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
      channelData.push(audioBuffer.getChannelData(i));
    }

    try {
      const wavData = await WavEncoder.encode({
        sampleRate: audioBuffer.sampleRate,
        channelData,
      });

      return new File([wavData], "recording.wav", { type: "audio/wav" });
    } catch (error) {
      console.error("Error encoding WAV:", error);
      throw new Error("Error encoding WAV file");
    }
  };

  const handleAudioUpload = async () => {
    if (!audioFile) {
      console.error("No audio file to upload.");
      return;
    }

    try {
      const response = await fetch(ibmSpeechToTextUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa("apikey:" + ibmApiKey)}`,
        },
        body: audioFile,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error Details:", errorData);
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.results && data.results.length > 0) {
        const transcript = data.results
          .map((result) => result.alternatives[0].transcript)
          .join(" ");
        setSymptoms(transcript);
      } else {
        console.error("No transcript found in response.");
      }
    } catch (error) {
      console.error("IBM API error:", error);
    }
  };

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

        const result = await chatSession.sendMessage(symptoms);
        let rawResponse = await result.response.text();

        rawResponse = rawResponse.replace(/\\+/g, ""); // Remove "**" characters
        rawResponse = rawResponse.replace(/Important Note:[\s\S]*$/, ""); // Remove disclaimers
        rawResponse = rawResponse.replace(/Nutritional Advice:/g, ""); // Remove section titles

        const parts = rawResponse.split("\n");
        let tempRemedies = [];
        let tempNutrition = [];
        let isRemedySection = true;

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

        setRemedies(tempRemedies.join("\n") || "");
        setNutritionAdvice(tempNutrition.join("\n") || "");
      } catch (error) {
        console.error("Error fetching advice from Gemini:", error);
      }
    };

    if (symptoms) {
      fetchHealthAdvice();
    }
  }, [symptoms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    handleAudioUpload();
  };

  return (
    <div className="bg-green-600 container mx-auto px-4 py-8 min-h-screen max-w-7xl text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Eye Health Advice</h1>

      <div className="space-y-6 bg-green-100 text-black p-6 rounded-lg shadow-xl">
        <div>
          <label htmlFor="symptoms" className="block mb-2 font-semibold text-teal-700">
            Enter Eye Symptoms:
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3 border rounded-md focus:ring focus:ring-teal-300"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows="4"
            placeholder="Enter symptoms like blurred vision, dry eyes, eye pain, etc."
          />
        </div>

        <div className="space-y-4">
          <button
            onClick={startRecording}
            disabled={isRecording}
            className="bg-green-600 border-2 border-green-700 text-white px-6 py-3 rounded-md hover:bg-green-300 transition duration-300 ease-in-out"
          >
            Start Recording
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className="bg-red-600 border-2 border-red-700 text-white px-6 py-3 rounded-md hover:bg-red-300 transition duration-300 ease-in-out"
          >
            Stop Recording
          </button>
        </div>

        {audioFile && (
          <div>
            <h3 className="text-lg font-semibold text-teal-700">Audio Recorded:</h3>
            <audio controls src={URL.createObjectURL(audioFile)} />
          </div>
        )}

        <button
          className="bg-green-600 border-2 border-green-700 text-white px-6 py-3 rounded-md hover:bg-green-300 transition duration-300 ease-in-out"
          onClick={handleSubmit}
        >
          Get Remedies and Nutrition Advice
        </button>
      </div>

      {isSubmitted && (
        <div className="space-y-8 bg-green-100 text-black p-6 rounded-lg shadow-xl mt-6">
          <h2 className="text-3xl font-semibold text-center text-teal-700">
            Your Eye Health Recommendations
          </h2>

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
