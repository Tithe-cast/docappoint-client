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
useEffect(() => {
    api.get(`/doctors/${id}`)
      .then(res => {
        setDoctor(res.data);
        document.title = `${res.data.name} – DocAppoint`;
      })
      .catch(() => navigate('/appointments'))
      .finally(() => setLoading(false));

    api.get(`/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(() => {});
  }, [id]);

  const handleBook = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/doctors/${id}` } } });
      return;
    }
    setShowModal(true);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setSubmitting(true);
    try {
      const res = await api.post('/reviews', {
        doctorId: id,
        doctorName: doctor.name,
        userName: user.name,
        userPhoto: user.photoURL,
        ...reviewForm,
      });
      setReviews(prev => [res.data, ...prev]);
      setReviewForm({ rating: 5, comment: '' });
      toast.success('Review submitted successfully!');
    } catch {
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner full />;
  if (!doctor) return null;

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back button */}
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-6 transition-colors">
          <FiArrowLeft size={16} /> Back
        </button>

        {/* Doctor card */}
        <div className="card p-0 overflow-hidden mb-8">
          <div className="grid md:grid-cols-3 gap-0">
            {/* Image */}
            <div className="md:col-span-1 h-72 md:h-auto relative">
              <img src={doctor.image} alt={doctor.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=10b98a&color=fff&size=400`; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 md:hidden">
                <span className="badge bg-primary-500 text-white text-sm px-3 py-1.5">
                  <FiStar size={12} className="fill-current mr-1" /> {doctor.rating || '4.8'}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-heading text-3xl text-gray-900 dark:text-white">{doctor.name}</h1>
                  <p className="text-primary-600 font-semibold mt-1">{doctor.specialty}</p>
                </div>
                <span className="hidden md:flex badge bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 text-base px-4 py-2">
                  <FiStar size={14} className="fill-current mr-1" /> {doctor.rating || '4.8'}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">{doctor.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: <FiAward />, label: 'Experience', value: doctor.experience },
                  { icon: <FiMapPin />, label: 'Hospital', value: doctor.hospital },
                  { icon: <FiMapPin />, label: 'Location', value: doctor.location },
                  { icon: <FiCalendar />, label: 'Fee', value: `৳${doctor.fee}` },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability */}
              {doctor.availability?.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FiClock size={14} className="text-primary-500" /> Available Hours
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availability.map(slot => (
                      <span key={slot} className="text-xs px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-lg border border-primary-200 dark:border-primary-800">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={handleBook} className="btn-primary w-full sm:w-auto px-10">
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="card p-8">
          <h2 className="font-heading text-2xl text-gray-900 dark:text-white mb-6">
            Patient Reviews ({reviews.length})
          </h2>

          {/* Add review */}
          {user && (
            <form onSubmit={handleReview} className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Write a Review</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} type="button"
                      onClick={() => setReviewForm(p => ({...p, rating: n}))}
                      className={`text-2xl transition-transform hover:scale-110 ${n <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={reviewForm.comment}
                onChange={e => setReviewForm(p => ({...p, comment: e.target.value}))}
                required rows={3}
                placeholder="Share your experience with this doctor..."
                className="input-field resize-none mb-4"
              />
              <button type="submit" disabled={submitting} className="btn-primary text-sm py-2.5 px-6 disabled:opacity-60">
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}

          {/* Reviews list */}
          {reviews.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="flex gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <img src={r.userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.userName)}&background=10b98a&color=fff`}
                    alt={r.userName}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=User&background=10b98a&color=fff`; }} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm text-gray-800 dark:text-white">{r.userName}</p>
                      <span className="text-yellow-400 text-sm">{'★'.repeat(r.rating)}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{r.comment}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && <BookingModal doctor={doctor} onClose={() => setShowModal(false)} />}
    </div>
  );
}
