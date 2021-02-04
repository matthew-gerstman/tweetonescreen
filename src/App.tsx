import {useEffect, useState} from "react";
import classNames from "classnames";
import "./App.css";
import {BACKGROUND, TICK_RATE} from "./config";
import {List, useReadyTweets, useTweets} from "./hooks";
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

  const {isTweetReady, setTweetReady} = useReadyTweets();

  const tweets = getTweets();
  const getTweetId = (tweetNum: number) => {
    if (tweetNum < 0) {
      tweetNum = 0;
    }

    tweetNum = tweetNum % tweets.length;
    return tweets[tweetNum] && (tweets[tweetNum] as any).id_str;
  };

  const [tweetNum, setTweetNum] = useState(0);
  const tick = () => {
    console.log("tick");
    const tweetId = getTweetId(tweetNum + 1);
    if (!isTweetReady(tweetId)) {
      return;
    }
    setTweetNum(tweetNum + 1);
  };

  const lastPoll = getLastPoll();

  useEffect(() => {
    setTweetNum(0);
  }, [lastPoll]);

  useEffect(() => {
    const interval = setInterval(tick, TICK_RATE);
    return () => {
      clearInterval(interval);
    };
  });
  console.log({tweetNum});
  const currentTweetId = getTweetId(tweetNum);

  return (
    <div className="app center" style={BACKGROUND && {background: BACKGROUND}}>
      <Tweet
        key={`current-${currentTweetId}`}
        tweetId={currentTweetId}
        setTweetReady={() => setTweetReady(currentTweetId)}
      />
      {[...new Array(5)].map((_, delta) => {
        const tweetNumDelta = tweetNum + delta;
        if (tweetNumDelta < 0) {
          return null;
        }
        const tweetId = getTweetId(tweetNumDelta);
        return (
          <div className="hidden-tweet" key={tweetId}>
            <Tweet
              key={tweetId}
              tweetId={tweetId}
              setTweetReady={() => setTweetReady(tweetId)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
