import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        minlength: [3, "name must be at least 3 characters long"],
        maxlength: [20, "name must be less than 20 characters long"],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        min: [0, "price must be greater than 0"],
    },
    currency: {
        type: String,
        required: [true, "currency is required"],
        enum: ["USD", "EUR", "GBP", "CAD", "AUD", "CHF", "JPY", "CNY", "INR", "BRL", "MXN", "ARS", "CLP", "COP", "PEN", "NZD", "HKD", "SGD", "THB", "MYR", "PHP", "IDR", "VND", "KRW", "TRY", "RUB", "ZAR", "SEK", "NOK", "DKK", "PLN", "CZK", "HUF", "RON", "BGN", "HRK", "ISK", "JOD", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR", "AED", "BHD", "OMR", "KWD", "QAR", "SAR",]
    },
    frequency: {
        type: String,
        required: [true, "frequency is required"],
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        required: [true, "category is required"],
        enum: ["food", "entertainment", "shopping", "health", "education", "other"],
    },
    paymentMethod: {
        type: String,
        required: [true, "payment method is required"],
        trim: true,
    },
    status: {
        type: String,
        required: [true, "status is required"],
        enum: ["active", "inactive", "cancelled"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: [true, "start date is required"],
        validate: {
            validator: function(value) {
                return value < this.endDate;
            },
            message: "start date must be before end date",
        },
    },
    endDate: {
        type: Date,
        required: [true, "end date is required"],
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: "end date must be after start date",
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user is required"],
        index: true,
    },
}, { timestamps: true });

//auto calculate renewals
subscriptionSchema.pre("save", function(next) {
    if(!this.renewalDate) {
        const renewalPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
        next();
    }

    //auto update the status of the subscription
    if(this.renewalDate && this.renewalDate < new Date()) {
        this.status = "inactive";
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);