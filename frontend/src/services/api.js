// API Service for Backend Communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Ensure the URL doesn't end with a slash
const cleanBaseUrl = API_BASE_URL.endsWith('/') 
  ? API_BASE_URL.slice(0, -1) 
  : API_BASE_URL;

const API_URL = `${cleanBaseUrl}`;

// Helper function to get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Authentication APIs
export const authAPI = {
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await handleResponse(response);
    
    // Store token and user data
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Cars APIs
export const carsAPI = {
  getCars: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_BASE_URL}/cars?${queryParams}` : `${API_BASE_URL}/cars`;
    
    const response = await fetch(url);
    return handleResponse(response);
  },

  getCar: async (id) => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`);
    return handleResponse(response);
  },

  createCar: async (carData) => {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(carData),
    });
    return handleResponse(response);
  },

  updateCar: async (id, carData) => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(carData),
    });
    return handleResponse(response);
  },

  deleteCar: async (id) => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Bookings APIs
export const bookingsAPI = {
  getBookings: async () => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getBooking: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  createBooking: async (bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(bookingData),
    });
    return handleResponse(response);
  },

  updateBooking: async (id, bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(bookingData),
    });
    return handleResponse(response);
  },

  cancelBooking: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  approveBooking: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/approve`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  rejectBooking: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}/reject`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Admin APIs
