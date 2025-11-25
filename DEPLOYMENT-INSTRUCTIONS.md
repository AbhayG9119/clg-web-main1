# Deployment and Integration Instructions for Backend and Frontend

## Objective

Deploy the backend Express server live (e.g., on Heroku), connect it with your database and frontend, and update the frontend to call the live backend URL without 404 or CORS errors.

---

## Backend Deployment Preparation

1. Ensure `Backend/package.json` includes the following start script:

   ```json
   "start": "node src/server.js"
   ```

   This is already confirmed.

2. Create a `.env` file in the `Backend` directory (if not present) containing:
   ```
   MONGO_URI=your_mongodb_connection_string
   FRONTEND_URL=https://your-vercel-frontend-url
   PORT=5000
   ```
   Replace `your_mongodb_connection_string` and `your-vercel-frontend-url` with your actual MongoDB and frontend URLs.

---

## Deploy Backend to Heroku

### Prerequisites

- Create a free Heroku account: [https://heroku.com](https://heroku.com)
- Install Heroku CLI: [Heroku CLI installation guide](https://devcenter.heroku.com/articles/heroku-cli)
- Login to Heroku CLI:
  ```
  heroku login
  ```

### Steps

1. Create a new Heroku app:

   ```
   heroku create your-app-name
   ```

   Replace `your-app-name` with your desired app name.

2. Set environment variables on Heroku:

   ```
   heroku config:set MONGO_URI=your_mongodb_connection_string
   heroku config:set FRONTEND_URL=https://your-vercel-frontend-url
   ```

3. Initialize git repo in the `Backend` folder if not already initialized:

   ```
   git init
   git add .
   git commit -m "Prepare backend for Heroku deployment"
   ```

4. Add Heroku remote if not automatically added:

   ```
   heroku git:remote -a your-app-name
   ```

5. Push backend code to Heroku:

   ```
   git push heroku master
   ```

6. Scale web dynos on Heroku:

   ```
   heroku ps:scale web=1
   ```

7. Open backend URL to verify deployment:

   ```
   heroku open
   ```

8. Test critical backend endpoint:
   Visit `https://your-app-name.herokuapp.com/api/health` in the browser or via curl to confirm the server is running.

---

## Update Frontend to Use Deployed Backend

1. In your frontend project `Frontend/` create or update the `.env` file in the root with:

   ```
   REACT_APP_API_BASE_URL=https://your-app-name.herokuapp.com
   ```

2. Redeploy the frontend (e.g., on Vercel or your hosting service):

   - If hosted on Vercel, update the environment variables in the Vercel dashboard accordingly.
   - Then trigger a redeployment.

3. The frontend will now call your live backend API instead of the local backend.

---

## Optional Backend CORS Settings Update

- Confirm the backend `FRONTEND_URL` environment variable is updated to the actual frontend URL on Heroku configuration.
- Backend CORS in `Backend/src/server.js` reads this to allow requests.

---

## Final Testing

- Test frontend calls to backend API endpoints in deployed environment.
- Confirm no CORS or 404 errors.
- Test database connectivity via backend endpoints.
- Use Heroku logs for debugging:
  ```
  heroku logs --tail
  ```

---

## Additional Enhancements (Optional)

- Set up a custom domain & SSL on Heroku.
- Set up CI/CD pipelines for backend and frontend.
- Monitor backend logs continuously.

---

If you want help with any deployment commands or further assistance, please let me know!
