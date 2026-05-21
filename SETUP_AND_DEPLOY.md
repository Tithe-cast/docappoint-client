# DocAppoint – Complete Setup, Git & Deployment Guide

---

## 📁 PART 1: PROJECT STRUCTURE OVERVIEW

```
docappoint-client/          ← React frontend
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── DoctorCard.jsx
│   │   ├── BookingModal.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── Spinner.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── Home/HomePage.jsx
│   │   ├── Appointments/AppointmentsPage.jsx
│   │   ├── Doctor/DoctorDetailsPage.jsx
│   │   ├── Auth/LoginPage.jsx
│   │   ├── Auth/RegisterPage.jsx
│   │   ├── Dashboard/DashboardLayout.jsx
│   │   ├── Dashboard/DashboardOverview.jsx
│   │   ├── Dashboard/MyBookingsPage.jsx
│   │   ├── Dashboard/MyProfilePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md

docappoint-server/          ← Express backend
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── seed.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── doctors.js
│   │   ├── appointments.js
│   │   └── reviews.js
│   └── index.js
├── package.json
└── README.md
```

---

## 🔧 PART 2: LOCAL SETUP

### Prerequisites
- Node.js v18+ (download from nodejs.org)
- Git installed
- MongoDB Atlas account (free at mongodb.com)
- A code editor (VS Code recommended)

---

### STEP 1 – Set up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas and sign up (free)
2. Create a new **Project** → name it `docappoint`
3. Click **"Build a Database"** → choose **Free Shared** tier → click Create
4. Set username/password (save these!)
5. Under **Network Access** → Add IP Address → **Allow Access From Anywhere** (0.0.0.0/0)
6. Go to **Database** → Click **Connect** → **Connect your application**
7. Copy the connection string. It looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
8. Replace `<password>` with your actual password and add `docappoint` as the database name:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/docappoint?retryWrites=true&w=majority
   ```

---

### STEP 2 – Server Setup

```bash
# Navigate to server folder
cd docappoint-server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Now open `.env` and fill in your values:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/docappoint?retryWrites=true&w=majority
JWT_SECRET=myDocAppoint2024SuperSecretKey!Change_This_In_Production
CLIENT_URL=http://localhost:5173
```

> ⚠️ JWT_SECRET should be a long random string. Generate one at: https://randomkeygen.com/

```bash
# Seed demo doctor data
node src/config/seed.js

# Start development server
npm run dev

# You should see:
# ✅ MongoDB connected: cluster0.xxxxx.mongodb.net
# 🚀 Server running on http://localhost:5000
```

---

### STEP 3 – Client Setup

Open a new terminal:

```bash
# Navigate to client folder
cd docappoint-client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Open `.env` and add:
```env
VITE_API_URL=http://localhost:5000
```

```bash
# Start development server
npm run dev

# App runs at http://localhost:5173
```

---

### STEP 4 – Google OAuth Setup (Optional but recommended)

1. Go to https://console.cloud.google.com/
2. Create a new project → name it `DocAppoint`
3. Enable **Google+ API** (or "Google Identity")
4. Go to **Credentials** → **Create Credentials** → **OAuth Client ID**
5. Application type: **Web application**
6. Add Authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback` (dev)
   - `https://your-server.onrender.com/auth/google/callback` (production)
7. Copy **Client ID** and **Client Secret** to your server `.env`:
   ```env
   GOOGLE_CLIENT_ID=xxxxxxxxxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxx
   ```

> 💡 For full Google OAuth, install `passport` and `passport-google-oauth20`:
> ```bash
> npm install passport passport-google-oauth20
> ```

---

## 🐙 PART 3: GIT SETUP & COMMITS

### Server Repository

```bash
cd docappoint-server

# Initialize git
git init

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
.env
*.log
dist/
.DS_Store
EOF

# Initial commit
git add .
git commit -m "feat: initial project setup with Express and MongoDB"

# Create GitHub repo (go to github.com → New Repository)
# Name: docappoint-server
# Keep it Public

# Link remote and push
git remote add origin https://github.com/YOUR_USERNAME/docappoint-server.git
git branch -M main
git push -u origin main
```

**Recommended Server Commits (minimum 8):**

