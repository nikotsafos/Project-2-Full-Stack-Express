# Workout Manager
Full Stack App built using Node, Express, Sequelize and Postgresql

### User model

| Column Name | SQL Type | Notes |
| ----------- | -------- | ------------------------------- |
| id | integer | serial primary key |
| createdAt | Date | automatically generated |
| updatedAt | Date | automatically generated |
| firstname | String | - |
| lastname | String | - |
| email | String | - |
| password | String | hashed with bcrypt |
| dob | Date | - |
| weight | INTEGER | - |
| height | INTEGER | - |

### Auth Routes

| Method | Path | Location | Purpose |
| ------ | ----------------- | ----------------------------- | ------------------------------------------ |
| GET | / | index.js | Home page |
| GET | /profile | controllers/profile.js | Profile page (authorization req) |
| GET | /auth/login | controllers/auth.js | Login form page |
| POST | /auth/login | controllers/auth.js | Login submission + Redirect to Profile |
| GET | /auth/signup | controllers/auth.js | Signup form page |
| POST | /auth/signup | controllers/auth.js |Signup submission + Redirect to Profile |
| GET | /auth/logout | controllers/auth.js |Logout + Redirect to Home |
