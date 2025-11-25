# Backend Deployment Tutorial and Frontend Integration

## Objective

Deploy your existing Express backend as a standalone service separately from Vercel, and update the frontend to call this backend correctly. This resolves the 404 errors caused by Vercel's serverless model not supporting a monolithic Express backend.

---

## 1. Deploying the Backend on Heroku

### Prerequisites

- Create a free Heroku account at https://heroku.com
- Install Heroku CLI locally: https://devcenter.heroku.com/articles/heroku-cli

### Steps

#### Step 1: Prepare your backend for deployment

- Make sure `package.json` includes a start script, e.g.:
  ```json
  "scripts": {
    "start": "node src/server.js"
  }
  ```
- Ensure your backend listens on the port provided by environment variable:
  ```js
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  ```
- Confirm all environment variables your app needs (e.g., MONGO_URI, FRONTEND_URL) are read from `process.env`.

#### Step 2: Login and create Heroku app

- Run in terminal:
  ```
  heroku login
  heroku create your-app-name
  ```

#### Step 3: Set environment variables on Heroku

- Set your variables e.g.:
  ```
  heroku config:set MONGO_URI=your_mongo_connection_string
  heroku config:set FRONTEND_URL=https://your-vercel-frontend-url
  ```

#### Step 4: Deploy your backend code

- Initialize git (if not done):
  ```
  git init
  git add .
  git commit -m "Prepare backend for Heroku deployment"
  ```
- Push to Heroku:
  ```
  git push heroku master
  ```

#### Step 5: Scale your dynos to run the backend

```
heroku ps:scale web=1
```

#### Step 6: Open your backend URL and verify it works

```
heroku open
```

Test critical endpoints using Postman or curl, e.g. `https://your-app-name.herokuapp.com/api/health`

---

## 2. Update Frontend to Call the Deployed Backend

### Step 1: Change backend API base URL

- Find all frontend calls to API, e.g., `/api/student`
- Replace with full backend URL: `https://your-app-name.herokuapp.com/api/student`

### Step 2: Update CORS settings in backend

- Ensure your backend `server.js` CORS config includes your frontend URL:
  ```js
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    })
  );
  ```

### Step 3: Redeploy your frontend to Vercel

- Commit and push your frontend code with updated API URLs.
- Deploy via Vercel as usual.

---

## 3. Optional Enhancements

- Add custom domain and SSL for backend app in Heroku or chosen hosting.
- Set up CI/CD pipelines for automated deployments.
- Monitor backend logs with `heroku logs --tail`.

---

## Additional Notes

- You can deploy on other platforms with similar steps (Railway, DigitalOcean, AWS, etc.).
- Using environment variables securely is critical.
- Make sure to test thoroughly in staging before updating production.

---

This tutorial should help you deploy your backend separately and connect it to your Vercel-hosted frontend properly to resolve the 404 issues.

If you have any questions or need help with a specific host platform or frontend integration, please let me know!
