const mongoose = require("mongoose")
/**
 * Cho cấu trúc Schema Product
- name: string , 10- 80 chars
- descritption: String,  10- 80 chars
- image : URL, 
- price: Number
 */
const Schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 10,
    maxlength: 80,
    required: true
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 80,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  }
})
module.exports = mongoose.model('products', Schema)
