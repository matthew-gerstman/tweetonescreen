import { useEffect, useState } from "react";
import { API_URL, REFRESH_RATE } from "./config";

type List = "jokes" | "friends";
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
export const useTweets = () => {
  const [tweets, setTweets] = useState(previousTweets || DEFAULT_TWEETS);

  const updateTweets = (key: List, apiTweets: Tweet[]) => {
    const newTweets = {
      ...tweets,
      [key]: [...apiTweets],
    };
    setTweets(newTweets);
    localStorage.setItem("tweets", JSON.stringify(newTweets));
  };

  useEffect(() => {
    fetchTweets("jokes").then((response) => updateTweets("jokes", response));
    fetchTweets("friends").then((response) =>
      updateTweets("friends", response)
    );

    setInterval(() => {
      fetchTweets("jokes").then((response) => updateTweets("jokes", response));
      fetchTweets("friends").then((response) =>
        updateTweets("friends", response)
      );
    }, REFRESH_RATE);
  }, []);

  console.log({ tweets });
  return (list: List) => {
    return tweets[list] || [];
  };
};
