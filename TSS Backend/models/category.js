const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: String,
  images1: String,
});

module.exports = mongoose.model('Category', categorySchema);
