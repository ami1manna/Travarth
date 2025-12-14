import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_API;
const genAI = new GoogleGenerativeAI(geminiApiKey);
const genAIModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export default genAIModel;
