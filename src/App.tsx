import {useEffect, useState} from "react";
import "./App.css";
import {BACKGROUND, TICK_RATE} from "./config";
import {List, useTweets} from "./tweets";
import {Tweet} from "./components/tweet";

function getList(): List {
  const urlParams = new URLSearchParams(window.location.search);

  const jokes = urlParams.get("jokes");
  if (jokes || jokes === "") {
    return "jokes";
  }

  const rtfriends = urlParams.get("rtfriends");
  if (rtfriends || rtfriends === "") {
    return "rtfriends";
  }

  return "friends";
}

function App() {
  const key = getList();

  const {getTweets, getLastPoll} = useTweets(key);
  const [tweetNum, setTweetNum] = useState(0);
  const tick = () => {
    setTweetNum(tweetNum + 1);
  };

  const lastPoll = getLastPoll();

  useEffect(() => {
    console.log({lastPoll});
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
    const interval = setInterval(tick, TICK_RATE);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="app" style={BACKGROUND && {background: BACKGROUND}}>
      {[0, 1, 2].map((delta) => {
        const tweetId = getTweetId(tweetNum + delta);
        return <Tweet key={tweetId} tweetId={tweetId} />;
      })}
    </div>
  );
}

export default App;
