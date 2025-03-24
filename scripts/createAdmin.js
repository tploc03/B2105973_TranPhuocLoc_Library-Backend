const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const NhanVien = require('../models/nhanvien');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await NhanVien.findOne({ MSNV: 'ADMIN001' });
    if (existingAdmin) {
      console.log('Admin account already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 8);

    const admin = new NhanVien({
      MSNV: 'ADMIN001',
      hoTenNV: 'Admin',
      password: hashedPassword,
      chucVu: 'Quản trị viên',
      diaChi: 'Library Address',
      soDienThoai: '0123456789'
    });

    await admin.save();
    console.log('Admin account created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin account:', error);
    process.exit(1);
  }
};

createAdmin();