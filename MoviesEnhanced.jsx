import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Star,
  Filter,
  Eye
} from 'lucide-react';
import MovieForm from '../components/MovieForm';
import Toast from '../components/Toast';

const initialMovies = [
  {
    id: 1,
    title: 'The Quantum Realm',
    genre: 'Sci-Fi',
    duration: 148,
    rating: 4.8,
    releaseDate: '2024-01-15',
    ticketPrice: 12.99,
    status: 'Active',
    screenings: 24,
    description: 'An epic journey through quantum dimensions and parallel universes',
    director: 'Christopher Nolan',
    language: 'English',
    ageRating: 'PG-13'
  },
  {
    id: 2,
    title: 'Space Odyssey',
    genre: 'Adventure',
    duration: 156,
    rating: 4.6,
    releaseDate: '2024-01-10',
    ticketPrice: 12.99,
    status: 'Active',
    screenings: 18,
    description: 'An thrilling adventure across the vast cosmos',
    director: 'Denis Villeneuve',
    language: 'English',
    ageRating: 'PG'
  },
  {
    id: 3,
    title: 'Midnight Dreams',
    genre: 'Drama',
    duration: 132,
    rating: 4.5,
    releaseDate: '2024-01-08',
    ticketPrice: 10.99,
    status: 'Active',
    screenings: 12,
    description: 'A heartfelt drama exploring dreams and personal destiny',
    director: 'Damien Chazelle',
    language: 'English',
    ageRating: 'PG-13'
  },
  {
    id: 4,
    title: 'The Lost City',
    genre: 'Adventure',
    duration: 140,
    rating: 4.3,
    releaseDate: '2024-01-05',
    ticketPrice: 10.99,
    status: 'Coming Soon',
    screenings: 0,
    description: 'Ancient mysteries await in a forgotten city deep in the jungle',
    director: 'Jon Watts',
    language: 'English',
    ageRating: 'PG-13'
  },
  {
    id: 5,
    title: 'Cyber Dreams',
    genre: 'Sci-Fi',
    duration: 144,
    rating: 4.7,
    releaseDate: '2024-01-01',
    ticketPrice: 12.99,
    status: 'Active',
    screenings: 20,
    description: 'A cyberpunk thriller set in a stunning digital world',
    director: 'Rian Johnson',
    language: 'English',
    ageRating: 'R'
  },
  {
    id: 6,
    title: 'Love in Paris',
    genre: 'Romance',
    duration: 120,
    rating: 4.4,
    releaseDate: '2023-12-28',
    ticketPrice: 9.99,
    status: 'Archived',
    screenings: 5,
    description: 'A romantic tale set in the magical city of love',
    director: 'Greta Gerwig',
    language: 'French',
    ageRating: 'PG'
  }
];

