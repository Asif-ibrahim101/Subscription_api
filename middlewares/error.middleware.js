/**
 * GLOBAL ERROR HANDLING MIDDLEWARE (middlewares/error.middleware.js)
 * 
 * This middleware catches and handles all errors that occur in the application.
 * It standardizes error responses and provides specific handling for different
 * types of errors (MongoDB errors, validation errors, etc.)
 * 
 * Express Error Handling:
 * - Error middleware must have 4 parameters: (err, req, res, next)
 * - It should be the last middleware in the application
 * - Any error thrown or passed to next() will reach this middleware
 */

/**
 * Global error handling function
 * 
 * @param {Error} err - The error object passed from previous middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object  
 * @param {Function} next - Express next function to pass control
 */
const errorMiddleware = (err, req, res, next) => {
    try {
        // Create a copy of the error object to avoid modifying the original
        let error = { ...err };
        error.message = err.message;
        
        // Log the error for debugging purposes
        // In production, you might want to use a proper logging library
        console.log(error);

        // ============= MONGOOSE SPECIFIC ERROR HANDLING =============
        
        // 1. CAST ERROR - Invalid ObjectId or data type conversion
        // Occurs when trying to find a document with an invalid MongoDB ObjectId
        // Example: User.findById("invalid-id") throws CastError
        if(err.name === "CastError") {
            const message = `Resource not found. Invalid: ${err.path}: ${err.value}`;
            error = new Error(message);
            error.statusCode = 404; // Not Found
        }

        // 2. DUPLICATE KEY ERROR - MongoDB unique constraint violation
        // Occurs when trying to insert a document with a field value that already exists
        // Example: Creating a user with an email that already exists
        if(err.code === 11000) {
            const message = `Duplicate field value entered`;
            error = new Error(message);
            error.statusCode = 400; // Bad Request
        }

        // 3. VALIDATION ERROR - Mongoose schema validation failure
        // Occurs when data doesn't meet the requirements defined in the schema
        // Example: Missing required fields, invalid data types, custom validators
        if(err.name === "ValidationError") {
            // Extract all validation error messages and combine them
            const message = Object.values(err.errors).map((val) => val.message);
            error = new Error(message.join(", "));
            error.statusCode = 400; // Bad Request
        }

        // ============= SEND ERROR RESPONSE =============
        // Send a consistent error response format to the client
        res.status(error.statusCode || 500).json({
            success: false,                              // Always false for errors
            message: error.message || "Internal Server Error", // Error message or default
        });
        
    } catch (error) {
        // If an error occurs in the error handler itself, pass it to Express
        // This prevents infinite loops and ensures the client gets a response
        next(error)
    }
};

export default errorMiddleware;

/**
 * COMMON HTTP STATUS CODES USED IN ERROR HANDLING:
 * 
 * 400 Bad Request - Client sent invalid data
 * 401 Unauthorized - Authentication required
 * 403 Forbidden - User doesn't have permission
 * 404 Not Found - Resource doesn't exist
 * 409 Conflict - Resource already exists (duplicate)
 * 422 Unprocessable Entity - Validation failed
 * 500 Internal Server Error - Server-side error
 * 
 * USAGE IN CONTROLLERS:
 * - Throw errors: throw new Error("Something went wrong")
 * - Pass to next(): next(new Error("Something went wrong"))
 * - With status code: 
 *   const error = new Error("User not found");
 *   error.statusCode = 404;
 *   next(error);
 */