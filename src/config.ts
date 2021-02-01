const IS_PROD = process.env.NODE_ENV === "production";
export const API_URL = IS_PROD
  ? "https://twitter.slytherin.dev/.netlify/functions"
  : "http://localhost:9000";
export const REFRESH_RATE = 1000 * 3600 * 10;
