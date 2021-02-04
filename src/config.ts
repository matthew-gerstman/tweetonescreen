const IS_PROD = process.env.NODE_ENV === "production";
export const API_URL = IS_PROD
  ? "https://twitter.slytherin.dev/.netlify/functions"
  : "http://localhost:9000";
export const REFRESH_RATE = 1000 * 3600 * 10;
export const TICK_RATE = 1000 * 10;

const urlParams = new URLSearchParams(window.location.search);

const urlWidth = urlParams.get("width");
export const TWEET_OPTIONS = {
  // https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference
  width: 400,
  theme: "dark",
  // align: 'center', // right | center | left
  // conversation, // none
};
export const BACKGROUND =
  process.env.NODE_ENV !== "production" ? "black" : undefined;

const REFRESH_WINDOW = IS_PROD;

if (REFRESH_WINDOW) {
  setTimeout(() => location.reload(), 1000);
}
