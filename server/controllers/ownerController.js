const { Owner } = require('../models/models')

const { saveFile } = require('../utils')
const ApiError = require('../error/ApiError')

class ownerController {
  async create(req, res, next) {
    console.log(req.body)
    const {name, socialUrl, phone} = req.body
    let imageUid = null
    if (req.files) {
      imageUid = saveFile(req.files.photo)
    }
    try {
      const owner = await Owner.create({name, phone, socialUrl, photo: imageUid})
      return res.json(owner)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res) {
    
  }

  async getOne(req, res) {
    try {
      const {id} = req.params
      const owner = await Owner.findOne({where: {id}})
      return res.json(owner)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
   
  }

  async delete(req, res) {
   
  }
}

module.exports = new ownerController()