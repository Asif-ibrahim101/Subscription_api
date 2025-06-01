import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        minlength: [3, "username must be at least 3 characters long"],
        maxlength: [20, "username must be less than 20 characters long"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [/^\S+@\S+\.\S+$/, "invalid email address"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        validate: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "invalid password"],
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;