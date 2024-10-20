const { incrementCounter } = require("../redis/redisClient.js");
// const Url = require('./models/Url'); // Assuming you have a Url model

const base62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function encodeBase62(n) {
  let shortCode = "";
  while (n > 0) {
    shortCode = base62[n % 62] + shortCode;
    n = Math.floor(n / 62);
  }
  return shortCode.padStart(5, "a");
}

async function generateShortCode() {
  try {
    const counter = await incrementCounter("url_counter");
    return encodeBase62(counter);
  } catch (error) {
    console.error("Redis error:", error);
  }
}

async function createShortUrl(longUrl) {
  let shortCode;
  shortCode = await generateShortCode();
  if (shortCode==="zzzzz"){
    console.log("last one reached")
  } return shortCode;
}

module.exports = { createShortUrl };
