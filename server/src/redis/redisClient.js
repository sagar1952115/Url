const { createClient } = require("redis");

const dotenv = require("dotenv");
dotenv.config();

const password = process.env.REDIS_PASSWORD;
console.log("this is passdfads", password);
const redisClient = createClient({
  password: password,
  socket: {
    host: "redis-11207.c277.us-east-1-3.ec2.redns.redis-cloud.com",
    port: 11207,
  },
});

// Connect to the Redis client
// client.on('error', (err) => console.error('Redis Client Error', err));

// async function incrementCounter(counterName) {
//     const newValue = await client.incr(counterName);
//     return newValue;
// }

// async function getCounterValue(counterName) {
//     const value = await client.get(counterName);
//     return value;
// }

// async function init() {
//     await client.connect();
//     console.log('Connected to Redis');
// }

// module.exports={init,getCounterValue,incrementCounter,client}

// Connect to the Redis client
redisClient.on("error", (error) => {
  console.error("Redis error:", error);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis successfully");
});

// Initialize Redis connection
async function init() {
  await redisClient.connect();
}

// Function to increment the counter
async function incrementCounter(counterName) {
  const newValue = await redisClient.incr(counterName);
  return newValue;
}

// Function to get the current value of the counter
async function getCounterValue(counterName) {
  const value = await redisClient.get(counterName);
  return value;
}

// Export functions and the client
module.exports = {
  init,
  getCounterValue,
  incrementCounter,
  redisClient,
};
