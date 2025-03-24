const Sach = require('../models/sach');

// Lấy danh sách tất cả sách
const getAllBooks = async (req, res) => {
  try {
    const books = await Sach.find().populate('maNXB');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm sách mới
const createBook = async (req, res) => {
  try {
    const book = new Sach(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật thông tin sách
const updateBook = async (req, res) => {
  try {
    const book = await Sach.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: 'Không tìm thấy sách' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa sách
const deleteBook = async (req, res) => {
  try {
    const book = await Sach.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Không tìm thấy sách' });
    }
    res.json({ message: 'Xóa sách thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin một sách
const getBookById = async (req, res) => {
  try {
    const book = await Sach.findById(req.params.id).populate('maNXB');
    if (!book) {
      return res.status(404).json({ message: 'Không tìm thấy sách' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookById
};