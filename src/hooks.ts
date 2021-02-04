import {useEffect, useReducer, useRef, useState} from "react";
import {API_URL, REFRESH_RATE} from "./config";
import {KnownList} from "./lambda/twitter";

export type List = KnownList;

type Tweet = any;
async function fetchTweets(list: List) {
  return fetch(`${API_URL}/twitter?list=${list}`).then(async (response) => {
    const tweets = await response.json();
    return Object.values(tweets.tweets);
  });
}

function getLocalStorageKey(key: string) {
  return `tweets-${key}`;
}

const preloadedLocalStorage: {[key in KnownList]?: Tweet[]} = {};

const getLocalStorageTweets = (key: KnownList): Tweet[] => {
  const preloadedVal = preloadedLocalStorage[key];
  if (preloadedVal !== undefined) {
    return preloadedVal;
  }
  const previousTweetsString = localStorage.getItem(getLocalStorageKey(key));
  const previousTweets =
    previousTweetsString && JSON.parse(previousTweetsString);

  preloadedLocalStorage[key] = previousTweets;
  return previousTweets;
};

function readyTweetsReducer(state: {[key: string]: boolean}, tweetId: string) {
  return {
    ...state,
    [tweetId]: true,
  };
}

export function useReadyTweets() {
  const [readyTweets, addTweet] = useReducer(readyTweetsReducer, {});
  return {
    isTweetReady: (tweetId: string): boolean => {
      console.log("isTweetReady", {
        readyTweets,
        tweetId,
        val: readyTweets[tweetId],
      });
      return readyTweets[tweetId] ?? false;
    },
    setTweetReady: (tweetId: string) => {
      console.log("setTweetReady", tweetId);
      addTweet(tweetId);
    },
  };
}

const DEFAULT_TWEETS: Tweet[] = [];
export const useTweets = (key: List) => {
  const previousTweets = getLocalStorageTweets(key);
  const [tweets, setTweets] = useState(previousTweets || DEFAULT_TWEETS);

  const updateTweets = (apiTweets: Tweet[]) => {
    const newTweets = [...apiTweets];
    setTweets(newTweets);
    localStorage.setItem(getLocalStorageKey(key), JSON.stringify(newTweets));
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
      return tweets || [];
    },
  };
};
