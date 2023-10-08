const ApiError = require('../error/ApiError')
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

  async login(req, res, next) {
    const {login, password} = req.body;

    if (!login || !password) {
      return next(ApiError.badRequest('Некорректный логин или пароль'))
    }
    
    // check if admin
    if (login == 'admin' && password == '12345') {
      const token = generateJwt(login, 'ADMIN')
      return res.json({token})
    }

    const config = {
      url: 'LDAP://212.192.128.126',
      baseDN: 'dc=domain,dc=com'
    };
  
    const ad = new ActiveDirectory(config);
  
    // раскомментить на сервере!

    // ad.authenticate(username, password, async function (err, auth) {
    //   if (err) {
    //     console.log('ERROR: ' + JSON.stringify(err));
    //     return res.status(500).json({ error: 'Authentication failed' });
    //   }
  
    //   if (auth) {
    //     console.log('Authenticated!');
    //     // if succesful:
    //     try {
    //       // try to find an existing user
    //       let user = await User.findOne({where: {login}})
      
    //       // if there's no such user, insert a new one
    //       if (user == null) {
    //         user = await User.create({login, shareCode: "share_" + login}) 
    //       }
          
    //       // send token to client
    //       const token = generateJwt(login, 'USER')
    //       return res.json({token})

    //     } catch(e) {
    //       return next(ApiError.internal(e.message))
    //     }
    //   } else {
    //     console.log('Authentication failed!')
    //     return res.status(401).json({ error: 'Authentication failed' })
    //   }
    // })

    // раскомментить на сервере!

    // закомментить на сервере!

    try {
      // try to find an existing user
      let user = await User.findOne({where: {login}})
  
      // if there's no such user, insert a new one
      if (user == null) {
        user = await User.create({login, shareCode: "share_" + login}) 
      }
      
      // send token to client
      const token = generateJwt(login, 'USER')
      return res.json({token})

    } catch(e) {
      return next(ApiError.internal(e.message))
    }

    // закомментить на сервере!
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