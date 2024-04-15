import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  createInitialPrompt,
  INITIAL_MODEL_MESSAGE,
  MODEL_ROLES,
} from "./constants.js";

const model = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
).getGenerativeModel({ model: "gemini-pro" });

const Model = {
  chat: {},

  startChat(startingMessage) {
    this.chat = model.startChat({
      history: [
        {
          role: MODEL_ROLES.USER,
          parts: [
            {
              text: createInitialPrompt(startingMessage),
            },
          ],
        },
        {
          role: MODEL_ROLES.MODEL,
          parts: [
            {
              text: INITIAL_MODEL_MESSAGE,
            },
          ],
        },
      ],

      generationConfig: {
        maxOutputTokens: 100,
      },
    });
  },

  askQuestion(question) {
    console.log(this.chat);
  },
};

export default Model;
