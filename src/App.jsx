mport { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Pages
import HomePage from './pages/Home/HomePage';
import AppointmentsPage from './pages/Appointments/AppointmentsPage';
import DoctorDetailsPage from './pages/Doctor/DoctorDetailsPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import DashboardOverview from './pages/Dashboard/DashboardOverview';
import MyBookingsPage from './pages/Dashboard/MyBookingsPage';
import MyProfilePage from './pages/Dashboard/MyProfilePage';
import NotFoundPage from './pages/NotFoundPage';
