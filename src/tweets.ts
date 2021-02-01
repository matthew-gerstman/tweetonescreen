import { useEffect, useState } from "react";
import { REFRESH_RATE } from "./config";

type List = "jokes" | "friends";
type Tweet = any;
async function fetchTweets(list: List) {
  return fetch(`http://localhost:9000/twitter?list=${list}`).then(
    async (response) => {
      const tweets = await response.json();
      return Object.values(tweets.tweets);
    }
  );
}

const previousTweetsString = null; // localStorage.getItem("tweets");
const previousTweets = previousTweetsString && JSON.parse(previousTweetsString);
const DEFAULT_TWEETS = {
  jokes: [],
  friends: [],
};
export const useTweets = () => {
  const [tweets, setTweets] = useState(DEFAULT_TWEETS);

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
