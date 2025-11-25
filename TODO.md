# Deployment and Integration TODO

## Objective

Deploy the backend Express server live (e.g., on Heroku), connect it with database and frontend, and update frontend to call live backend without 404 errors.

---

## Step 1: Backend Deployment Preparation

- Verify `Backend/package.json` has start script: `"start": "node src/server.js"` (Confirmed)
- Ensure `.env` contains needed environment variables for local testing
  - MONGO_URI: MongoDB connection string
  - FRONTEND_URL: Frontend app URL (e.g., https://your-vercel-app.vercel.app)

## Step 2: Deploy Backend to Heroku

- Create a free Heroku account (https://heroku.com)
- Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
- Login to Heroku CLI:
  ```
  heroku login
  ```
- Create new Heroku app:
  ```
  heroku create your-app-name
  ```
- Set environment variables on Heroku for your app:
  ```
  heroku config:set MONGO_URI=your_mongodb_connection_string
  heroku config:set FRONTEND_URL=https://your-vercel-frontend-url
  ```
- Initialize git repo if not done:
  ```
  git init
  git add .
  git commit -m "Prepare backend for Heroku deployment"
  ```
- Push backend code to Heroku:
  ```
  git push heroku master
  ```
- Scale web dynos on Heroku:
  ```
  heroku ps:scale web=1
  ```
- Open backend URL to verify deployment:
  ```
  heroku open
  ```
- Test critical backend endpoint, e.g.,  
  `https://your-app-name.herokuapp.com/api/health`

## Step 3: Update Frontend to Use Deployed Backend

- In your frontend project, set environment variable REACT_APP_API_BASE_URL to the live backend URL, e.g.,
  ```
  REACT_APP_API_BASE_URL=https://your-app-name.herokuapp.com
  ```
- Alternatively, update frontend .env or Vercel environment variables
- Commit and redeploy frontend (e.g., on Vercel)

## Step 4: Update Backend CORS Settings (Optional if Frontend URL changes)

- Confirm backend `FRONTEND_URL` environment variable is updated accordingly on Heroku
- Backend CORS is configured in `Backend/src/server.js` to accept requests from FRONTEND_URL

## Step 5: Final Testing

- Test frontend calls to backend API endpoints
- Confirm no CORS or 404 errors
- Test database connectivity via backend endpoints

---

## Optional Enhancements

- Add custom domain & SSL on Heroku
- Setup CI/CD pipelines for backend and frontend
- Monitor backend logs with:
  ```
  heroku logs --tail
  ```

---

This completes the deployment and integration steps for your backend, frontend, and database.

---

# Deployment and Integration Status

✅ Deployment and integration steps have been completed.  
Please refer to [DEPLOYMENT-INSTRUCTIONS.md](DEPLOYMENT-INSTRUCTIONS.md) for detailed deployment and environment setup instructions.

