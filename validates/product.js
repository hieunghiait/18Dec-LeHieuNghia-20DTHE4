const { body } = require('express-validator')
const message = require('../helper/message')
const util = require('util')

var options = {
  name: {
    min: 10,
    max: 80
  },
  description: {
    min: 10,
    max: 80
  },
  image: {
  },
  price: {
    min: 0
  }
}

module.exports = {
  validator: function () {
    return [
      body('name', util.format(message.size_string_message, 'name',
        options.name.min, options.name.max)).isLength(options.name),
      body('description', util.format(message.size_string_message, 'description',
        options.description.min, options.description.max)).isLength(options.description),
      body('image', util.format(message.size_string_message, 'image',
        options.image.min, options.image.max)).isLength(options.image),
      body('image', util.format(message.empty_message, 'image')).not().isEmpty(),
      body('image', util.format(message.url_message, 'image')).isURL(),
      body('price', util.format(message.size_string_message, 'price',
        options.price.min, options.price.max)).isLength(options.price),
      body('price', util.format(message.number_message, 'price')).isNumeric()

    ]
  },
}