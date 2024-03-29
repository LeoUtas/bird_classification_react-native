import OpenAI from "openai";

import {
    BIRD_CLASSIFICATION_OPENAI_API_KEY,
    model_text_generation,
} from "@env";

const modelTextGeneration = model_text_generation;
const role = "assistant";
const personality = "professional";
const note = "";

export default async function fetchSpeciesToAIService(species) {
    const API_KEY = BIRD_CLASSIFICATION_OPENAI_API_KEY;

    const openai = new OpenAI({ apiKey: API_KEY });

    const prompt = `You are a ${personality} zoologist, telling a fun fact about a bird species, ${species}.${note}`;

    try {
        const response = await openai.chat.completions.create({
            messages: [
                {
                    role: role,
                    content: prompt,
                },
            ],
            model: modelTextGeneration,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching species to server:", error);
    }
}
