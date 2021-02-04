import {useEffect, useRef, useState} from "react";
import {API_URL, REFRESH_RATE} from "./config";

export type List = "jokes" | "friends";
type Tweet = any;
async function fetchTweets(list: List) {
  return fetch(`${API_URL}/twitter?list=${list}`).then(async (response) => {
    const tweets = await response.json();
    return Object.values(tweets.tweets);
  });
}

const previousTweetsString = localStorage.getItem("tweets");
const previousTweets = previousTweetsString && JSON.parse(previousTweetsString);
const DEFAULT_TWEETS = {
  jokes: [],
  friends: [],
};
export const useTweets = (key: List) => {
  const [tweets, setTweets] = useState(previousTweets || DEFAULT_TWEETS);

  const updateTweets = (apiTweets: Tweet[]) => {
    const newTweets = {
      ...tweets,
      [key]: [...apiTweets],
    };
    setTweets(newTweets);
    localStorage.setItem("tweets", JSON.stringify(newTweets));
  };

  const lastPoll = useRef(new Date());
  useEffect(() => {
    fetchTweets(key).then((response) => updateTweets(response));

    setInterval(() => {
      lastPoll.current = new Date();
      fetchTweets(key).then((response) => updateTweets(response));
    }, REFRESH_RATE);
  }, []);

  return {
    getLastPoll: () => {
      return lastPoll.current;
    },
    getTweets: () => {
      return tweets[key] || [];
    },
  };
};
