const { Internship } = require('../models/models')


class internshipController {
  async create(req, res) {
    const {title, description, url} = req.body
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    console.log(req.body)
    const internship = await Internship.create({title, description, url, image: "image"})
    return res.json(internship)
  }

  async update(req, res) {
    const {id} = req.params
    const {title, description, url} = req.body
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