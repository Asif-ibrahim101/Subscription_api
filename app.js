/**
 * MAIN APPLICATION FILE (app.js)
 * 
 * This is the entry point of our Subscription Tracker API.
 * It sets up the Express server, configures middleware, 
 * defines routes, and starts the database connection.
 */

// ============= IMPORTS =============
// Core Dependencies
import express from "express";                    // Web framework for Node.js
import cookieParser from "cookie-parser";         // Middleware to parse cookies from requests

// Configuration and Database
import { PORT } from "./config/env.js";           // Import port from environment config
import { connectDB } from "./database/mongodb.js"; // Database connection function
import errorMiddleware from "./middlewares/error.middleware.js"; // Global error handler

// Route Imports - Organizing routes by feature/resource
import authRouter from "./routes/auth.routes.js";         // Authentication routes (signup, signin, signout)
import userRouter from "./routes/user.routes.js";         // User management routes (CRUD operations)
import subscriptionRouter from "./routes/subscription.routes.js"; // Subscription management routes

// ============= APP INITIALIZATION =============
// Create Express application instance
const app = express();

// ============= MIDDLEWARE CONFIGURATION =============
// Middleware executes in the order it's defined - ORDER MATTERS!

// 1. Body Parser Middleware
// Parses incoming JSON requests and makes data available in req.body
app.use(express.json());
// Parses URL-encoded data (from forms) and makes it available in req.body
// extended: true allows parsing of rich objects and arrays
app.use(express.urlencoded({ extended: true }));

// 2. Cookie Parser Middleware
// Parses cookies from incoming requests and makes them available in req.cookies
// Useful for storing JWT tokens in HTTP-only cookies for security
app.use(cookieParser());

// ============= API ROUTES =============
// Mount route handlers at specific paths
// All auth routes will be prefixed with '/api/v1/auth'
app.use('/api/v1/auth', authRouter);
// All user routes will be prefixed with '/api/v1/users'
app.use('/api/v1/users', userRouter);
// All subscription routes will be prefixed with '/api/v1/subscriptions'
app.use('/api/v1/subscriptions', subscriptionRouter);

// ============= ERROR HANDLING =============
// Global error handling middleware - must be last middleware
// Catches any errors that occur in route handlers or other middleware
app.use(errorMiddleware);

// ============= BASIC ROUTES =============
// Root route - simple health check endpoint
app.get("/", (req, res)=> {
    res.send("Hello World");
});

// ============= SERVER STARTUP =============
// Start the Express server and connect to database
app.listen(PORT, async()=> {
    // Log server startup information
    console.log(`the server is running on the port ${PORT}`);
    console.log(`http://localhost:${PORT}`);

    // Connect to MongoDB database
    // Using await to ensure database connection before server accepts requests
    await connectDB();
});

// Export the app instance for testing or external use
export default app;