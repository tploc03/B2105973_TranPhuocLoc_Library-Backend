const mongoose = require('mongoose');

const docGiaSchema = new mongoose.Schema({
  maDocGia: {
    type: String,
    required: true,
    unique: true
  },
  hoLot: {
    type: String,
    required: true
  },
  ten: {
    type: String,
    required: true
  },
  ngaySinh: {
    type: Date,
    required: true
  },
  phai: {
    type: String,
    enum: ['Nam', 'Nữ'],
    required: true
  },
  diaChi: {
    type: String,
    required: true
  },
  dienThoai: {
    type: String,
    required: true
  },
  // Thêm trường cho authentication
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DocGia', docGiaSchema);