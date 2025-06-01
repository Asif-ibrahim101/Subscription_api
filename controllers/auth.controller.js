import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * SIGNUP CONTROLLER
 * Purpose: Register a new user account
 * Method: POST
 * Route: /api/v1/auth/sign-up
 * Body: { name, email, password }
 */
export const signup = async (req, res, next) => {
    // Start a MongoDB session for transaction management
    // Transactions ensure data consistency - if something fails, everything gets rolled back
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Extract user data from request body
        // Destructuring: pulls name, email, password from req.body object
        const { name, email, password } = req.body;

        // Check if user already exists in database
        // findOne() returns the first document that matches the query, or null if none found
        const existingUser = await User.findOne({ email });
        if(existingUser){
            // If user exists, return error and stop execution
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password for security
        // genSalt(10) creates a salt with complexity level 10
        // Salt adds random data to password before hashing to prevent rainbow table attacks
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user in database
        // Using array syntax with session for transaction support
        // session parameter ensures this operation is part of the transaction
        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword,   // Store hashed password, never plain text
        }], { session });

        // Create JWT token for authentication
        // Token contains user ID and expires based on environment variable
        // This token will be used for future authenticated requests
        const token = jwt.sign(
            {userId: newUsers[0]._id},     // Payload: what data to include in token
            process.env.JWT_SECRET,       // Secret key for signing (from environment)
            {expiresIn: process.env.JWT_EXPERIES} // Token expiration time
        );

        // If everything succeeded, commit the transaction
        // This makes all database changes permanent
        await session.commitTransaction();
        session.endSession(); // Clean up the session

        // Send success response with user data and token
        res.status(201).json({ 
            message: "User created successfully", 
            user: newUsers[0],    // Return user data (password already excluded)
            token,               // Return JWT token for future requests
            success: true
        });
    }catch(error){
        // If any error occurs, rollback all database changes
        await session.abortTransaction();
        session.endSession(); // Clean up the session
        next(error); // Pass error to error handling middleware
    }
};

/**
 * SIGNIN CONTROLLER
 * Purpose: Authenticate existing user and provide access token
 * Method: POST
 * Route: /api/v1/auth/sign-in
 * Body: { email, password }
 */
export const signin = async (req, res, next) => {
    // Start transaction (though not strictly needed for read operations)
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Extract login credentials from request body
        const { email, password } = req.body;

        // Find user by email in database
        const user = await User.findOne({ email });
        if(!user){
            // If no user found with this email, return error
            return res.status(400).json({ message: "User not found" });
        }

        // Verify password by comparing with stored hashed password
        // bcrypt.compare() hashes the plain text password and compares with stored hash
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            // If password doesn't match, return error
            return res.status(400).json({ message: "Invalid password" });
        }

        // If credentials are valid, create JWT token
        const token = jwt.sign(
            {userId: user._id},               // Include user ID in token payload
            process.env.JWT_SECRET,          // Sign with secret key
            {expiresIn: process.env.JWT_EXPERIES} // Set expiration time
        );

        // Send success response with user data and token
        res.status(200).json({ 
            message: "User signed in successfully", 
            data: {
                user,      // User information
                token,     // JWT token for authentication
                success: true
            }
        });
        
    } catch (error) {
        // If error occurs, rollback transaction
        await session.abortTransaction();
        // Note: Missing session.endSession() and next(error) - these should be added
    }
};

/**
 * SIGNOUT CONTROLLER
 * Purpose: Log out user (currently empty - needs implementation)
 * Method: POST
 * Route: /api/v1/auth/sign-out
 * 
 * Note: JWT tokens are stateless, so signout usually involves:
 * - Clearing token from client-side storage
 * - Adding token to a blacklist (if implementing token revocation)
 * - Clearing HTTP-only cookies (if using cookie-based tokens)
 */
export const signout = async (req, res, next) => {
    // TODO: Implement signout logic
    // Could clear cookies, add token to blacklist, etc.
};