import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiMail, FiImage, FiEdit2, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

function UpdateProfileModal({ user, onClose, onUpdate }) {
  const [form, setForm] = useState({ name: user.name, photoURL: user.photoURL || '' });
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await updateProfile(form.name, form.photoURL);
      onUpdate(updated.user);
      toast.success('Profile updated successfully!');
      onClose();
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700">
          <h2 className="font-heading text-xl text-gray-900 dark:text-white">Update Profile</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <FiX size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
              <input type="text" value={form.name} required
                onChange={e => setForm(p => ({...p, name: e.target.value}))}
                className="input-field pl-10" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Photo URL</label>
            <div className="relative">
              <FiImage className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
              <input type="url" value={form.photoURL}
                onChange={e => setForm(p => ({...p, photoURL: e.target.value}))}
                placeholder="https://example.com/photo.jpg"
                className="input-field pl-10" />
            </div>
            {form.photoURL && (
              <div className="mt-3 flex items-center gap-3">
                <img src={form.photoURL} alt="Preview"
                  className="w-12 h-12 rounded-xl object-cover border-2 border-primary-200"
                  onError={(e) => { e.target.style.display = 'none'; }} />
                <span className="text-xs text-gray-400">Preview</span>
              </div>
            )}
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

export default function MyProfilePage() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    document.title = 'My Profile – DocAppoint';
  }, []);

  return (
    <div>
      <h2 className="font-heading text-3xl text-gray-900 dark:text-white mb-8">My Profile</h2>

      <div className="max-w-2xl">
        <div className="card p-8">
          {/* Avatar */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100 dark:border-slate-700">
            <div className="relative">
              <img
                src={localUser?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(localUser?.name || 'User')}&background=10b98a&color=fff&size=200`}
                alt={localUser?.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-primary-100"
                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(localUser?.name || 'User')}&background=10b98a&color=fff&size=200`; }}
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center border-2 border-white">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
            <div>
              <h3 className="font-heading text-2xl text-gray-900 dark:text-white">{localUser?.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{localUser?.email}</p>
              <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 mt-2">
                Patient
              </span>
            </div>
          </div>

          {/* Info cards */}
          <div className="space-y-4 mb-8">
            {[
              { icon: <FiUser />, label: 'Full Name', value: localUser?.name },
              { icon: <FiMail />, label: 'Email Address', value: localUser?.email },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                <div className="w-9 h-9 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                  <p className="font-medium text-gray-800 dark:text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2">
            <FiEdit2 size={16} /> Update Profile
          </button>
        </div>
      </div>

      {showModal && (
        <UpdateProfileModal
          user={localUser}
          onClose={() => setShowModal(false)}
          onUpdate={(updated) => setLocalUser(updated)}
        />
      )}
    </div>
  );
}
