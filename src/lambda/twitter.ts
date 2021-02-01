require("@babel/polyfill/noConflict");
import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda";
import Twitter from "twitter";

const CONSUMER_KEY = "SO2dX07BmPjvLCLXoIiMHfcSZ";
const CONSUMER_SECRET = "cWlJ8jQNwIrm71GEuAnnJ8PX1vtPaUhDfHbQFN29AjFSTpNzEW";
const BEARER_TOKEN =
  "AAAAAAAAAAAAAAAAAAAAAIW69gAAAAAAVGVfgCN%2Fe89eooseSAVb47VgMQg%3DS6GFEm7XPhkFIfXHkTi4ZbzlMKi5gYi4lQPoXgLzCOzggVcuh7";

const client = new Twitter({
  consumer_secret: CONSUMER_SECRET,
  consumer_key: CONSUMER_KEY,
  bearer_token: BEARER_TOKEN,
});

type List = {
  owner_screen_name: string;
  slug: string;
};

type KnownList = "friends" | "jokes";
type Lists = {
  [key: string]: List;
};

const lists: Lists = {
  friends: {
    owner_screen_name: "MatthewGerstman",
    slug: "friends-15058",
  },
  jokes: {
    owner_screen_name: "MatthewGerstman",
    slug: "jokes-85882",
  },
};

const knownLists = Object.keys(lists) as KnownList[];

export async function fetchTweetsForList(list: string) {
  try {
    const tweets = await client.get(`lists/statuses.json?limit=10`, {
      ...(lists[list] || {}),
    });
    if (list === "jokes") {
      return tweets;
    } else {
      return tweets.filter((tweet: any) => tweet.retweeted_status == null);
    }
  } catch (e) {
    console.error({ e });
  }
}

export const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const list = event.queryStringParameters && event.queryStringParameters.list;
  if (!list) {
    return callback(null, { statusCode: 400, body: "No list" });
  }

  fetchTweetsForList(list)
    .then((tweets) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ tweets }),
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    })
    .catch((e) => {
      callback(null, {
        statusCode: 500,
        body: e,
      });
    });
};

// list=11673867920829f76768
