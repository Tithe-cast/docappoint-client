import { Link } from 'react-router-dom';
import { FaXTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa6';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M12 4v16M4 12h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <span className="font-heading text-xl text-white">Doc<span className="text-primary-400">Appoint</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-6">
              Connecting patients with the best healthcare professionals. Book appointments effortlessly, anytime, anywhere.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FaXTwitter size={16} />, href: '#', label: 'X (Twitter)' },
                { icon: <FaFacebook size={16} />, href: '#', label: 'Facebook' },
                { icon: <FaLinkedin size={16} />, href: '#', label: 'LinkedIn' },
                { icon: <FaInstagram size={16} />, href: '#', label: 'Instagram' },
              ].map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-9 h-9 bg-slate-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Home', 'All Appointments', 'Dashboard', 'Login', 'Register'].map(l => (
                <li key={l}>
                  <Link to={l === 'Home' ? '/' : `/${l.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-widest uppercase">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <FiMapPin size={14} className="text-primary-400 shrink-0" />
                Dhanmondi, Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <FiPhone size={14} className="text-primary-400 shrink-0" />
                +880 1700-000000
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <FiMail size={14} className="text-primary-400 shrink-0" />
                hello@docappoint.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} DocAppoint. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Built with ❤️ for better healthcare access
          </p>
        </div>
      </div>
    </footer>
  );
}