```bash
# After adding models
git add src/models/
git commit -m "feat: add User, Doctor, Appointment, and Review mongoose models"

# After auth routes
git add src/routes/auth.js src/middleware/auth.js
git commit -m "feat: implement JWT authentication with register and login endpoints"

# After doctor routes
git add src/routes/doctors.js
git commit -m "feat: add doctors REST endpoints with search and sort support"

# After appointment routes
git add src/routes/appointments.js
git commit -m "feat: add appointments CRUD endpoints with JWT authorization"

# After reviews routes
git add src/routes/reviews.js
git commit -m "feat: add reviews endpoints with automatic doctor rating update"

# After seed script
git add src/config/seed.js
git commit -m "feat: add database seed script with 9 demo doctors"

# After CORS config
git add src/index.js
git commit -m "feat: configure CORS, global error handling, and health check endpoint"

# After README
git add README.md
git commit -m "docs: add comprehensive API documentation to README"
```

---

### Client Repository

```bash
cd docappoint-client

# Initialize git
git init

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
dist/
.env
*.local
.DS_Store
EOF

# Initial commit
git add .
git commit -m "feat: initialize React + Vite project with Tailwind CSS"

# Create GitHub repo
# Name: docappoint-client
git remote add origin https://github.com/YOUR_USERNAME/docappoint-client.git
git branch -M main
git push -u origin main
```

**Recommended Client Commits (minimum 15):**

```bash
# Auth context
git add src/context/
git commit -m "feat: implement JWT AuthContext and ThemeContext with dark mode support"

# Navbar & Footer
git add src/components/Navbar.jsx src/components/Footer.jsx
git commit -m "feat: add responsive Navbar with user dropdown and Footer with social links"

# PrivateRoute
git add src/components/PrivateRoute.jsx src/components/Spinner.jsx
git commit -m "feat: add PrivateRoute component for dashboard protection"

# Home page hero
git add src/pages/Home/
git commit -m "feat: build Home page with Swiper hero slider and stats section"

# Top rated doctors
git add src/components/DoctorCard.jsx
git commit -m "feat: add DoctorCard component with dynamic info and auth-gated navigation"

# Home page extra sections
git commit -m "feat: add Specialties grid, How It Works, FAQ accordion, and CTA section"

# All appointments page
git add src/pages/Appointments/
git commit -m "feat: add All Appointments page with live search and sorting filters"

# Doctor details
git add src/pages/Doctor/
git commit -m "feat: add Doctor Details page with full info display and book button"

# Booking modal
git add src/components/BookingModal.jsx
git commit -m "feat: implement booking modal with form validation and MongoDB save"

# Login page
git add src/pages/Auth/LoginPage.jsx
git commit -m "feat: add Login page with email/password and Google OAuth button"

# Register page
git add src/pages/Auth/RegisterPage.jsx
git commit -m "feat: add Register page with real-time password validation rules"

# Dashboard layout + overview
git add src/pages/Dashboard/DashboardLayout.jsx src/pages/Dashboard/DashboardOverview.jsx
git commit -m "feat: add Dashboard layout with sidebar navigation and overview stats"

# My Bookings
git add src/pages/Dashboard/MyBookingsPage.jsx
git commit -m "feat: add My Bookings page with update modal and instant delete"

# My Profile
git add src/pages/Dashboard/MyProfilePage.jsx
git commit -m "feat: add My Profile page with update modal and live preview"

# 404 & App router
git add src/pages/NotFoundPage.jsx src/App.jsx
git commit -m "feat: add custom 404 page, configure React Router v6 with all routes"

# Reviews section
git commit -m "feat: add doctor review system with star rating and live updates"

# Theme & styles
git add src/index.css tailwind.config.js
git commit -m "style: configure custom Tailwind theme, animations, and global CSS components"

# README
git add README.md
git commit -m "docs: add README with live URL, features list, and setup instructions"
```

---

## 🚀 PART 4: DEPLOYMENT

### Deploy Server to Render

1. Go to https://render.com and sign up
2. Click **"New +"** → **Web Service**
3. Connect your GitHub account → select `docappoint-server`
4. Configure:
   ```
   Name:           docappoint-server
   Environment:    Node
   Build Command:  npm install
   Start Command:  npm start
   ```
5. Click **"Advanced"** → **Add Environment Variables**:
   ```
   PORT              = 5000
   MONGODB_URI       = (your full MongoDB Atlas URI)
   JWT_SECRET        = (your secret key)
   CLIENT_URL        = https://docappoint.vercel.app
   ```
6. Click **"Create Web Service"**
7. Wait for deployment (2-3 min)
8. Copy your server URL: `https://docappoint-server.onrender.com`

> ⚠️ Free Render servers sleep after 15 min of inactivity. First request may take 30 seconds.

