# 🔔 Subscription Tracker API

A comprehensive Node.js REST API for managing subscription services, built with Express.js and MongoDB. Track your recurring subscriptions, manage renewals, and never miss a payment again!

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

## 🚀 Features

### 🔐 Authentication System
- **User Registration** - Secure account creation with password hashing
- **User Login** - JWT-based authentication
- **Password Security** - bcryptjs encryption with salt
- **Session Management** - Token-based authentication
- **User Logout** - Secure session termination

### 👤 User Management
- **Profile Management** - View and update user profiles
- **Account Security** - Password-protected operations
- **User Data Protection** - Sensitive data exclusion from responses

### 📋 Subscription Management
- **Create Subscriptions** - Add new subscription services
- **View Subscriptions** - Get all user subscriptions
- **Update Subscriptions** - Modify subscription details
- **Cancel Subscriptions** - Soft cancellation with reasons
- **Delete Subscriptions** - Permanent removal (admin only)
- **Renewal Tracking** - Upcoming renewal notifications
- **User-Specific Views** - Filter subscriptions by user

### 🛡️ Security Features
- **JWT Authentication** - Stateless token-based auth
- **Password Hashing** - bcryptjs with salt rounds
- **Environment Variables** - Secure configuration management
- **Input Validation** - Request data validation
- **Error Handling** - Comprehensive error management
- **CORS Protection** - Cross-origin request security

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | v22.14.0 |
| **Express.js** | Web Framework | ~4.16.1 |
| **MongoDB** | Database | v6.16.0 |
| **Mongoose** | ODM | v8.15.1 |
| **JWT** | Authentication | v9.0.2 |
| **bcryptjs** | Password Hashing | v3.0.2 |
| **dotenv** | Environment Config | v16.5.0 |
| **cookie-parser** | Cookie Management | ~1.4.4 |

## 📁 Project Structure

```
subscription_tracker/
├── 📁 config/                  # Configuration files
│   └── env.js                  # Environment variables setup
├── 📁 controllers/             # Business logic
│   ├── auth.controller.js      # Authentication operations
│   └── user.controller.js      # User management operations
├── 📁 database/                # Database configuration
│   └── mongodb.js              # MongoDB connection setup
├── 📁 middlewares/             # Custom middleware
│   └── error.middleware.js     # Global error handling
├── 📁 models/                  # Database schemas
│   ├── user.model.js           # User data model
│   └── subscribtion.model.js   # Subscription data model
├── 📁 routes/                  # API endpoints
│   ├── auth.routes.js          # Authentication routes
│   ├── user.routes.js          # User management routes
│   └── subscription.routes.js  # Subscription routes
├── app.js                      # Main application file
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/Asif-ibrahim101/Subscription_api.git
cd Subscription_api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env.development` file in the root directory:

```env
PORT=3000
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/subscription_tracker_dev
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPERIES=7d
```

### 4. Start the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### 🔐 Authentication Endpoints

#### Register New User
```http
POST /api/v1/auth/sign-up
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /api/v1/auth/sign-in
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Logout User
```http
POST /api/v1/auth/sign-out
```

### 👤 User Management Endpoints

#### Get User Profile
```http
GET /api/v1/users/
Authorization: Bearer <jwt_token>
```

#### Get User by ID
```http
GET /api/v1/users/:id
Authorization: Bearer <jwt_token>
```

### 📋 Subscription Endpoints

#### Get All Subscriptions
```http
GET /api/v1/subscriptions/
Authorization: Bearer <jwt_token>
```

#### Create New Subscription
```http
POST /api/v1/subscriptions/
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "serviceName": "Netflix",
  "amount": 15.99,
  "currency": "USD",
  "billingCycle": "monthly",
  "startDate": "2024-01-15",
  "category": "Entertainment"
}
```

#### Get Upcoming Renewals
```http
GET /api/v1/subscriptions/upcoming-renewals
Authorization: Bearer <jwt_token>
```

#### Cancel Subscription
```http
PUT /api/v1/subscriptions/:id/cancel
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "reason": "No longer needed"
}
```

## 🧪 Testing the API

### Using cURL

**Register a user:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get subscriptions:**
```bash
curl -X GET http://localhost:3000/api/v1/subscriptions/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Thunder Client (VS Code)
1. Install Thunder Client extension
2. Import the provided API collection
3. Set environment variables for base URL and tokens
4. Test all endpoints with pre-configured requests

## 🎯 Key Achievements

### ✅ **Complete Authentication System**
- Secure user registration and login
- JWT-based stateless authentication
- Password hashing with bcryptjs
- Session management and logout

### ✅ **Comprehensive API Design**
- RESTful endpoint structure
- Proper HTTP status codes
- Consistent response formats
- Error handling middleware

### ✅ **Database Integration**
- MongoDB with Mongoose ODM
- Schema validation and relationships
- Transaction support for data integrity
- Efficient query optimization

### ✅ **Security Best Practices**
- Environment-based configuration
- Secure password storage
- JWT token authentication
- Input validation and sanitization

### ✅ **Code Documentation**
- Comprehensive inline comments
- Function-level documentation
- API usage examples
- Architecture explanations

### ✅ **Professional Code Structure**
- Modular architecture
- Separation of concerns
- Middleware implementation
- Error handling patterns

## 🔄 Development Workflow

### Code Organization
- **Controllers** - Business logic and data processing
- **Routes** - API endpoint definitions and middleware
- **Models** - Database schemas and validations
- **Middleware** - Cross-cutting concerns (auth, errors)
- **Config** - Environment and database configuration

### Error Handling
- Global error middleware
- Mongoose-specific error handling
- Consistent error response format
- Proper HTTP status codes

### Security Measures
- JWT token-based authentication
- Password hashing with salt
- Environment variable protection
- Request validation

## 🚀 Future Enhancements

- [ ] **Email Notifications** - Renewal reminders
- [ ] **Payment Integration** - Stripe/PayPal support
- [ ] **Subscription Analytics** - Spending insights
- [ ] **Mobile App Support** - React Native app
- [ ] **Admin Dashboard** - Management interface
- [ ] **API Rate Limiting** - Request throttling
- [ ] **Automated Testing** - Jest/Mocha test suite
- [ ] **Deployment Pipeline** - CI/CD with GitHub Actions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Asif Ibrahim**
- GitHub: [@Asif-ibrahim101](https://github.com/Asif-ibrahim101)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Express.js community for excellent documentation
- MongoDB team for powerful database solution
- JWT.io for authentication insights
- Node.js ecosystem contributors

---

### 💡 **Built with passion for subscription management!**

*Happy Coding! 🚀* 