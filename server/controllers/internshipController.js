const { Internship } = require('../models/models')

const { saveFile } = require('../utils')
const ApiError = require('../error/ApiError')

class internshipController {
  async create(req, res, next) {
    try {
        const {title, description, url} = req.body
        
        let imageUid = null
        if (req.files) {
          imageUid = saveFile(req.files.image)
        }
    
        const internship = await Internship.create({title, description, url, image: imageUid})
        return res.json(internship)
        
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res) {
    const {id} = req.params
    const {title, description, url} = req.body
    
    let imageUid = null
    if (req.files) {
      imageUid = saveFile(req.files.image)
    }

    try {
      const internship = await Internship.update({title, description, url, image: imageUid}, {where: {id}})
      return res.json(internship)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res) {
    const {id} = req.params
    try {
      const internship = await Internship.findOne({where: {id}})
      return res.json(internship)

    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    try {
      const internships = await Internship.findAll()
      return res.json(internships)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res) {
    const {id} = req.params
    try {
      const internship = await Internship.destroy({where: {id}})
      return res.json(internship)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new internshipController()