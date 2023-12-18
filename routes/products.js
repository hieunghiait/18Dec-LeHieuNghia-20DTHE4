var express = require('express')
var router = express.Router()
const ProductModel = require('../models/product')
const responseData = require('../helper/responseData')
const validate = require('../validates/product')
const { validationResult } = require('express-validator')
const message = require('../helper/message')
const ProductSchema = require('../schema/product')

router.get('/', async function (req, res, next) {
  const products = await ProductModel.getProduct()
  return res.status(200).json({
    success: true,
    data: products
  })
})

router.post('/add', validate.validator(), async function (req, res, next) {
  var errors = validationResult(req)
  if (!errors.isEmpty()) {
    return responseData.responseReturn(res, 400, false, errors.array().map(error => error.msg))

  }
  const product = await ProductModel.getByName(req.body.name)
  if (product) {
    return res.status(200).json({
      success: false,
      message: message.product_is_existed
    })
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
    return res.status(200).json({
      success: true,
      data: newProduct
    })
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
    if (!newProduct) {
      responseData.responseReturn(res, 400, false, message.product_create_failed)
    }
    responseData.responseReturn(res, 200, true, newProduct)
  }
})

router.put('/delete/:id', async (req, res, next) => {
  const { id } = req.params
  const product = await ProductSchema.findById({ _id: id })
  if (!product) {
    responseData.responseReturn(res, 404, false, message.product_is_not_valid)
  } else {
    const newProduct = await ProductModel.deleteProduct(id)
    if (!newProduct) {
      return res.status(400).json({
        status: false,
        message: message.product_create_failed
      })
    }
    return res.status(200).json({
      status: true,
      message: message.delete_product_successfully
    })
  }
})
module.exports = router