---

### Deploy Client to Vercel

1. Go to https://vercel.com and sign up
2. Click **"Add New…"** → **Project**
3. Import your `docappoint-client` GitHub repo
4. Configure:
   ```
   Framework Preset: Vite
   Root Directory:   ./  (or docappoint-client if in monorepo)
   Build Command:    npm run build
   Output Directory: dist
   ```
5. Click **"Environment Variables"** → Add:
   ```
   VITE_API_URL = https://docappoint-server.onrender.com
   ```
6. Click **"Deploy"**
7. Vercel gives you a URL like: `https://docappoint.vercel.app`

---

### Fix SPA Routing on Vercel (IMPORTANT)

Create this file to prevent 404 on page reload:

```bash
# In docappoint-client root, create vercel.json
cat > vercel.json << 'EOF'
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
EOF

git add vercel.json
git commit -m "fix: add Vercel SPA routing config to prevent 404 on reload"
git push
```

---

### Update CORS on Server

After getting your Vercel URL, update Render's environment variable:
```
CLIENT_URL = https://your-actual-url.vercel.app
```

Also update `src/index.js` CORS origin array with your real URL:
```js
origin: [
  'http://localhost:5173',
  'https://your-actual-url.vercel.app',
],
```

Push, commit, and Render will auto-redeploy.

---

### Seed Production Database

```bash
cd docappoint-server

# Temporarily set MONGODB_URI to your production DB
MONGODB_URI="your_production_uri" node src/config/seed.js
```

---

## ✅ PART 5: FINAL CHECKLIST

### Client
- [ ] Minimum 15 meaningful GitHub commits
- [ ] README.md with website name, live URL, and 5+ bullet features
- [ ] No Lorem ipsum text anywhere
- [ ] No default browser `alert()` – using react-hot-toast
- [ ] Hosted on Vercel, no errors on reload from any route
- [ ] Logged-in user stays logged in on private route reload
- [ ] Responsive on mobile, tablet, desktop
- [ ] Custom 404 page
- [ ] Loading spinner on data fetch
- [ ] Dark/Light mode toggle
- [ ] Search functionality on All Appointments page
- [ ] Metadata/title on every page

### Server
- [ ] Minimum 8 meaningful GitHub commits
- [ ] .env not committed (in .gitignore)
- [ ] JWT on all private endpoints
- [ ] CRUD for appointments (Create, Read, Update, Delete)
- [ ] MongoDB seed data available

---

## 🔑 PART 6: ENVIRONMENT VARIABLES SUMMARY

### Client (`.env`)
```env
VITE_API_URL=http://localhost:5000
```

### Client production (Vercel dashboard)
```env
VITE_API_URL=https://docappoint-server.onrender.com
```

### Server (`.env`)
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/docappoint?retryWrites=true&w=majority
JWT_SECRET=your_64_char_random_secret_here
CLIENT_URL=http://localhost:5173
GOOGLE_CLIENT_ID=optional
GOOGLE_CLIENT_SECRET=optional
```

### Server production (Render dashboard)
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/docappoint?retryWrites=true&w=majority
JWT_SECRET=your_64_char_random_secret_here
CLIENT_URL=https://your-vercel-url.vercel.app
```

---

## 🧪 PART 7: TESTING YOUR APP

After deployment, verify:

```bash
# Test server health
curl https://your-server.onrender.com/

# Test doctors endpoint
curl https://your-server.onrender.com/doctors

# Test with search
curl "https://your-server.onrender.com/doctors?sort=rating&limit=3"
```

Then in browser:
1. Visit live URL → Home page loads with hero slider
2. Click All Appointments → doctors show up
3. Click View Details (not logged in) → redirected to Login
4. Register a new account → redirected to Login
5. Login → redirected back to intended page
6. Book appointment → success toast appears
7. Go to Dashboard → booking visible
8. Update booking → modal opens pre-filled
9. Delete booking → removed instantly
10. Reload private route → stays logged in ✅

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| CORS error | Update CLIENT_URL in Render env vars |
| MongoDB connection fails | Check IP whitelist (0.0.0.0/0) and URI format |
| 404 on page reload (Vercel) | Add `vercel.json` with rewrite rules |
| JWT invalid after deploy | Make sure JWT_SECRET matches in both envs |
| Render cold start slow | Free tier sleeps – first request takes ~30s |
| Doctors not loading | Run seed script against production DB |
| Google OAuth failing | Check redirect URIs in Google Console match exactly |
