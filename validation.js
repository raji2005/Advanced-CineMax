// Form validation utilities
export const validateMovie = (movieData) => {
  const errors = {};

  // Title validation
  if (!movieData.title || movieData.title.trim() === '') {
    errors.title = 'Title is required';
  } else if (movieData.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  } else if (movieData.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  // Genre validation
  if (!movieData.genre || movieData.genre === '') {
    errors.genre = 'Genre is required';
  }

  // Duration validation
  const duration = parseInt(movieData.duration);
  if (!movieData.duration || movieData.duration === '') {
    errors.duration = 'Duration is required';
  } else if (isNaN(duration) || duration < 30) {
    errors.duration = 'Duration must be at least 30 minutes';
  } else if (duration > 300) {
    errors.duration = 'Duration must be less than 300 minutes';
  }

  // Rating validation
  const rating = parseFloat(movieData.rating);
  if (!movieData.rating || movieData.rating === '') {
    errors.rating = 'Rating is required';
  } else if (isNaN(rating) || rating < 0 || rating > 5) {
    errors.rating = 'Rating must be between 0 and 5';
  }

  // Release Date validation
  if (!movieData.releaseDate || movieData.releaseDate === '') {
    errors.releaseDate = 'Release date is required';
  } else {
    const date = new Date(movieData.releaseDate);
    if (isNaN(date.getTime())) {
      errors.releaseDate = 'Invalid date format';
    }
  }

  // Ticket Price validation
  const price = parseFloat(movieData.ticketPrice);
  if (!movieData.ticketPrice || movieData.ticketPrice === '') {
    errors.ticketPrice = 'Ticket price is required';
  } else if (isNaN(price) || price <= 0) {
    errors.ticketPrice = 'Price must be greater than 0';
  } else if (price > 99.99) {
    errors.ticketPrice = 'Price must be less than $99.99';
  }

  // Status validation
  if (!movieData.status || movieData.status === '') {
    errors.status = 'Status is required';
  }

  // Description validation
  if (!movieData.description || movieData.description.trim() === '') {
    errors.description = 'Description is required';
  } else if (movieData.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  } else if (movieData.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }

  // Director validation
  if (!movieData.director || movieData.director.trim() === '') {
    errors.director = 'Director is required';
  } else if (movieData.director.length < 2) {
    errors.director = 'Director name must be at least 2 characters';
  }

  // Language validation
  if (!movieData.language || movieData.language === '') {
    errors.language = 'Language is required';
  }

  // Age Rating validation
  if (!movieData.ageRating || movieData.ageRating === '') {
    errors.ageRating = 'Age rating is required';
  }

  return errors;
};

// Check if errors object is empty
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

// Get error message for field
export const getFieldError = (errors, fieldName) => {
  return errors[fieldName] || '';
};

// Has field error
export const hasFieldError = (errors, fieldName) => {
  return !!errors[fieldName];
};