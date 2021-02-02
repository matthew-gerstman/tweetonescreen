import { useEffect, useState } from "react";
import "./App.css";
import { List, useTweets } from "./tweets";
const { TwitterTweetEmbed } = require("react-twitter-embed");

function getList(): List {
  const urlParams = new URLSearchParams(window.location.search);
  const jokes = urlParams.get("jokes");
  if (jokes || jokes === "") {
    return "jokes";
  }

  return "friends";
}

function App() {
  const key = getList();

  const { getTweets, getLastPoll } = useTweets(key);
  const [tweetNum, setTweetNum] = useState(0);
  const tick = () => {
    setTweetNum(tweetNum + 1);
  };

  const lastPoll = getLastPoll();

  useEffect(() => {
    console.log({ lastPoll });
    setTweetNum(0);
  }, [lastPoll]);

  const friends = getTweets();
  const getTweetId = (tweetNum: number) => {
    if (tweetNum < 0) {
      tweetNum = 0;
    }

    tweetNum = tweetNum % friends.length;

    return friends[tweetNum] && (friends[tweetNum] as any).id_str;
  };

  useEffect(() => {
    const interval = setInterval(tick, 5000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="app">
      {[0, 1, 2].map((delta) => {
        const tweetId = getTweetId(tweetNum + delta);
        return <TwitterTweetEmbed key={tweetId} tweetId={tweetId} />;
      })}
    </div>
  );
}

export default App;
