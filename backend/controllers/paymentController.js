const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// @desc    Get payment history
// @route   GET /api/payments
// @access  Private
exports.getPayments = async (req, res) => {
  try {
    let query;

    if (req.user.role === 'customer') {
      query = { customer: req.user.id };
    } else if (req.user.role === 'admin') {
      query = {};
    } else {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const payments = await Payment.find(query)
      .populate('booking')
      .populate('customer', 'name email')
      .sort('-createdAt');

    res.json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Private
exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('booking')
      .populate('customer', 'name email phone');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Check authorization
    if (
      payment.customer._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this payment'
      });
    }

    res.json({
      success: true,
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Process payment
// @route   POST /api/payments
// @access  Private (Customer)
exports.processPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod, cardDetails, upiId } = req.body;

    // Get booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Check if payment already exists
    const existingPayment = await Payment.findOne({ booking: bookingId });
    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: 'Payment already processed for this booking'
      });
    }

    // Create payment
    const payment = await Payment.create({
      booking: bookingId,
      customer: req.user.id,
      amount: booking.totalPrice,
      paymentMethod,
      cardDetails,
      upiId,
      transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'Completed', // In production, this would be 'Pending' until payment gateway confirms
      paymentDate: Date.now()
    });

    // Update booking payment status
    booking.paymentStatus = 'Completed';
    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Payment processed successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Process refund
// @route   POST /api/payments/:id/refund
// @access  Private (Admin)
exports.processRefund = async (req, res) => {
  try {
    const { refundAmount, notes } = req.body;

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    if (payment.status === 'Refunded') {
      return res.status(400).json({
        success: false,
        message: 'Payment already refunded'
      });
    }

    payment.status = 'Refunded';
    payment.refundAmount = refundAmount || payment.amount;
    payment.refundDate = Date.now();
    payment.notes = notes;

    await payment.save();

    res.json({
      success: true,
      message: 'Refund processed successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get payment statistics
// @route   GET /api/payments/stats
// @access  Private (Admin)
exports.getPaymentStats = async (req, res) => {
  try {
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalRefunds = await Payment.aggregate([
      { $match: { status: 'Refunded' } },
      { $group: { _id: null, total: { $sum: '$refundAmount' } } }
    ]);

    const paymentsByMethod = await Payment.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: '$paymentMethod', count: { $sum: 1 }, amount: { $sum: '$amount' } } }
    ]);

    res.json({
      success: true,
      stats: {
        totalRevenue: totalRevenue[0]?.total || 0,
        totalRefunds: totalRefunds[0]?.total || 0,
        paymentsByMethod
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