export const adminAPI = {
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getAllBookings: async (page = 1, status = '') => {
    const params = new URLSearchParams({ page });
    if (status) params.append('status', status);
    
    const response = await fetch(`${API_BASE_URL}/admin/bookings?${params}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getAllUsers: async (page = 1, role = '') => {
    const params = new URLSearchParams({ page });
    if (role) params.append('role', role);
    
    const response = await fetch(`${API_BASE_URL}/admin/users?${params}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getAllCars: async (page = 1) => {
    const response = await fetch(`${API_BASE_URL}/admin/cars?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  approveCar: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/cars/${id}/approve`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  deleteCar: async (id) => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  updateCar: async (id, carData) => {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(carData),
    });
    return handleResponse(response);
  },

  addCar: async (carData) => {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(carData),
    });
    return handleResponse(response);
  },

  getReports: async (type, startDate, endDate) => {
    const params = new URLSearchParams({ type });
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await fetch(`${API_BASE_URL}/admin/reports?${params}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Reviews APIs
export const reviewsAPI = {
  getCarReviews: async (carId) => {
    const response = await fetch(`${API_BASE_URL}/reviews/car/${carId}`);
    return handleResponse(response);
  },

  addReview: async (reviewData) => {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(reviewData),
    });
    return handleResponse(response);
  },

  updateReview: async (id, reviewData) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(reviewData),
    });
    return handleResponse(response);
  },

  deleteReview: async (id) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  markHelpful: async (id) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}/helpful`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Favorites APIs
export const favoritesAPI = {
  getFavorites: async () => {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  addFavorite: async (carId) => {
    const response = await fetch(`${API_BASE_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ carId }),
    });
    return handleResponse(response);
  },

  removeFavorite: async (carId) => {
    const response = await fetch(`${API_BASE_URL}/favorites/${carId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  checkFavorite: async (carId) => {
    const response = await fetch(`${API_BASE_URL}/favorites/check/${carId}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Notifications APIs
export const notificationsAPI = {
  getNotifications: async (read = null, limit = 20) => {
    const params = new URLSearchParams({ limit });
    if (read !== null) params.append('read', read);
    
    const response = await fetch(`${API_BASE_URL}/notifications?${params}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  markAsRead: async (id) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  markAllAsRead: async () => {
    const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  deleteNotification: async (id) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Messages APIs
export const messagesAPI = {
  getMessages: async (type = 'received') => {
    const response = await fetch(`${API_BASE_URL}/messages?type=${type}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getMessage: async (id) => {
    const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  sendMessage: async (messageData) => {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(messageData),
    });
    return handleResponse(response);
  },

  markAsRead: async (id) => {
    const response = await fetch(`${API_BASE_URL}/messages/${id}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  deleteMessage: async (id) => {
    const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Payments APIs
export const paymentsAPI = {
  getPayments: async () => {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getPayment: async (id) => {
    const response = await fetch(`${API_BASE_URL}/payments/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  processPayment: async (paymentData) => {
    const response = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(paymentData),
    });
    return handleResponse(response);
  },

  processRefund: async (id, refundData) => {
    const response = await fetch(`${API_BASE_URL}/payments/${id}/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(refundData),
    });
    return handleResponse(response);
  },

  getPaymentStats: async () => {
    const response = await fetch(`${API_BASE_URL}/payments/stats`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Owner APIs
export const ownerAPI = {
  getDashboard: async () => {
    const response = await fetch(`${API_BASE_URL}/owner/dashboard`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  // Get owner profile
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/owner/profile`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  // Update owner profile
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/owner/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  },

  // Get owner's cars
  getMyCars: async (status = '', page = 1) => {
    const params = new URLSearchParams({ page });
    if (status) params.append('status', status);
    
    const response = await fetch(`${API_BASE_URL}/owner/cars?${params}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getCars: async (status = '', page = 1) => {
    const params = new URLSearchParams({ page });
    if (status) params.append('status', status);
    
    const response = await fetch(`${API_BASE_URL}/owner/cars?${params}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  // Add new car
  addCar: async (carData) => {
    const response = await fetch(`${API_BASE_URL}/owner/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(carData),
    });
    return handleResponse(response);
  },

  // Update car
  updateCar: async (carId, carData) => {
    const response = await fetch(`${API_BASE_URL}/owner/cars/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify(carData),
    });
    return handleResponse(response);
  },

  // Delete car
  deleteCar: async (carId) => {
    const response = await fetch(`${API_BASE_URL}/owner/cars/${carId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  // Get owner's bookings
  getMyBookings: async (status = '', page = 1) => {
    const params = new URLSearchParams({ page });
    if (status) params.append('status', status);
    
    const response = await fetch(`${API_BASE_URL}/owner/bookings?${params}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getBookings: async (status = '', page = 1) => {
    const params = new URLSearchParams({ page });
    if (status) params.append('status', status);
    
    const response = await fetch(`${API_BASE_URL}/owner/bookings?${params}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  // Approve booking
  approveBooking: async (bookingId) => {
    const response = await fetch(`${API_BASE_URL}/owner/bookings/${bookingId}/approve`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  // Reject booking
  rejectBooking: async (bookingId) => {
    const response = await fetch(`${API_BASE_URL}/owner/bookings/${bookingId}/reject`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  // Complete booking
  completeBooking: async (bookingId) => {
    const response = await fetch(`${API_BASE_URL}/owner/bookings/${bookingId}/complete`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getCarReviews: async (carId) => {
    const response = await fetch(`${API_BASE_URL}/owner/reviews/${carId}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  // Get owner's reviews
  getMyReviews: async () => {
    const response = await fetch(`${API_BASE_URL}/owner/reviews`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getEarnings: async (startDate, endDate) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await fetch(`${API_BASE_URL}/owner/earnings?${params}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  updateCarAvailability: async (carId, available) => {
    const response = await fetch(`${API_BASE_URL}/owner/cars/${carId}/availability`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ available }),
    });
    return handleResponse(response);
  },

  getCarPerformance: async (carId) => {
    const response = await fetch(`${API_BASE_URL}/owner/cars/${carId}/performance`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Admin Advanced APIs
export const adminAdvancedAPI = {
  toggleUserStatus: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/admin/advanced/users/${userId}/toggle-status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  deleteUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/admin/advanced/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  rejectCar: async (carId, reason) => {
    const response = await fetch(`${API_BASE_URL}/admin/advanced/cars/${carId}/reject`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ reason }),
    });
    return handleResponse(response);
  },

  getPlatformAnalytics: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/advanced/analytics`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getRevenueAnalytics: async (startDate, endDate) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await fetch(`${API_BASE_URL}/admin/advanced/revenue?${params}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  deleteReview: async (reviewId) => {
    const response = await fetch(`${API_BASE_URL}/admin/advanced/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },

  getSystemHealth: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/advanced/system-health`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });
    return handleResponse(response);
  },
};

// Export all APIs
export default {
  auth: authAPI,
  cars: carsAPI,
  bookings: bookingsAPI,
  admin: adminAPI,
  owner: ownerAPI,
  adminAdvanced: adminAdvancedAPI,
  reviews: reviewsAPI,
  favorites: favoritesAPI,
  notifications: notificationsAPI,
  messages: messagesAPI,
  payments: paymentsAPI,
};
