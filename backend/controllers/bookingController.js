const Booking = require('../models/Booking');
const Car = require('../models/Car');

// @desc    Get all bookings for logged in user
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
  try {
    let query;

    if (req.user.role === 'customer') {
      query = { customer: req.user.id };
    } else if (req.user.role === 'owner') {
      query = { owner: req.user.id };
    } else if (req.user.role === 'admin') {
      query = {};
    }

    const bookings = await Booking.find(query)
      .populate('customer', 'name email phone')
      .populate('car', 'name type price images plateNumber')
      .populate('owner', 'name email phone')
      .sort('-createdAt');

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('car')
      .populate('owner', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check authorization
    if (
      booking.customer._id.toString() !== req.user.id &&
      booking.owner._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private (Customer)
exports.createBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate, paymentMethod, notes } = req.body;

    // Get car details
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    if (!car.available) {
      return res.status(400).json({
        success: false,
        message: 'Car is not available for booking'
      });
    }

    // Calculate total price
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = days * car.price;

    // Create booking
    const booking = await Booking.create({
      customer: req.user.id,
      car: carId,
      owner: car.owner,
      startDate,
      endDate,
      totalPrice,
      paymentMethod,
      notes
    });

    // Populate fields
    await booking.populate('car', 'name type price images plateNumber');
    await booking.populate('owner', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check authorization
    if (
      booking.customer.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Booking updated successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel/Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check authorization (customer, owner, or admin)
    if (
      booking.customer.toString() !== req.user.id &&
      booking.owner.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    booking.status = 'Cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Approve booking
// @route   PUT /api/bookings/:id/approve
// @access  Private (Owner/Admin)
exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = 'Confirmed';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking approved successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reject booking
// @route   PUT /api/bookings/:id/reject
// @access  Private (Owner/Admin)
exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = 'Rejected';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking rejected',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
