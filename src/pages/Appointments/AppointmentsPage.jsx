import { useEffect, useState } from 'react';
import { api } from '../../context/AuthContext';
import DoctorCard from '../../components/DoctorCard';
import Spinner from '../../components/Spinner';
import { FiSearch, FiFilter } from 'react-icons/fi';

export default function AppointmentsPage() {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    document.title = 'All Appointments – DocAppoint';
    api.get('/doctors')
      .then(res => {
        const data = res.data.doctors || res.data;
        setDoctors(data);
        setFiltered(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = doctors.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === 'fee-asc') result = [...result].sort((a, b) => a.fee - b.fee);
    if (sort === 'fee-desc') result = [...result].sort((a, b) => b.fee - a.fee);
    if (sort === 'rating') result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === 'experience') result = [...result].sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
    setFiltered(result);
  }, [search, sort, doctors]);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-heading text-4xl text-gray-900 dark:text-white mb-2">Find Your Doctor</h1>
          <p className="text-gray-500 dark:text-gray-400">Browse and book appointments with expert doctors</p>

          {/* Search & Filter bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by doctor name or specialty..."
                className="input-field pl-11 shadow-sm"
              />
            </div>
            <div className="relative sm:w-56">
              <FiFilter className="absolute left-4 top-3.5 text-gray-400" size={16} />
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="input-field pl-10 shadow-sm appearance-none">
                <option value="">Sort by</option>
                <option value="rating">Highest Rated</option>
                <option value="fee-asc">Fee: Low to High</option>
                <option value="fee-desc">Fee: High to Low</option>
                <option value="experience">Most Experienced</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading text-2xl text-gray-700 dark:text-gray-300 mb-2">No results found</h3>
            <p className="text-gray-500">Try a different search term or clear filters</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Showing <span className="font-semibold text-gray-800 dark:text-white">{filtered.length}</span> doctors
              {search && <span> for "<span className="text-primary-600">{search}</span>"</span>}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(doc => (
                <DoctorCard key={doc._id} doctor={doc} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
