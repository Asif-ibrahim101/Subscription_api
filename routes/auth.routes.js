/**
 * AUTHENTICATION ROUTES (routes/auth.routes.js)
 * 
 * This file defines all authentication-related routes for the application.
 * These routes handle user registration, login, and logout functionality.
 * 
 * Route Structure:
 * - All routes are prefixed with '/api/v1/auth' (defined in app.js)
 * - Uses POST method for all auth operations (security best practice)
 * - Each route is connected to a corresponding controller function
 */

// Import Express Router for creating modular route handlers
import { Router } from "express";
// Import authentication controller functions
import { signup, signin, signout } from "../controllers/auth.controller.js";

// ============= ROUTER INITIALIZATION =============
// Create a new router instance for authentication routes
const authRouter = Router();

// ============= AUTHENTICATION ROUTES =============

/**
 * USER REGISTRATION ROUTE
 * 
 * Method: POST
 * Full URL: POST /api/v1/auth/sign-up
 * Purpose: Register a new user account
 * 
 * Expected Request Body:
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com", 
 *   "password": "securePassword123"
 * }
 * 
 * Expected Response (Success):
 * {
 *   "message": "User created successfully",
 *   "user": { user object without password },
 *   "token": "JWT_TOKEN_HERE",
 *   "success": true
 * }
 */
authRouter.post("/sign-up", signup);

/**
 * USER LOGIN ROUTE
 * 
 * Method: POST
 * Full URL: POST /api/v1/auth/sign-in
 * Purpose: Authenticate existing user and provide access token
 * 
 * Expected Request Body:
 * {
 *   "email": "john@example.com",
 *   "password": "securePassword123"
 * }
 * 
 * Expected Response (Success):
 * {
 *   "message": "User signed in successfully",
 *   "data": {
 *     "user": { user object without password },
 *     "token": "JWT_TOKEN_HERE",
 *     "success": true
 *   }
 * }
 */
authRouter.post("/sign-in", signin);

/**
 * USER LOGOUT ROUTE
 * 
 * Method: POST
 * Full URL: POST /api/v1/auth/sign-out
 * Purpose: Log out the authenticated user
 * 
 * Note: Currently not fully implemented
 * JWT tokens are stateless, so logout typically involves:
 * - Clearing client-side token storage
 * - Adding token to server-side blacklist (optional)
 * - Clearing HTTP-only cookies if used
 * 
 * Expected Response (Success):
 * {
 *   "message": "User signed out successfully",
 *   "success": true
 * }
 */
authRouter.post("/sign-out", signout);

// Export the router to be used in the main application
export default authRouter;

/**
 * ROUTE TESTING EXAMPLES:
 * 
 * Register a new user:
 * curl -X POST http://localhost:3000/api/v1/auth/sign-up \
 *   -H "Content-Type: application/json" \
 *   -d '{"name":"John Doe","email":"john@test.com","password":"password123"}'
 * 
 * Login with existing user:
 * curl -X POST http://localhost:3000/api/v1/auth/sign-in \
 *   -H "Content-Type: application/json" \
 *   -d '{"email":"john@test.com","password":"password123"}'
 * 
 * Logout user:
 * curl -X POST http://localhost:3000/api/v1/auth/sign-out
 */ 