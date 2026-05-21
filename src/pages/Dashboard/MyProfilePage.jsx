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