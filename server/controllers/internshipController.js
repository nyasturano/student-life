const { Internship } = require('../models/models')

const { saveFile } = require('../utils')
const ApiError = require('../error/ApiError')

class internshipController {
  async create(req, res, next) {

    try {
        const {title, description, url} = req.body
        const {image} = req.files
        const imageUid = saveFile(image)
    
        const internship = await Internship.create({title, description, url, image: imageUid})
        return res.json(internship)
        
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res) {
    const {id} = req.params
    const {title, description, url} = req.body
    const {image} = req.files

    const internship = await Internship.update({title, description, url}, {where: {id}})
    return res.json(internship)
  }

  async getOne(req, res) {
    const {id} = req.params
    const internship = await Internship.findOne({where: {id}})
    return res.json(internship)
  }

  async getAll(req, res) {
    const internships = await Internship.findAll()
    return res.json(internships)
  }

  async delete(req, res) {
    const {id} = req.params
    const internship = await Internship.destroy({where: {id}})
    return res.json(internship)

  }
}

module.exports = new internshipController()