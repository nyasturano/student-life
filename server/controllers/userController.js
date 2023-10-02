const { User } = require('../models/models')


class userController {

  async auth(req, res) {

  }

  async login(req, res) {
    const {username, password} = req.body;

    const config = {
      url: 'LDAP://212.192.128.126',
      baseDN: 'dc=domain,dc=com'
    };
  
    const ad = new ActiveDirectory(config);
  
    ad.authenticate(username, password, function (err, auth) {
      if (err) {
        return res.status(401).json({ error: 'Ошибка авторизации' });
      }  
      if (auth) {
        return res.json({ message: 'Пользователь успешно авторизован' });
      } else {
        return res.status(401).json({ error: 'Неверный логин или пароль' });
      }
    });


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