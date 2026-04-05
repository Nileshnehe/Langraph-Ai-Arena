import { ChatGoogle } from "@langchain/google";
import { MistralAI } from "@langchain/mistralai";
import { Cohere } from "@langchain/cohere";
import config from "../config/config.js";

export const geminiModel = new ChatGoogle({
    model: "gemini-flash-latest",
    apiKey: config.GEMINI_API_KEY
});




export const mistralModel = new MistralAI({
    model: "mistral-medium-latest",
    apiKey: config.MISTRAL_API_KEY
});

export const cohereModel = new Cohere({
    model: "command-a-03-2025",
    apiKey: config.COHERE_API_KEY
})