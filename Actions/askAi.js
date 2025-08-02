"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function askAI(_, formData) {
  const userQuestion = formData.get("question");

  if (!userQuestion) {
    return { success: false, error: "Please enter a question." };
  }

  const prompt = `
You are an intelligent assistant. Provide a clear, helpful, and concise answer to the following question:

Question: "${userQuestion}"

Rules:
- Keep the answer under 200 words.
- Use simple and friendly language.
- If the question is unclear or inappropriate, politely ask for clarification.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().trim();

    return { success: true, answer: text };
  } catch (err) {
    console.error("Gemini Error:", err);
    return { success: false, error: "Failed to get answer. Please try again." };
  }
}
