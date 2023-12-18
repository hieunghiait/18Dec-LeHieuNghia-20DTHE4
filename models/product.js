const ProductSchema = require('../schema/product')

module.exports = {
  getProduct: function () {
    return ProductSchema.find()
  },
  getOne: function (id) {
    return modelUser.findById(id)
  },
  getByName: function (name) {
    return SchemaUser.findOne({}).exec()
  },
  createUser: function (user) {
    return new ProductSchema(user).save()
  }
}
