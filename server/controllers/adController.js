const { Ad, ResidenceType, AdImage } = require('../models/models')
const { saveFile } = require('../utils')
const ApiError = require('../error/ApiError')

class adController {
  async create(req, res) {
    const {
      title, 
      description, 
      type,
      price,
      address,
      floor,
      latitude,
      longitude,
      area,
      rooms,
      elevator,
      balcony,
      furniture,
      appliances,
      ownerId
    } = req.body

    let imageUid = null
    if (req.files) {
      imageUid = saveFile(req.files.cover)
    }

    const rType = await ResidenceType.findOne({where: {label: type}})

    const ad = await Ad.create({title, 
      description, 
      price,
      address,
      floor,
      latitude,
      longitude,
      area,
      rooms,
      elevator,
      balcony,
      furniture,
      appliances,
      ownerId,
      cover: imageUid,
      residenceTypeId: rType.id
    })
    return res.json(ad)
  }

  async update(req, res) {

  }

  async getOne(req, res) {
    const {id} = req.params
    const ad = await Ad.findOne({where: {id}, include: [{model: AdImage, required: true}, {model: ResidenceType, required: true}]})
    return res.json(ad)
  }

  async getAll(req, res) {
    const ad = await Ad.findAll({include: [{model: AdImage, required: true}, {model: ResidenceType, required: true}]})
    return res.json(ad)
  }

  async delete(req, res) {

  }

  async addImage(req, res) {
    const {id} = req.params
    let imageUid = null
    if (req.files) {
      imageUid = saveFile(req.files.image)
    }

    const adImage = await AdImage.create({adId: id, image: imageUid})
    return res.json(adImage)
  }
}

module.exports = new adController()