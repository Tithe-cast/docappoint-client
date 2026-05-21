import { useEffect, useState } from 'react';
import { api } from '../../context/AuthContext';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/Spinner';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiCalendar, FiClock, FiUser, FiPhone, FiX } from 'react-icons/fi';

function UpdateModal({ booking, onClose, onUpdate }) {
  const [form, setForm] = useState({
    patientName: booking.patientName,
    gender: booking.gender,
    phone: booking.phone,
    appointmentDate: booking.appointmentDate?.split('T')[0] || booking.appointmentDate,
    appointmentTime: booking.appointmentTime,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.patch(`/appointments/${booking._id}`, form);
      onUpdate(res.data);
      toast.success('Appointment updated successfully!');
      onClose();
    } catch {
      toast.error('Update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700">
          <h2 className="font-heading text-xl text-gray-900 dark:text-white">Update Appointment</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <FiX size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Read-only fields */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-slate-800 flex gap-4 items-center">
          <div>
            <p className="text-xs text-gray-400">Doctor</p>
            <p className="font-semibold text-gray-800 dark:text-white">{booking.doctorName}</p>
          </div>
          <div className="ml-auto">
            <p className="text-xs text-gray-400">Email</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{booking.userEmail}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Patient Name</label>
            <input type="text" value={form.patientName} onChange={e => setForm(p => ({...p, patientName: e.target.value}))}
              required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Gender</label>
            <select value={form.gender} onChange={e => setForm(p => ({...p, gender: e.target.value}))} required className="input-field">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
            <input type="tel" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))}
              required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Appointment Date</label>
            <input type="date" value={form.appointmentDate}
              onChange={e => setForm(p => ({...p, appointmentDate: e.target.value}))}
              min={new Date().toISOString().split('T')[0]} required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Appointment Time</label>
            <select value={form.appointmentTime} onChange={e => setForm(p => ({...p, appointmentTime: e.target.value}))} required className="input-field">
              {['09:00 AM','10:00 AM','10:30 AM','11:00 AM','02:00 PM','03:00 PM','04:00 PM','05:00 PM'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1 text-sm py-2.5">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 text-sm py-2.5 disabled:opacity-60">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    document.title = 'My Bookings – DocAppoint';
    api.get(`/appointments?email=${user.email}`)
      .then(res => setBookings(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await api.delete(`/appointments/${id}`);
      setBookings(prev => prev.filter(b => b._id !== id));
      toast.success('Appointment deleted successfully!');
    } catch {
      toast.error('Delete failed. Please try again.');
    }
  };

  const handleUpdate = (updated) => {
    setBookings(prev => prev.map(b => b._id === updated._id ? updated : b));
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-heading text-3xl text-gray-900 dark:text-white">My Bookings</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your upcoming appointments</p>
        </div>
        <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 text-sm px-3 py-1.5">
          {bookings.length} bookings
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="font-heading text-2xl text-gray-700 dark:text-gray-300 mb-2">No bookings yet</h3>
          <p className="text-gray-500 mb-6">Book your first appointment with a doctor</p>
          <a href="/appointments" className="btn-primary inline-block">Browse Doctors</a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b._id} className="card p-0 overflow-hidden">
              <div className="grid sm:grid-cols-4 gap-0">
                {/* Doctor image */}
                <div className="sm:col-span-1 h-36 sm:h-auto">
                  <img src={b.doctorImage}
                    alt={b.doctorName}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(b.doctorName)}&background=10b98a&color=fff`; }} />
                </div>

                {/* Info */}
                <div className="sm:col-span-3 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{b.doctorName}</h3>
                    <p className="text-primary-600 text-sm">{b.doctorSpecialty}</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <FiUser size={12} className="text-primary-500" /> {b.patientName}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <FiPhone size={12} className="text-primary-500" /> {b.phone}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <FiCalendar size={12} className="text-primary-500" />
                        {new Date(b.appointmentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <FiClock size={12} className="text-primary-500" /> {b.appointmentTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => setEditing(b)}
                      className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl border border-primary-200 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-medium">
                      <FiEdit2 size={14} /> Update
                    </button>
                    <button onClick={() => handleDelete(b._id)}
                      className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium">
                      <FiTrash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && <UpdateModal booking={editing} onClose={() => setEditing(null)} onUpdate={handleUpdate} />}
    </div>
  );
}
