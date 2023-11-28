# express-authentication

## Tasks Done:
- Authentication  
    - Signup and Signin functionality
    - Password is hashed with bcrypt package 
    - Set the accessToken in cookie storage while signing in
    - Verify the token when `\hello` route is called after siging in
- Used mongodb to store data
- Middlewares used:
    - express-rate-limit: Limits 50 requests per 5 min
