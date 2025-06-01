/**
 * USER ROUTES (routes/user.routes.js)
 * 
 * This file defines all user-related routes for the application.
 * These routes handle user profile management, user data retrieval,
 * and user account operations.
 * 
 * Route Structure:
 * - All routes are prefixed with '/api/v1/users' (defined in app.js)
 * - Uses RESTful conventions (GET, POST, PUT, DELETE)
 * - Some routes require authentication middleware
 */

// Import Express Router for creating modular route handlers
import { Router } from "express";
// Import user controller functions that contain the business logic
import { getUserProfile, getSingleUser } from "../controllers/user.controller.js";
// Import authentication middleware to protect routes that require login
import authorize from "../middlewares/auth.middleware.js";

// ============= ROUTER INITIALIZATION =============
// Create a new router instance for user routes
const userRouter = Router();

// ============= USER ROUTES =============

/**
 * GET USER PROFILE ROUTE (Authenticated User's Own Profile)
 * 
 * Method: GET
 * Full URL: GET /api/v1/users/
 * Purpose: Get the authenticated user's own profile information
 * Authentication: Required (JWT token needed)
 * 
 * Headers Required:
 * Authorization: Bearer JWT_TOKEN_HERE
 * 
 * Expected Response (Success):
 * {
 *   "message": "User profile fetched successfully",
 *   "data": {
 *     "user": { user object without password },
 *     "success": true
 *   }
 * }
 */
userRouter.get("/", getUserProfile);

/**
 * GET SINGLE USER BY ID ROUTE (Public Profile)
 * 
 * Method: GET
 * Full URL: GET /api/v1/users/:id
 * Purpose: Get any user's public profile information by their ID
 * Authentication: Required (uses authorize middleware)
 * URL Parameter: id - MongoDB ObjectId of the user
 * 
 * Example: GET /api/v1/users/64f8a1b2c3d4e5f6a7b8c9d0
 * 
 * Expected Response (Success):
 * {
 *   "message": "User fetched successfully",
 *   "data": {
 *     "user": { user object without password },
 *     "success": true
 *   }
 * }
 */
userRouter.get("/:id", authorize, getSingleUser);

/**
 * CREATE USER ROUTE (Currently Not Implemented)
 * 
 * Method: POST
 * Full URL: POST /api/v1/users/
 * Purpose: Create a new user (administrative function)
 * 
 * Note: User creation is typically handled through the auth/sign-up route.
 * This route could be used for admin-created accounts or bulk user imports.
 * 
 * TODO: Implement createUser controller function
 * - Validate admin permissions
 * - Validate input data
 * - Hash password
 * - Create user in database
 * - Return user data (without password)
 */
userRouter.post("/", (req, res)=> {
    res.send("create user");
});

/**
 * UPDATE USER ROUTE (Currently Not Implemented)
 * 
 * Method: PUT
 * Full URL: PUT /api/v1/users/:id
 * Purpose: Update user information
 * Authentication: Required - user can only update their own profile
 * URL Parameter: id - MongoDB ObjectId of the user
 * 
 * TODO: Implement updateUser controller function
 * - Verify user owns the profile or has admin rights
 * - Validate input data
 * - Hash password if being updated
 * - Update user in database
 * - Return updated user data
 * 
 * Expected Request Body:
 * {
 *   "name": "Updated Name",
 *   "email": "updated@example.com"
 * }
 */
userRouter.put("/:id", (req, res)=> {
    res.send("update user");
});

/**
 * DELETE USER ROUTE (Currently Not Implemented)
 * 
 * Method: DELETE
 * Full URL: DELETE /api/v1/users/:id
 * Purpose: Delete user account
 * Authentication: Required - user can only delete their own account
 * URL Parameter: id - MongoDB ObjectId of the user
 * 
 * TODO: Implement deleteUser controller function
 * - Verify user owns the account or has admin rights
 * - Require password confirmation for security
 * - Delete associated data (subscriptions, etc.)
 * - Delete user from database
 * - Return confirmation message
 * 
 * Security Considerations:
 * - Should require password confirmation
 * - Should soft-delete rather than hard-delete for data integrity
 * - Should clean up related data or mark it as orphaned
 */
userRouter.delete("/:id", (req, res)=> {
    res.send("delete user");
});

// Export the router to be used in the main application
export default userRouter;

/**
 * ROUTE TESTING EXAMPLES:
 * 
 * Get own profile (requires token):
 * curl -X GET http://localhost:3000/api/v1/users/ \
 *   -H "Authorization: Bearer YOUR_JWT_TOKEN"
 * 
 * Get user by ID (requires token):
 * curl -X GET http://localhost:3000/api/v1/users/64f8a1b2c3d4e5f6a7b8c9d0 \
 *   -H "Authorization: Bearer YOUR_JWT_TOKEN"
 * 
 * Update user (not implemented):
 * curl -X PUT http://localhost:3000/api/v1/users/64f8a1b2c3d4e5f6a7b8c9d0 \
 *   -H "Content-Type: application/json" \
 *   -H "Authorization: Bearer YOUR_JWT_TOKEN" \
 *   -d '{"name":"Updated Name"}'
 */