#Project-2-Full-Stack-Express

## What it includes

* Sequelize models and migration for user model
* Settings for Postgresql
* Passport and Passport-Local for authentication
* Express sessions to keep user logged in from page to page
* Connect-Flash for error/success messages
* Bcrypt for hashing passwords

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

> NOTE: Change these fields in both the model and migration files BEFORE running
sequelize db:migrate

### Default Routes Supplied

| Method | Path | Location | Purpose |
| ------ | ----------------- | ----------------------------- | ------------------------------------------ |
| GET | / | index.js | Home page |
| GET | /profile | controllers/profile.js | Profile page (authorization req) |
| GET | /auth/login | controllers/auth.js | Login form page |
| POST | /auth/login | controllers/auth.js | Login submission + Redirect to Profile |
| GET | /auth/signup | controllers/auth.js | Signup form page |
| POST | /auth/signup | controllers/auth.js |Signup submission + Redirect to Profile |
| GET | /auth/logout | controllers/auth.js |Logout + Redirect to Home |
