const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    joiningData: {
      type: String,
      required: false,
    },
    order: {
      type: String
    },
    status: {
      type: String,
      required: true,
      default: "Idle"
    }
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

module.exports = Admin;
