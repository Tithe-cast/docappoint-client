import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../context/AuthContext';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';

export default function DashboardOverview() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard – DocAppoint';
    api.get(`/appointments?email=${user.email}`)
      .then(res => setBookings(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const upcoming = bookings.filter(b => new Date(b.appointmentDate) >= new Date());
  const past = bookings.filter(b => new Date(b.appointmentDate) < new Date());

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-heading text-3xl text-gray-900 dark:text-white">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Here's your health dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Total Bookings', value: bookings.length, icon: <FiCalendar />, color: 'primary' },
          { label: 'Upcoming', value: upcoming.length, icon: <FiClock />, color: 'accent' },
        ].map(s => (
          <div key={s.label} className="card p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
              s.color === 'primary' ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/20' : 'bg-orange-100 text-orange-500 dark:bg-orange-900/20'
            }`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Recent Bookings</h3>
          <Link to="/dashboard/bookings" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
            View all <FiArrowRight size={13} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8"><div className="spinner mx-auto" /></div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-500 text-sm mb-4">No appointments yet</p>
            <Link to="/appointments" className="btn-primary text-sm py-2 px-5">Book Now</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 4).map(b => (
              <div key={b._id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
                <img src={b.doctorImage} alt={b.doctorName}
                  className="w-10 h-10 rounded-lg object-cover"
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(b.doctorName)}&background=10b98a&color=fff`; }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-800 dark:text-white truncate">{b.doctorName}</p>
                  <p className="text-xs text-gray-400">{b.appointmentDate?.split('T')[0]} · {b.appointmentTime}</p>
                </div>
                <span className={`badge text-xs ${
                  new Date(b.appointmentDate) >= new Date()
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-slate-400'
                }`}>
                  {new Date(b.appointmentDate) >= new Date() ? 'Upcoming' : 'Past'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
