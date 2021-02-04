require("@babel/polyfill/noConflict");
import {Handler, Context, Callback, APIGatewayEvent} from "aws-lambda";
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
  include_rts?: boolean;
};

const KnownList = ["jokes", "friends", "rtfriends"];
export type KnownList = "jokes" | "friends" | "rtfriends";
type Lists = {
  [key in KnownList]: List;
};

const friends = {
  owner_screen_name: "MatthewGerstman",
  slug: "friends-15058",
};
const lists: Lists = {
  friends,
  jokes: {
    owner_screen_name: "MatthewGerstman",
    slug: "jokes-85882",
  },
  rtfriends: {
    ...friends,
    include_rts: true,
  },
};

export async function fetchTweetsForList(list: KnownList) {
  try {
    const tweets = await client.get(`lists/statuses.json`, {
      count: 500,
      include_rts: false,
      ...(lists[list] || {}),
    });
    return tweets;
  } catch (e) {
    console.error({e});
  }
}

function isKnownList(list: string): list is KnownList {
  return KnownList.includes(list);
}

export const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  const list = event.queryStringParameters && event.queryStringParameters.list;
  if (!list) {
    return callback(null, {statusCode: 400, body: "No list"});
  }

  if (!isKnownList(list)) {
    return callback(null, {statusCode: 400, body: "Invalid list"});
  }

  fetchTweetsForList(list)
    .then((tweets) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({tweets}),
        headers: {"Access-Control-Allow-Origin": "*"},
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
