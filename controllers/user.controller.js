/**
 * USER CONTROLLER (controllers/user.controller.js)
 * 
 * This file contains controller functions for user-related operations.
 * Controllers handle the business logic for user management including
 * fetching user profiles, getting user data, and user-related operations.
 * 
 * Security Note: User controllers should always validate authentication
 * and authorization before allowing access to user data.
 */

// Import User model for database operations
import User from "../models/user.model.js";

/**
 * GET USER PROFILE CONTROLLER
 * 
 * Purpose: Get the authenticated user's own profile information
 * Method: GET
 * Route: /api/v1/users/ (requires authentication)
 * Authentication: Required - uses req.user from JWT middleware
 * 
 * Security Features:
 * - Requires valid JWT token
 * - Users can only access their own profile
 * - Returns user data without sensitive information
 */
export const getUserProfile = async (req, res, next) => {
    try {
        // ============= AUTHENTICATION CHECK =============
        // Check if user is authenticated via JWT middleware
        // req.user is populated by authentication middleware after token verification
        if (!req.user || !req.user.id) {
            return res.status(401).json({ 
                message: "Authentication required. Please login first.", 
                success: false 
            });
        }
        
        // ============= FETCH USER DATA =============
        // Find user by ID from the authenticated token
        // req.user.id comes from the JWT payload (set during signin)
        const user = await User.findById(req.user.id);
        
        // Check if user still exists in database
        // User might have been deleted after token was issued
        if (!user) {
            return res.status(404).json({ 
                message: "User not found", 
                success: false 
            });
        }
        
        // ============= SEND RESPONSE =============
        // Return user profile data (password is excluded by model)
        res.status(200).json({ 
            message: "User profile fetched successfully", 
            data: { user, success: true }
        });
        
    } catch (error) {
        // Pass any errors to global error handler
        next(error);
    }
};

/**
 * GET SINGLE USER BY ID CONTROLLER
 * 
 * Purpose: Get any user's public profile information by their ID
 * Method: GET
 * Route: /api/v1/users/:id (public access)
 * Authentication: Not required (public endpoint)
 * 
 * Security Features:
 * - Excludes password from response using .select("-password")
 * - Returns only public user information
 * - Validates user existence before returning data
 */
export const getSingleUser = async (req, res, next) => {
    try {
        // ============= FETCH USER BY ID =============
        // Get user ID from URL parameters (e.g., /api/v1/users/12345)
        // .select("-password") excludes the password field from the result
        const user = await User.findById(req.params.id).select("-password");
        
        // ============= VALIDATE USER EXISTS =============
        // Check if user was found in the database
        if(!user){
            return res.status(404).json({ 
                message: "User not found", 
                success: false 
            });
        }

        // ============= SEND RESPONSE =============
        // Return public user information (no sensitive data)
        res.status(200).json({ 
            message: "User fetched successfully", 
            data: { user, success: true }
        });
        
    } catch (error) {
        // Pass any errors to global error handler
        // This catches invalid ObjectId errors, database connection issues, etc.
        next(error);
    }
};

/**
 * ADDITIONAL USER CONTROLLER FUNCTIONS TO IMPLEMENT:
 * 
 * export const updateUserProfile = async (req, res, next) => {
 *     // Update authenticated user's profile
 *     // Validate input data
 *     // Hash password if being updated
 *     // Return updated user data
 * };
 * 
 * export const deleteUserAccount = async (req, res, next) => {
 *     // Delete authenticated user's account
 *     // Require password confirmation
 *     // Clean up related data (subscriptions, etc.)
 * };
 * 
 * export const changePassword = async (req, res, next) => {
 *     // Change user's password
 *     // Verify current password
 *     // Hash new password
 *     // Invalidate existing tokens
 * };
 * 
 * export const getAllUsers = async (req, res, next) => {
 *     // Admin-only function to get all users
 *     // Implement pagination
 *     // Exclude sensitive data
 *     // Add search/filter capabilities
 * };
 */