import { useState } from 'react';
import { FiX, FiUser, FiPhone, FiCalendar, FiClock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { api } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function BookingModal({ doctor, onClose }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patientName: user?.name || '',
    gender: '',
    phone: '',
    appointmentDate: '',
    appointmentTime: '',
  });

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.gender || !form.phone || !form.appointmentDate || !form.appointmentTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      await api.post('/appointments', {
        userEmail: user.email,
        doctorId: doctor._id,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        doctorImage: doctor.image,
        hospital: doctor.hospital,
        fee: doctor.fee,
        ...form,
      });
      toast.success('Appointment booked successfully!');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700">
          <div>
            <h2 className="font-heading text-xl text-gray-900 dark:text-white">Book Appointment</h2>
            <p className="text-sm text-gray-500 mt-0.5">with {doctor.name}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <FiX size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Doctor info summary */}
        <div className="px-6 py-4 bg-primary-50 dark:bg-primary-900/20 flex items-center gap-4">
          <img src={doctor.image} alt={doctor.name}
            className="w-14 h-14 rounded-xl object-cover border-2 border-primary-200"
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=10b98a&color=fff`; }} />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{doctor.name}</p>
            <p className="text-sm text-primary-600">{doctor.specialty}</p>
            <p className="text-sm font-bold text-accent-600 mt-0.5">৳{doctor.fee}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Read-only email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Email</label>
            <input type="email" value={user?.email || ''} readOnly
              className="input-field bg-gray-50 dark:bg-slate-700 cursor-not-allowed text-gray-500" />
          </div>

          {/* Patient name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Patient Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-gray-400" size={16} />
              <input type="text" name="patientName" value={form.patientName}
                onChange={handleChange} required placeholder="Full name"
                className="input-field pl-10" />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Gender <span className="text-red-500">*</span>
            </label>
            <select name="gender" value={form.gender} onChange={handleChange} required className="input-field">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-3.5 text-gray-400" size={16} />
              <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                required placeholder="01XXXXXXXXX" className="input-field pl-10" />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Appointment Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-3.5 text-gray-400" size={16} />
              <input type="date" name="appointmentDate" value={form.appointmentDate}
                onChange={handleChange} required
                min={new Date().toISOString().split('T')[0]}
                className="input-field pl-10" />
            </div>
          </div>

          {/* Time slot */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Appointment Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiClock className="absolute left-3 top-3.5 text-gray-400" size={16} />
              <select name="appointmentTime" value={form.appointmentTime} onChange={handleChange} required className="input-field pl-10">
                <option value="">Select time slot</option>
                {doctor.availability?.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="btn-outline flex-1 text-sm py-2.5">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="btn-primary flex-1 text-sm py-2.5 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