export default function MoviesEnhanced() {
  const [movies, setMovies] = useState(initialMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingMovie, setEditingMovie] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);

  const itemsPerPage = 6;
  const genres = ['All', 'Sci-Fi', 'Adventure', 'Drama', 'Romance', 'Action', 'Horror', 'Thriller'];
  const statuses = ['All', 'Active', 'Coming Soon', 'Archived'];

  // Filter movies
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.director.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGenre = genreFilter === 'All' || movie.genre === genreFilter;
      const matchStatus = statusFilter === 'All' || movie.status === statusFilter;
      return matchSearch && matchGenre && matchStatus;
    });
  }, [movies, searchTerm, genreFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Show notification
  const showNotif = (message, type = 'success') => {
    setNotification({ message, type });
  };

  // Handle add movie
  const handleAddMovie = (formData) => {
    const newMovie = {
      ...formData,
      id: Math.max(...movies.map(m => m.id), 0) + 1,
      duration: parseInt(formData.duration),
      rating: parseFloat(formData.rating),
      ticketPrice: parseFloat(formData.ticketPrice),
      screenings: parseInt(formData.screenings)
    };
    setMovies(prev => [newMovie, ...prev]);
    showNotif(`✨ Movie "${formData.title}" added successfully!`, 'success');
    setShowForm(false);
  };

  // Handle edit movie
  const handleEditMovie = (movie) => {
    setEditingMovie({
      ...movie,
      duration: movie.duration.toString(),
      rating: movie.rating.toString(),
      ticketPrice: movie.ticketPrice.toString(),
      screenings: movie.screenings.toString()
    });
    setShowForm(true);
  };

  // Handle update movie
  const handleUpdateMovie = (formData) => {
    setMovies(prev => prev.map(m => 
      m.id === editingMovie.id 
        ? {
            ...formData,
            id: editingMovie.id,
            duration: parseInt(formData.duration),
            rating: parseFloat(formData.rating),
            ticketPrice: parseFloat(formData.ticketPrice),
            screenings: parseInt(formData.screenings)
          }
        : m
    ));
    showNotif(`✨ Movie "${formData.title}" updated successfully!`, 'success');
    setShowForm(false);
    setEditingMovie(null);
  };

  // Handle delete movie
  const handleDeleteMovie = (id) => {
    const movie = movies.find(m => m.id === id);
    setMovies(prev => prev.filter(m => m.id !== id));
    showNotif(`🗑️ Movie "${movie.title}" deleted!`, 'info');
  };

  // Handle form submit
  const handleFormSubmit = (formData) => {
    if (editingMovie) {
      handleUpdateMovie(formData);
    } else {
      handleAddMovie(formData);
    }
  };

  // Handle open add form
  const handleOpenAddForm = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  // Handle close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMovie(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🎬 Movies Management</h1>
          <p className="text-slate-400">Manage your movie catalog, content, and screenings</p>
        </div>
        <button
          onClick={handleOpenAddForm}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg"
        >
          <Plus size={20} />
          Add Movie
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-4 border border-slate-600">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or director..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Genre Filter */}
        <select
          value={genreFilter}
          onChange={(e) => {
            setGenreFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          {genres.map(g => <option key={g}>{g}</option>)}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">
          Showing <span className="text-cyan-400 font-semibold">{paginatedMovies.length}</span> of <span className="text-cyan-400 font-semibold">{filteredMovies.length}</span> movies
        </span>
        <span className="text-slate-400">
          Total in library: <span className="text-cyan-400 font-semibold">{movies.length}</span>
        </span>
      </div>

      {/* Movies Grid */}
      {paginatedMovies.length === 0 ? (
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-12 border border-slate-600 text-center">
          <Filter size={48} className="mx-auto text-slate-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Movies Found</h3>
          <p className="text-slate-400">Try adjusting your filters or search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg border border-slate-600 overflow-hidden hover:border-cyan-500 transition group shadow-lg"
            >
              {/* Movie Header */}
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 border-b border-slate-600">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-lg line-clamp-2">{movie.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      <span className="text-cyan-400 font-semibold">{movie.genre}</span> • {movie.duration} min
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold text-yellow-400">{movie.rating}</span>
                  </div>
                </div>
              </div>

              {/* Movie Details */}
              <div className="p-4 space-y-3">
                {/* Description */}
                <p className="text-sm text-slate-300 line-clamp-2">{movie.description}</p>

                {/* Director */}
                <div className="text-sm">
                  <span className="text-slate-400">Director:</span>
                  <p className="text-white font-semibold">{movie.director}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 bg-slate-700/50 p-3 rounded-lg">
                  <div>
                    <p className="text-xs text-slate-400">Status</p>
                    <p className={`text-sm font-semibold ${
                      movie.status === 'Active' ? 'text-green-400' :
                      movie.status === 'Coming Soon' ? 'text-blue-400' :
                      'text-slate-400'
                    }`}>
                      {movie.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Price</p>
                    <p className="text-sm font-semibold text-cyan-400">${movie.ticketPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Screenings</p>
                    <p className="text-sm font-semibold text-white">{movie.screenings}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Rating</p>
                    <p className="text-sm font-semibold text-white">{movie.ageRating}</p>
                  </div>
                </div>

                {/* Release Info */}
                <div className="text-xs text-slate-400">
                  <p>Release: <span className="text-white">{new Date(movie.releaseDate).toLocaleDateString()}</span></p>
                  <p>Language: <span className="text-white">{movie.language}</span></p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-slate-600 p-4 flex items-center gap-2">
                <button
                  onClick={() => handleEditMovie(movie)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 px-3 rounded-lg transition font-semibold text-sm"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMovie(movie.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 px-3 rounded-lg transition font-semibold text-sm"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-lg">
          <span className="text-sm text-slate-400">
            Page <span className="text-cyan-400 font-semibold">{currentPage}</span> of <span className="text-cyan-400 font-semibold">{totalPages}</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-lg transition font-semibold text-sm ${
                  currentPage === page
                    ? 'bg-cyan-500 text-white'
                    : 'hover:bg-slate-700 text-slate-300'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Movie Form Modal */}
      {showForm && (
        <MovieForm
          initialData={editingMovie}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseForm}
          isEditing={!!editingMovie}
        />
      )}

      {/* Notification Toast */}
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}