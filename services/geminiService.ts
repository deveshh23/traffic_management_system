
import { GoogleGenAI, Type } from "@google/genai";
import { VideoAnalysisResult, CongestionLevel } from "../types";

// Fix: Use correct named parameter initialization for GoogleGenAI with process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeVideoFrame = async (base64Image: string): Promise<VideoAnalysisResult> => {
  // Fix: Use gemini-3-pro-preview for complex visual analysis tasks
  const model = 'gemini-3-pro-preview';
  
  const prompt = `
    Analyze this traffic camera frame from an Indian city street.
    Detect:
    1. Vehicle count (rough estimate).
    2. Congestion level (LOW, MEDIUM, HIGH).
    3. Are there vehicles parked illegally or obstructing traffic (e.g. on a main road, double parking)?
    4. List any specific obstructions.
    
    Return the result in valid JSON.
  `;

  try {
    // Fix: Use ai.models.generateContent and provide multimodal content structure correctly
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { text: prompt },
          { inlineData: { data: base64Image, mimeType: "image/jpeg" } }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vehicleCount: { type: Type.NUMBER },
            congestionLevel: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH'] },
            illegalParkingDetected: { type: Type.BOOLEAN },
            obstructions: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['vehicleCount', 'congestionLevel', 'illegalParkingDetected', 'obstructions']
        }
      }
    });

    // Fix: Access .text property directly (it is not a function)
    const result = JSON.parse(response.text || "{}") as VideoAnalysisResult;
    return result;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback mock result if API fails or key is missing
    return {
      vehicleCount: Math.floor(Math.random() * 50),
      congestionLevel: CongestionLevel.MEDIUM,
      illegalParkingDetected: Math.random() > 0.7,
      obstructions: []
    };
  }
};
