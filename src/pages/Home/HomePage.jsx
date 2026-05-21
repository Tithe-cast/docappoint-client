import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../context/AuthContext';
import DoctorCard from '../../components/DoctorCard';
import Spinner from '../../components/Spinner';
import { FiArrowRight, FiCheckCircle, FiStar, FiUsers, FiCalendar, FiAward, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const slides = [
  {
    title: 'Book Your Doctor\nAppointment Online',
    subtitle: 'Connect with top-rated specialists in minutes. No waiting rooms, no hassle.',
    bg: 'from-primary-900 to-primary-700',
    accent: 'bg-primary-500',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
  },
  {
    title: 'Expert Specialists\nAt Your Fingertips',
    subtitle: 'Choose from hundreds of experienced doctors across all medical specialties.',
    bg: 'from-slate-900 to-slate-700',
    accent: 'bg-accent-500',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80',
  },
  {
    title: 'Your Health,\nOur Priority',
    subtitle: 'Secure, reliable, and easy-to-use appointment management for patients.',
    bg: 'from-emerald-900 to-teal-700',
    accent: 'bg-emerald-400',
    img: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
  },
];

const stats = [
  { icon: <FiUsers size={28} />, value: '10,000+', label: 'Happy Patients' },
  { icon: <FiAward size={28} />, value: '500+', label: 'Expert Doctors' },
  { icon: <FiCalendar size={28} />, value: '50,000+', label: 'Appointments Booked' },
  { icon: <FiStar size={28} />, value: '4.9/5', label: 'Average Rating' },
];

const specialties = [
  { name: 'Cardiology', icon: '❤️', count: 24 },
  { name: 'Neurology', icon: '🧠', count: 18 },
  { name: 'Orthopedics', icon: '🦴', count: 32 },
  { name: 'Pediatrics', icon: '👶', count: 29 },
  { name: 'Dermatology', icon: '🔬', count: 15 },
  { name: 'Ophthalmology', icon: '👁️', count: 21 },
];

const faqs = [
  { q: 'How do I book an appointment?', a: 'Browse our doctors, click "View Details" on your preferred doctor, then click "Book Appointment". Fill in the form and confirm. It\'s that simple!' },
  { q: 'Can I cancel or reschedule my appointment?', a: 'Yes! Visit your Dashboard > My Bookings to update or cancel any upcoming appointment at any time.' },
  { q: 'Is my personal health information secure?', a: 'Absolutely. We use JWT-based authentication and encrypted data storage. Your health information is private and secure.' },
  { q: 'What payment methods are accepted?', a: 'Currently, payments are made directly to the doctor. We support cash and mobile banking at the consultation.' },
];

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'DocAppoint – Book Doctor Appointments Online';
    api.get('/doctors?limit=3&sort=rating')
      .then(res => setDoctors(res.data.doctors || res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO SLIDER ─── */}
      <section className="relative pt-16">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-[90vh] min-h-[600px]"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className={`relative h-full bg-gradient-to-br ${slide.bg} flex items-center`}>
                {/* Background image */}
                <div className="absolute inset-0 opacity-20">
                  <img src={slide.img} alt="" className="w-full h-full object-cover" />
                </div>
                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white">
                    <div className={`inline-flex items-center gap-2 ${slide.accent} bg-opacity-20 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6`}>
                      <FiCheckCircle size={14} />
                      Trusted by 10,000+ patients
                    </div>
                    <h1 className="font-heading text-5xl lg:text-6xl leading-tight mb-6 whitespace-pre-line">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-white/80 mb-8 max-w-md">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link to="/appointments" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold py-3 px-7 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg">
                        Browse Doctors <FiArrowRight size={16} />
                      </Link>
                      {!user && (
                        <Link to="/register" className="border-2 border-white/50 text-white hover:bg-white/10 font-semibold py-3 px-7 rounded-xl transition-all">
                          Get Started Free
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Floating card */}
                  <div className="hidden lg:flex justify-end">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 max-w-sm w-full">
                      <div className="grid grid-cols-2 gap-4">
                        {stats.slice(0, 4).map(s => (
                          <div key={s.label} className="bg-white/10 rounded-2xl p-4 text-center">
                            <div className="text-primary-300 mb-2 flex justify-center">{s.icon}</div>
                            <p className="text-2xl font-bold text-white">{s.value}</p>
                            <p className="text-xs text-white/70 mt-0.5">{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="bg-primary-500 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <div className="text-primary-100 mb-1">{s.icon}</div>
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-sm text-primary-100">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TOP RATED DOCTORS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 mb-4">
            ⭐ Top Rated
          </span>
          <h2 className="section-title mb-4">Meet Our Expert Doctors</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Highly qualified specialists trusted by thousands of patients for their exceptional care.
          </p>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map(doc => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/appointments" className="btn-outline inline-flex items-center gap-2">
            View All Doctors <FiArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── SPECIALTIES ─── */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge bg-accent-100 text-accent-600 dark:bg-orange-900/30 dark:text-orange-400 mb-4">
              🏥 Specialties
            </span>
            <h2 className="section-title mb-4">Find by Specialty</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              We cover all major medical disciplines with board-certified specialists.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {specialties.map(s => (
              <Link key={s.name} to="/appointments"
                className="card p-5 text-center hover:border-primary-300 hover:shadow-glow group cursor-pointer">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{s.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.count} doctors</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="section-title mb-4">How It Works</h2>
          <p className="text-gray-500 dark:text-gray-400">Book an appointment in 3 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-14 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary-200 to-primary-200 z-0" />

          {[
            { step: '01', icon: '🔍', title: 'Search Doctor', desc: 'Browse our directory of verified specialists by specialty, location, or availability.' },
            { step: '02', icon: '📅', title: 'Book Appointment', desc: 'Select your preferred date and time slot. Fill in your details and confirm instantly.' },
            { step: '03', icon: '✅', title: 'Get Consultation', desc: 'Visit the doctor at the scheduled time. Manage or reschedule anytime from your dashboard.' },
          ].map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-28 h-28 bg-primary-50 dark:bg-primary-900/20 rounded-3xl flex flex-col items-center justify-center mb-6 border-2 border-primary-100 dark:border-primary-800">
                <span className="text-4xl">{s.icon}</span>
              </div>
              <span className="text-xs font-bold tracking-widest text-primary-500 mb-2">{s.step}</span>
              <h3 className="font-heading text-xl text-gray-900 dark:text-white mb-3">{s.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500 dark:text-gray-400">Everything you need to know about DocAppoint</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-gray-900 dark:text-white pr-4">{faq.q}</span>
                  {openFaq === i ? <FiChevronUp className="text-primary-500 shrink-0" /> : <FiChevronDown className="text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-slate-700 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      {!user && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,white,transparent_50%)]" />
            </div>
            <div className="relative">
              <h2 className="font-heading text-4xl mb-4">Ready to Book Your Appointment?</h2>
              <p className="text-primary-100 text-lg mb-8 max-w-lg mx-auto">
                Join thousands of patients who trust DocAppoint for their healthcare needs.
              </p>
              <Link to="/register" className="bg-white text-primary-700 hover:bg-primary-50 font-bold py-3 px-8 rounded-xl transition-all inline-flex items-center gap-2 shadow-lg">
                Create Free Account <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
