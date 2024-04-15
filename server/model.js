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
  _chat: {},

  /**
   * Initialize the chat session with the PDF excerpt
   *
   * @param {string} startingMessage - The excerpt from the PDF
   */
  startChat(startingMessage) {
    this._chat = model.startChat({
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

  /**
   * Answer a question based on the information provided in the PDF
   *
   * @param {string} question - The question to be asked based on the PDF
   * @returns {string} The answer to the above question
   */
  async answer(question) {
    const result = await this._chat.sendMessage(question);
    const response = await result.response;

    return response.text();
  },
};

export default Model;
