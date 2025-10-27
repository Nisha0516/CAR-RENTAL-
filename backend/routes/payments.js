const express = require('express');
const router = express.Router();
const {
  getPayments,
  getPayment,
  processPayment,
  processRefund,
  getPaymentStats
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

router.get('/stats', authorize('admin'), getPaymentStats);
router.route('/')
  .get(getPayments)
  .post(authorize('customer'), processPayment);

router.get('/:id', getPayment);
router.post('/:id/refund', authorize('admin'), processRefund);

module.exports = router;
