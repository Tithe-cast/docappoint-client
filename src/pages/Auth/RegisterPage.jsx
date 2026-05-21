import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

function PasswordRule({ valid, text }) {
  return (
    <li className={`flex items-center gap-2 text-xs ${valid ? 'text-green-500' : 'text-gray-400'}`}>
      {valid ? <FiCheck size={12} /> : <FiX size={12} />}
      {text}
    </li>
  );
}

export default function RegisterPage() {
  const { register, googleLogin, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', photoURL: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Register – DocAppoint';
    if (user) navigate('/');
  }, [user]);

  const rules = {
    uppercase: /[A-Z]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
    length: form.password.length >= 6,
  };
  const passwordValid = Object.values(rules).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!passwordValid) {
      setError('Password does not meet the requirements');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.photoURL, form.password);
      toast.success('Account created! Please log in.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-md">
        <div className="card p-8 animate-fade-up">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M12 4v16M4 12h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
          </div>

          <h1 className="font-heading text-3xl text-center text-gray-900 dark:text-white mb-1">Register</h1>
          <p className="text-gray-500 text-center text-sm mb-8">Create your DocAppoint account</p>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-xl p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                <input type="text" required value={form.name}
                  onChange={e => setForm(p => ({...p, name: e.target.value}))}
                  placeholder="John Doe" className="input-field pl-10" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                <input type="email" required value={form.email}
                  onChange={e => setForm(p => ({...p, email: e.target.value}))}
                  placeholder="you@example.com" className="input-field pl-10" />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Photo URL <span className="text-gray-400">(optional)</span></label>
              <div className="relative">
                <FiImage className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                <input type="url" value={form.photoURL}
                  onChange={e => setForm(p => ({...p, photoURL: e.target.value}))}
                  placeholder="https://example.com/photo.jpg" className="input-field pl-10" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                <input type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm(p => ({...p, password: e.target.value}))}
                  placeholder="••••••••" className="input-field pl-10 pr-10" />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>

              {/* Password rules */}
              {form.password && (
                <ul className="mt-2 space-y-1 pl-1">
                  <PasswordRule valid={rules.length} text="Minimum 6 characters" />
                  <PasswordRule valid={rules.uppercase} text="At least one uppercase letter" />
                  <PasswordRule valid={rules.lowercase} text="At least one lowercase letter" />
                </ul>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white dark:bg-slate-900 text-xs text-gray-400">or sign up with</span>
            </div>
          </div>

          <button onClick={googleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
            <FcGoogle size={20} /> Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
