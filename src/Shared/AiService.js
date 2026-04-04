import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generateAiInsights = async (carName) => {
  const prompt = `Give me a short structured info about this car: ${carName}. 
  The response must be in JSON format with the following structure:
  {
    "overview": "string",
    "performance": "string",
    "mileage": "string",
    "features": "string",
    "pros": ["string"],
    "cons": ["string"]
  }
  Keep the descriptions concise and professional.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Cleaning the response text to ensure it's valid JSON
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return null;
  }
};

export default {
  generateAiInsights,
};
