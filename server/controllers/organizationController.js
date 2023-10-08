const { Organization } = require('../models/models')
const { saveFile } = require('../utils')
const ApiError = require('../error/ApiError')


class organizationController {
  async create(req, res, next) {
    try {
      const {name, shortName, description, shortDescription} = req.body
      
      let imageUid = null
      if (req.files) {
        imageUid = saveFile(req.files.image)
      }
  
      const organization = await Organization.create({name, shortName, description, shortDescription, image: imageUid})
      return res.json(organization)
        
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res) {

  }

  async getOne(req, res) {

  }

  async getAll(req, res) {
    try {
      const organizations = await Organization.findAll()
      return res.json(organizations)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res) {

  }
}

module.exports = new organizationController()