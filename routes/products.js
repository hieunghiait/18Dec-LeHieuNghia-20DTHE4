var express = require('express')
var router = express.Router()
const ProductModel = require('../models/product')
const responseData = require('../helper/responseData')
const validate = require('../validates/product')
const { validationResult } = require('express-validator')
const message = require('../helper/message')
const ProductSchema = require('../schema/product')

router.get('/', async function (req, res, next) {
  var products = await ProductModel.getProduct()
  return responseData.responseReturn(res, 200, true, products)
})

router.post('/add', validate.validator(), async function (req, res, next) {
  var errors = validationResult(req)
  if (!errors.isEmpty()) {
    responseData.responseReturn(res, 400, false, errors.array().map(error => error.msg))
    return
  }
  const product = await ProductSchema.findById({ name: req.body.name })
  if (product) {
    responseData.responseReturn(res, 404, false, "product da ton tai")
  } else {
    const newProduct = await ProductSchema.create({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description
    })
    if (!newProduct) {
      responseData.responseReturn(res, 400, false, message.product_create_failed)
    }
    responseData.responseReturn(res, 200, true, newProduct)
  }
})
router.put('/update/:id', validate.validator(), async function (req, res, next) {
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    responseData.responseReturn(res, 400, false, errors.array().map(error => error.msg))
    return
  }
  const product = await ProductModel.getById(req.params.id)
  if (!product) {
    responseData.responseReturn(res, 404, false, message.product_is_not_valid)
  } else {
    const newProduct = await ProductModel.updateProduct(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description
    })
    responseData.responseReturn(res, 200, true, newProduct)
  }
})

router.put('/delete/:id', async (req, res, next) => {
  const product = await ProductModel.deleteProduct(req.params.id)
  if (!product) {
    responseData.responseReturn(res, 404, false, message.product_is_not_valid)
  } else {
    await ProductModel.deleteProduct(req.params.id)
    responseData.responseReturn(res, 200, true, message.delete_product_successfully)
    next()
  }
})
module.exports = router
