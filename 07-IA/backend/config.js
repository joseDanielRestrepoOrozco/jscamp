process.loadEnvFile();

export const DEFAULTS = {
  PORT: 3000,
  LIMIT_OFFSET: 0,
  LIMIT_PAGINATION: 10,
};

export const CONFIG = {
  MODEL_AI: process.env.MODEL_AI || "gpt-5.2",
  BASE_URL_AI: process.env.BASE_URL_AI,
  AI_API_KEY: process.env.AI_API_KEY,
};
