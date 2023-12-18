var express = require('express')
var router = express.Router()
const ProductSchema = require('../schema/product')
const ProductModel = require('../models/product')
const responseData = require('../helper/responseData')
var validate = require('../validates/product')
const { validationResult } = require('express-validator')
router.get('/', async function (req, res, next) {
  var products = await ProductModel.getProduct()
  return responseData.responseReturn(res, 200, true, products)
})
router.post('/add', validate.validator(),
  async function (req, res, next) {
    var errors = validationResult(req)
    if (!errors.isEmpty()) {
      responseData.responseReturn(res, 400, false, errors.array().map(error => error.msg))
      return
    }
    var product = await ProductModel.getByName(req.body.name)
    if (product) {
      responseData.responseReturn(res, 404, false, "product da ton tai")
    } else {
      const newProduct = await ProductModel.createUser({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
      })
      responseData.responseReturn(res, 200, true, newUser)
    }
  })

module.exports = router
