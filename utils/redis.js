import { createClient } from 'redis';

class RedisClient {
  constructor() {
    // Create a Redis client
    this.client = createClient();

    // Handle connection errors
    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    // Connect to Redis server
    this.client.connect()
      // .then(() => console.log('Connected to Redis'))
      .catch((err) => console.error('Error connecting to Redis:', err));
  }

  // Function to check if Redis is alive
  isAlive() {
    return this.client.isOpen;
  }

  // Asynchronous function to get a value from Redis
  async get(key) {
    return this.client.get(key);
  }

  // Asynchronous function to set a value in Redis with expiration
  async set(key, value, duration) {
    await this.client.set(key, value, {
      EX: duration, // Set expiration in seconds
    });
    // console.log(`Set key ${key} with value ${value} for ${duration} seconds`);
  }

  // Asynchronous function to delete a key from Redis
  async del(key) {
    await this.client.del(key);
    console.log(`Deleted key ${key}`);
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
