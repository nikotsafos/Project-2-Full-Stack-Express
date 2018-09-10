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

### Workout model

| Column Name | SQL Type | Notes |
| ----------- | -------- | ------------------------------- |
| id | integer | serial primary key |
| createdAt | Date | automatically generated |
| updatedAt | Date | automatically generated |
| name | String | - |
| reps | INTEGER | - |
| sets | INTEGER | - |
| date | Date | same as updatedAt |
| weight | INTEGER | - |
| userId | INTEGER | tied with id from user model |

### Auth Routes

| Method | Path | Location | Purpose |
| ------ | ----------------- | ----------------------------- | ------------------------------------------ |
| GET | /auth/login | controllers/auth.js | Login form page |
| POST | /auth/login | controllers/auth.js | Login submission + Redirect to Profile |
| GET | /auth/signup | controllers/auth.js | Signup form page |
| POST | /auth/signup | controllers/auth.js |Signup submission + Redirect to Profile |
| GET | /auth/logout | controllers/auth.js |Logout + Redirect to Home |

### Profile Routes

| Method | Path | Location | Purpose |
| ------ | ----------------- | ----------------------------- | ------------------------------------------ |
| GET | /profile | controllers/profile.js | Profile page (authorization req) |
| GET | /profile/edit/:id | controllers/profile.js | Edit profile page for logged in user |
| PUT | /profile/edit/:id | controllers/profile.js | Update your profile info |

### Workout Routes

| Method | Path | Location | Purpose |
| ------ | ----------------- | ----------------------------- | ------------------------------------------ |
| GET | /workout/workouts | controllers/workout.js | All your workout history |
| GET | /workout/add | controllers/workout.js | Add workout form page |
| POST | /workout/workouts | controllers/workout.js | Adding a workout to your log |
| GET | /workout/edit/:id | controllers/workout.js | Edit your workout form page |
| PUT | /workout/edit/:id | controllers/workout.js | Updating your workout |
| DELETE | /workout/workouts/:id | controllers/workout.js | Deleting a workout |
