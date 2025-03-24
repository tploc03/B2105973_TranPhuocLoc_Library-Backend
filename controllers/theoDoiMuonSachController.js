const TheoDoiMuonSach = require('../models/theodoimuonsach');

// Lấy tất cả yêu cầu mượn sách (cho admin)
const getAllBorrowRequests = async (req, res) => {
  try {
    const requests = await TheoDoiMuonSach.find()
      .populate({
        path: 'maDocGia',
        select: 'maDocGia hoLot ten -_id'
      })
      .populate({
        path: 'maSach',
        select: 'maSach tenSach -_id'
      })
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy lịch sử mượn sách của một độc giả
const getReaderBorrowHistory = async (req, res) => {
  try {
    const history = await TheoDoiMuonSach.find({ maDocGia: req.user._id })
      .populate('maSach')
      .sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Tạo yêu cầu mượn sách mới
const createBorrowRequest = async (req, res) => {
  try {
    const borrowRequest = new TheoDoiMuonSach({
      maDocGia: req.user._id,
      maSach: req.body.maSach,
      ngayMuon: new Date(),
      trangThai: 'Chờ duyệt'
    });
    await borrowRequest.save();
    res.status(201).json(borrowRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Duyệt yêu cầu mượn sách (chấp nhận/từ chối)
const updateBorrowRequest = async (req, res) => {
  try {
    const { trangThai } = req.body;
    const request = await TheoDoiMuonSach.findById(req.params.id)
      .populate('maSach')
      .populate('maDocGia');

    if (!request) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu mượn sách' });
    }

    request.trangThai = trangThai;
    if (trangThai === 'Đã trả') {
      request.ngayTra = new Date();
    }

    await request.save();

    // Tạo thông báo cho độc giả
    const notification = new Notification({
      userId: request.maDocGia._id,
      type: trangThai === 'Đã duyệt' ? 'BORROW_REQUEST_APPROVED' : 'BORROW_REQUEST_REJECTED',
      message: `Yêu cầu mượn sách "${request.maSach.tenSach}" đã ${trangThai.toLowerCase()}`,
      data: {
        bookId: request.maSach._id,
        bookTitle: request.maSach.tenSach,
        status: trangThai
      }
    });
    await notification.save();

    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllBorrowRequests,
  getReaderBorrowHistory,
  createBorrowRequest,
  updateBorrowRequest
};