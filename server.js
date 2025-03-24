const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const sachRoutes = require('./routes/sachRoutes');
const nhaXuatBanRoutes = require('./routes/nhaXuatBanRoutes');
const theoDoiMuonSachRoutes = require('./routes/theoDoiMuonSachRoutes');
const nhanVienRoutes = require('./routes/nhanVienRoutes');
const docGiaRoutes = require('./routes/docGiaRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sach', sachRoutes);
app.use('/api/nhaxuatban', nhaXuatBanRoutes);
app.use('/api/muonsach', theoDoiMuonSachRoutes);
app.use('/api/nhanvien', nhanVienRoutes);
app.use('/api/docgia', docGiaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});