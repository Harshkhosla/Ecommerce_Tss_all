const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  categoryName: String,
  additionalField: String,
  image1: String,
});

module.exports = mongoose.model('ProductCategory', productCategorySchema);
