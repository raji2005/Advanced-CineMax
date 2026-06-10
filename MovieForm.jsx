import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { validateMovie, hasErrors, hasFieldError, getFieldError } from '../utils/validation';

export default function MovieForm({ 
  initialData = null, 
  onSubmit, 
  onCancel,
  isEditing = false 
}) {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      genre: 'Sci-Fi',
      duration: '120',
      rating: '4.5',
      releaseDate: new Date().toISOString().split('T')[0],
      ticketPrice: '12.99',
      status: 'Active',
      screenings: '0',
      description: '',
      director: '',
      language: 'English',
      ageRating: 'PG-13'
    }
  );

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genres = ['Sci-Fi', 'Action', 'Drama', 'Comedy', 'Romance', 'Horror', 'Adventure', 'Thriller'];
  const statuses = ['Active', 'Coming Soon', 'Archived'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Hindi', 'Japanese'];
  const ageRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (touched[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const fieldData = { [name]: formData[name] };
    const fieldErrors = validateMovie({ ...formData, ...fieldData });
    
    if (fieldErrors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const allFields = Object.keys(formData);
    setTouched(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    const validationErrors = validateMovie(formData);
    
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 500);
  };

  const InputField = ({ label, name, type = 'text', required = true, placeholder = '' }) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition ${
          hasFieldError(errors, name) && touched[name]
            ? 'border-red-500 focus:border-red-500'
            : 'border-slate-600'
        }`}
      />
      {hasFieldError(errors, name) && touched[name] && (
        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={14} />
          {getFieldError(errors, name)}
        </p>
      )}
    </div>
  );

  const SelectField = ({ label, name, options, required = true }) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white focus:outline-none focus:border-cyan-500 transition ${
          hasFieldError(errors, name) && touched[name]
            ? 'border-red-500 focus:border-red-500'
            : 'border-slate-600'
        }`}
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {hasFieldError(errors, name) && touched[name] && (
        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={14} />
          {getFieldError(errors, name)}
        </p>
      )}
    </div>
  );

  const TextareaField = ({ label, name, required = true, rows = 3 }) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        name={name}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={rows}
        placeholder="Enter description..."
        className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition resize-none ${
          hasFieldError(errors, name) && touched[name]
            ? 'border-red-500 focus:border-red-500'
            : 'border-slate-600'
        }`}
      />
      <div className="mt-1 text-xs text-slate-400">
        {formData[name]?.length || 0} / 500 characters
      </div>
      {hasFieldError(errors, name) && touched[name] && (
        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={14} />
          {getFieldError(errors, name)}
        </p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full border border-slate-600 shadow-xl max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-600 sticky top-0 bg-slate-800">
          <h2 className="text-2xl font-bold text-white">
            {isEditing ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-cyan-400 mb-4 uppercase tracking-wide">
              Basic Information
            </h3>
            
            <InputField label="Title" name="title" placeholder="Movie title" />
            
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Genre" name="genre" options={genres} />
              <InputField label="Duration (minutes)" name="duration" type="number" placeholder="120" />
            </div>

            <TextareaField label="Description" name="description" rows={3} />
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-cyan-400 mb-4 uppercase tracking-wide">
              Ratings & Pricing
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Rating (0-5)" name="rating" type="number" placeholder="4.5" min="0" max="5" step="0.1" />
              <InputField label="Ticket Price ($)" name="ticketPrice" type="number" placeholder="12.99" min="0" step="0.01" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Age Rating" name="ageRating" options={ageRatings} />
              <InputField label="Screenings" name="screenings" type="number" placeholder="0" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-cyan-400 mb-4 uppercase tracking-wide">
              Release & Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Release Date" name="releaseDate" type="date" />
              <SelectField label="Status" name="status" options={statuses} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Director" name="director" placeholder="Director name" />
              <SelectField label="Language" name="language" options={languages} />
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-semibold text-slate-300 mb-3">Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Title:</span>
                <p className="text-white font-semibold">{formData.title || 'Not entered'}</p>
              </div>
              <div>
                <span className="text-slate-400">Genre:</span>
                <p className="text-white font-semibold">{formData.genre}</p>
              </div>
              <div>
                <span className="text-slate-400">Price:</span>
                <p className="text-white font-semibold">${formData.ticketPrice}</p>
              </div>
              <div>
                <span className="text-slate-400">Status:</span>
                <p className="text-white font-semibold">{formData.status}</p>
              </div>
            </div>
          </div>

          {hasErrors(errors) && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2">
              <AlertCircle size={18} className="text-red-400" />
              <p className="text-sm text-red-400">
                Please fix {Object.keys(errors).length} error(s) before submitting
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-slate-600">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-700 rounded-lg transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition font-semibold py-2"
            >
              <Save size={18} />
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Movie' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}