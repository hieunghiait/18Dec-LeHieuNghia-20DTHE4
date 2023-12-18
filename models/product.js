const ProductSchema = require('../schema/product')

module.exports = {
  getProduct: async () => {
    try {
      const products = await ProductSchema.find({ isDelete: false })
      if (!products) {
        throw new Error('No product found')
      }
      return products
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  getOne: async (id) => {
    const product = await ProductSchema.findById(id)
    if (!product) {
      throw new Error('No product found with the provided id')
    }
    return product
  },
  getByName: function (name) {
    return ProductSchema.findOne({}).exec()
  },
  createUser: function (user) {
    return new ProductSchema(user).save()
  },
  deleteProduct: async (id) => {
    try {
      const product = await ProductSchema.findByIdAndUpdate(id, {
        isDelete: true
      }, { new: true })
      if (!product) {
        throw new Error('No product found with the provided id')
      }
      return product
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
