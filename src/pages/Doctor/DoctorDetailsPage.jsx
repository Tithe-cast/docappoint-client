import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../context/AuthContext';
import { useAuth } from '../../context/AuthContext';
import BookingModal from '../../components/BookingModal';
import Spinner from '../../components/Spinner';
import { FiStar, FiMapPin, FiClock, FiCalendar, FiAward, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
