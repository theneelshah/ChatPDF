export const MODEL_ROLES = { USER: "user", MODEL: "model" };

export const createInitialPrompt = (message) =>
  "I'll be giving you an excerpt from a PDF file. " +
  "Don't use any other content or any of you pre-fed knowledge from other sources. " +
  "Please use only the data that I feed you. " +
  "Later on, I'll be asking you some questions based on the data I provided. " +
  "I need you to answer those questions for me. " +
  "The excerpt will start and end with triple backticks (```). " +
  " The data is: " +
  `\`\`\` ${message} \`\`\``;

export const INITIAL_MODEL_MESSAGE =
  "Hey there! I'm ready to go. Ask me whatever you want to know ";
