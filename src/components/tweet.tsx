import {useEffect, useRef, useState} from "react";
import {TWEET_OPTIONS as DEFAULT_TWEET_OPTIONS} from "../config";
export const twitterWidgetJs = "https://platform.twitter.com/widgets.js";

type Options = any;
type Props = {
  /**
   * Tweet id that needs to be shown
   */
  tweetId: number;
  /**
   * Additional options to pass to twitter widget plugin
   */
  options?: Options;
  /**
   * Placeholder while tweet is loading
   */
  placeholder?: string | (() => JSX.Element);
  setTweetReady: () => void;
};

declare global {
  interface Window {
    twttr: Twttr;
  }
}

type Twttr = {
  widgets: {
    createTweet(
      tweetId: number,
      ref: HTMLDivElement,
      options: Options,
    ): Promise<void>;
  };
};

export const Tweet: React.FunctionComponent<Props> = ({
  tweetId,
  placeholder,
  options,
  setTweetReady,
}) => {
  const [isLoading, setLoading] = useState(true);
  const tweetWrapper = useRef<HTMLDivElement>(null);

  const allOptions = {...DEFAULT_TWEET_OPTIONS, options};

  useEffect(() => {
    if (!window?.twttr?.widgets?.createTweet) {
      return;
    }
    if (!tweetWrapper || !tweetWrapper.current) {
      return;
    }

    if (!isLoading) {
      return;
    }

    window.twttr.widgets
      .createTweet(tweetId, tweetWrapper.current, allOptions)
      .then(() => {
        console.log("finished loading", tweetId);
        setLoading(false);
        setTweetReady();
      });
  }, [window.twttr, tweetWrapper.current]);

  return (
    <>
      {isLoading && placeholder}
      <div
        className="tweet-wrapper"
        style={{width: allOptions.width}}
        ref={tweetWrapper}
      />
    </>
  );
};
