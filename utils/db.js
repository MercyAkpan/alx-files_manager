// utils/db.js

import mongodb from 'mongodb';

const { MongoClient } = mongodb;

class DBClient {
  constructor() {
    // Set up connection parameters
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Create a new MongoDB client instance
    this.client = new MongoClient(`mongodb://${host}:${port}`);
    this.database = database;
    this.isConnected = false;
  }

  // Function to connect to the MongoDB database
  async connect() {
    try {
      await this.client.connect();
      this.isConnected = true;
      console.log(`Connected to database: ${this.database}`);
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      this.isConnected = false;
    }
  }

  // Check if the connection to MongoDB is alive
  isAlive() {
    return this.isConnected;
  }

  // Asynchronous function to get the number of users
  async nbUsers() {
    if (!this.isAlive()) {
      await this.connect(); // Try to connect if not already connected
    }
    const db = this.client.db(this.database);
    const usersCollection = db.collection('users');
    return usersCollection.countDocuments();
  }

  // Asynchronous function to get the number of files
  async nbFiles() {
    if (!this.isAlive()) {
      await this.connect(); // Try to connect if not already connected
    }
    const db = this.client.db(this.database);
    const filesCollection = db.collection('files');
    return filesCollection.countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();

export default dbClient;
