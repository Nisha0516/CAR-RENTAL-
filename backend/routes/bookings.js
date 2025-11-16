const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  approveBooking,
  rejectBooking
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getBookings)
  .post(protect, authorize('customer'), createBooking);

router.route('/:id')
  .get(protect, getBooking)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

router.put('/:id/approve', protect, authorize('owner', 'admin'), approveBooking);
router.put('/:id/reject', protect, authorize('owner', 'admin'), rejectBooking);

module.exports = router;
