import { useEffect, useState } from 'react';
import './App.css';
import {useTweets} from './tweets';
const {TwitterTweetEmbed} = require('react-twitter-embed');

function App() {
  const getTweets = useTweets();  
  const [tweetNum, setTweetNum] = useState(0);  
  const tick = () => {
    console.log('tick', tweetNum)
    setTweetNum(tweetNum+1)
  }

  const friends = getTweets("friends");  
  

  const getTweetId = (tweetNum: number) => {
    if (tweetNum < 0) {
      tweetNum = 0;
    }

    tweetNum = tweetNum % friends.length;
    

    return friends[tweetNum] && (friends[tweetNum] as any).id_str 
  }

  useEffect(() => {    
    const interval = setInterval(tick, 5000)
    return () => {
      clearInterval(interval);
    }
  })



  return (
    <div className="app">
      {[0, 1, 2].map(delta => {
        const tweetId = getTweetId(tweetNum + delta);        
        return <TwitterTweetEmbed key={tweetId} tweetId={tweetId} />;
      })}
    </div>

  );
}

export default App;
