let leftBorder = 15;
let rightColumn = 255;
let fullWidth = 470;
let w = 230;
let h = 80;
let y = 40;
["600a0d1036984f5bb916ade4", "600a107b36984f0490599a79", "600a109cacf030540e444b17", "600a3916acf030204e5c4d93"].forEach((id) => {
    y+=90;
    fetch("https://dakboard.com/screens/blockResizeMove", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://dakboard.com/screens/edit/id/194213",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `id=${id}&w=${w}px&h=${h}px&x=${leftBorder}&y=${y}&screen_id=194213`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      });
})

// the onion
y=490;
fetch("https://dakboard.com/screens/blockResizeMove", {
    "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://dakboard.com/screens/edit/id/194213",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": `id=600a10bccd8a2846b51d9d32&w=${w}px&h=150px&x=${leftBorder}&y=${y}&screen_id=194213`,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
});





// Calendar
fetch("https://dakboard.com/screens/blockResizeMove", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://dakboard.com/screens/edit/id/194213",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": `id=600a0b74cd8a287acd40d2a4&w=230px&h=640px&x=${rightColumn}&y=130&screen_id=194213`,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});

let tweetHeight = 120;
let tweetWidth = 110;
let fuzzyTweetWidth = 115;
let tweetSpacing = 20;
let tweetsTop = 650;
[
  // Jokes
  [  "600a5197acf03007f37ca5b2",
  "601b50dbacf03036985085c3",
  ],
  // Tweets
  [
    "601491d9cd8a282a7c69b516",
    "601b40f20f6c137f9107de72",
  ]
].forEach((blockIds, index) => {  
    let x = leftBorder + (index*(fuzzyTweetWidth));
    console.log({index, x})
    blockIds.forEach(blockId => {
      fetch("https://dakboard.com/screens/blockResizeMove", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://dakboard.com/screens/edit/id/194213",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `id=${blockId}&w=${tweetWidth}px&h=${tweetHeight}px&x=${x}&y=${tweetsTop}&screen_id=194213`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      });
    })
})
// Weather
fetch("https://dakboard.com/screens/blockResizeMove", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://dakboard.com/screens/edit/id/194213",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": `id=600a0b74cd8a287acd40d2a6&w=${fullWidth}px&h=${h+30}px&x=${leftBorder}&y=780&screen_id=194213`,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});

// Datetime
fetch("https://dakboard.com/screens/blockResizeMove", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://dakboard.com/screens/edit/id/194213",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": `id=600a0b74cd8a287acd40d2a3&w=${fullWidth}px&h=${110}px&x=${leftBorder}&y=${10}&screen_id=194213`,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});