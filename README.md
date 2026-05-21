# DocAppoint – Doctor Appointment Manager

**Live Site:** 

A modern, full-stack Doctor Appointment Booking System built with React, Node.js, Express, and MongoDB.

## ✨ Features

- **Smart Doctor Discovery** – Browse, search, and filter doctors by name, specialty, fee, and rating with instant results
- **Secure JWT Authentication** – Register/login with email+password or Google OAuth; private routes stay protected on reload
- **One-Click Appointment Booking** – Book appointments via an intuitive modal with real-time slot selection and instant MongoDB persistence
- **Full Booking Management** – View, update, and delete your appointments from a dedicated dashboard with instant UI updates (no page reload)
- **Dark/Light Theme Toggle** – System-preference aware theme switcher with smooth transitions across all pages
- **Patient Review System** – Leave star ratings and written reviews after booking; doctor profiles display live community feedback

## 🛠 Tech Stack

- **Frontend:** React 18, React Router v6, Tailwind CSS, Swiper.js
- **Auth:** JWT (stored in localStorage) + Google OAuth via Better Auth
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Deployment:** Vercel (client) + Render (server)


## 📁 Project Structure

```
src/
├── components/     # Shared components (Navbar, Footer, Cards, Modals)
├── context/        # AuthContext, ThemeContext
├── pages/
│   ├── Home/       # Hero, Top Doctors, Stats, FAQ
│   ├── Appointments/
│   ├── Doctor/     # Doctor details + booking
│   ├── Auth/       # Login & Register
│   └── Dashboard/  # My Bookings, Profile
└── index.css       # Tailwind + custom styles
```
