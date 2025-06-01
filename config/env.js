/**
 * ENVIRONMENT CONFIGURATION FILE (config/env.js)
 * 
 * This file handles loading and exporting environment variables
 * from .env files based on the current environment (development, production, etc.)
 * 
 * Environment variables are used to store sensitive data and configuration
 * that shouldn't be hardcoded in the application.
 */

// Import the config function from dotenv package
// dotenv loads environment variables from .env files into process.env
import { config } from "dotenv";

// ============= LOAD ENVIRONMENT VARIABLES =============
// Load environment variables from .env file based on NODE_ENV
// Examples:
// - If NODE_ENV is "development", loads from .env.development
// - If NODE_ENV is "production", loads from .env.production  
// - If NODE_ENV is not set, defaults to "development"
config({ path: `.env.${process.env.NODE_ENV || "development"}` });

// ============= EXPORT ENVIRONMENT VARIABLES =============
// Extract and export specific environment variables from process.env
// Using destructuring to pull out the variables we need
export const {
    PORT,          // Server port number (e.g., 3000, 8080)
    NODE_ENV,      // Environment type (development, production, test)
    MONGODB_URL,   // MongoDB connection string (e.g., mongodb://localhost:27017/db_name)
    JWT_SECRET,    // Secret key for signing JWT tokens (should be long and random)
    JWT_EXPERIES   // JWT token expiration time (e.g., "7d", "24h", "30m")
} = process.env;

/**
 * EXAMPLE .env.development FILE CONTENT:
 * 
 * PORT=3000
 * NODE_ENV=development
 * MONGODB_URL=mongodb://localhost:27017/subscription_tracker_dev
 * JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
 * JWT_EXPERIES=7d
 * 
 * SECURITY NOTES:
 * - Never commit .env files to version control
 * - Use different values for development and production
 * - JWT_SECRET should be a long, random string
 * - Keep sensitive data (passwords, API keys) in environment variables
 */

