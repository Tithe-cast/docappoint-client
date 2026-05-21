import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiCalendar, FiUser, FiGrid } from 'react-icons/fi';

export default function DashboardLayout() {
  const { user } = useAuth();

  const navItems = [
    { to: '/dashboard', end: true, icon: <FiGrid size={18} />, label: 'Overview' },
    { to: '/dashboard/bookings', icon: <FiCalendar size={18} />, label: 'My Bookings' },
    { to: '/dashboard/profile', icon: <FiUser size={18} />, label: 'My Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 shrink-0">
            {/* User info */}
            <div className="card p-5 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=10b98a&color=fff`}
                  alt={user?.name}
                  className="w-11 h-11 rounded-xl object-cover border-2 border-primary-200"
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=User&background=10b98a&color=fff`; }}
                />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="card p-2">
              <nav className="space-y-1">
                {navItems.map(item => (
                  <NavLink key={item.to} to={item.to} end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`
                    }>
                    {item.icon} {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
