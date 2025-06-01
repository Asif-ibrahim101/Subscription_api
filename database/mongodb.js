/**
 * DATABASE CONNECTION FILE (database/mongodb.js)
 * 
 * This file handles the MongoDB database connection using Mongoose.
 * Mongoose is an Object Document Mapper (ODM) that provides a schema-based
 * solution for modeling application data with MongoDB.
 */

// Import mongoose for MongoDB connection and operations
import mongoose from "mongoose";
// Import environment variables for database configuration
import { MONGODB_URL, NODE_ENV } from "../config/env.js";

// ============= ENVIRONMENT VALIDATION =============
// Check if MongoDB URL is provided in environment variables
// This prevents the app from starting with invalid database configuration
if(!MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined");
};

// ============= DATABASE CONNECTION FUNCTION =============
/**
 * Establishes connection to MongoDB database
 * 
 * @returns {Promise<void>} - Resolves when connection is successful
 * 
 * Connection Features:
 * - Uses Mongoose for ODM (Object Document Mapping)
 * - Handles connection errors gracefully
 * - Logs connection status for debugging
 */
export const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the connection string
        // mongoose.connect() returns a Promise that resolves when connected
        await mongoose.connect(MONGODB_URL);
        
        // Log successful connection for debugging and monitoring
        console.log("Connected to MongoDB");
        console.log(`Environment: ${NODE_ENV}`);
        console.log(`Database: ${MONGODB_URL.split('/').pop()}`); // Show only database name
        
    } catch (error) {
        // Log connection errors for debugging
        console.error("MongoDB connection error:", error);
        
        // In production, you might want to exit the process on connection failure
        // process.exit(1);
    }
};

/**
 * MONGOOSE CONNECTION EVENTS
 * 
 * Mongoose emits several events during connection lifecycle:
 * - 'connected': When connection is established
 * - 'error': When connection error occurs
 * - 'disconnected': When connection is lost
 * 
 * You can listen to these events for better monitoring:
 * 
 * mongoose.connection.on('connected', () => {
 *     console.log('Mongoose connected to MongoDB');
 * });
 * 
 * mongoose.connection.on('error', (err) => {
 *     console.error('Mongoose connection error:', err);
 * });
 * 
 * mongoose.connection.on('disconnected', () => {
 *     console.log('Mongoose disconnected from MongoDB');
 * });
 */