const { User } = require('../models/models')
const jwt = require('jsonwebtoken')
const ActiveDirectory = require('activedirectory');

const generateJwt = (login, role) => {
  return jwt.sign(
    {login, role}, 
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class userController {

  async auth(req, res) {
    const token = generateJwt(req.user.login, req.user.role)
    return res.json({token, role: req.user.role})
  }

  async login(req, res) {
    const {login, password} = req.body;
    
    // admin
    if (login == 'admin' && password == '12345') {
      const token = generateJwt(login, 'ADMIN')
      return res.json({token})
    }

    const config = {
      url: 'LDAP://212.192.128.126',
      baseDN: 'dc=domain,dc=com'
    };

    const ad = new ActiveDirectory(config);
  
    ad.authenticate(login, password, function (err, auth) {
      if (err) {
        return res.status(401).json({ error: 'Ошибка авторизации' })
      }  
      if (auth) {
        const token = generateJwt(login, 'USER')
        return res.json({token})
      } else {
        return res.status(401).json({ error: 'Неверный логин или пароль' })
      }
    })
  }


  async update(req, res) {

  }

  async getOne(req, res) {

  }

  async getAll(req, res) {

  }

  async delete(req, res) {

  }
}

module.exports = new userController()