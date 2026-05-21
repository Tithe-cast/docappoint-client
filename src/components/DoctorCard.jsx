import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiStar, FiMapPin, FiClock, FiDollarSign } from 'react-icons/fi';

export default function DoctorCard({ doctor }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (user) {
      navigate(`/doctors/${doctor._id}`);
    } else {
      navigate('/login', { state: { from: { pathname: `/doctors/${doctor._id}` } } });
    }
  };

  return (
    <div className="card p-0 overflow-hidden group flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=10b98a&color=fff&size=300`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="badge bg-primary-500 text-white">
            <FiStar size={11} className="fill-current" />
            {doctor.rating || '4.8'}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="badge bg-white/90 text-primary-700 text-xs">
            {doctor.specialty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg text-gray-900 dark:text-white mb-1">{doctor.name}</h3>
        
        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FiMapPin size={13} className="text-primary-500 shrink-0" />
            <span className="truncate">{doctor.hospital}, {doctor.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FiClock size={13} className="text-primary-500 shrink-0" />
            <span>{doctor.experience} experience</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
            <FiDollarSign size={13} className="text-accent-500 shrink-0" />
            <span>৳{doctor.fee} consultation fee</span>
          </div>
        </div>

        <button onClick={handleViewDetails} className="btn-primary w-full text-sm py-2.5">
          View Details
        </button>
      </div>
    </div>
  );
}
