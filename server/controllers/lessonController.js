const { Lesson, User, Day, WeekType } = require('../models/models')
const ApiError = require('../error/ApiError')

class lessonController {

  async create(req, res, next) {
    const { 
      name, 
      teacher, 
      classroom, 
      startTime, 
      endTime, 
      day,
      weekType 
    } = req.body

    // check time format
    let regex = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
    if (!startTime || !endTime || !regex.test(startTime) || !regex.test(endTime)) {
      return next(ApiError.badRequest('Неверный формат времени'))
    }

    try {
      // find user
      const userObj = await User.findOne({where: {login: req.user.login}})
      if (!userObj) {
        return next(ApiError.badRequest('Пользователя не существует'))
      }
      // find day
      const dayObj = await Day.findOne({where: {label: day}})
      if (!dayObj) {
        return next(ApiError.badRequest('Ошибка в названии дня недели'))
      }
      // find week
      const weekTypeObj = await WeekType.findOne({where: {label: weekType}})
      if (!weekTypeObj) {
        return next(ApiError.badRequest('Ошибка в названии типа недели'))
      }
      const lesson = await Lesson.create({name, teacher, classroom, startTime, endTime, userId: userObj.id, dayId: dayObj.id, weekTypeId: weekTypeObj.id})
      return res.json(lesson)

    } catch(e) {
      return next(ApiError.internal(e.message));
    }
  }

  async getAll(req, res, next) {
    const { day, weekType } = req.query
    try {

      // find user
      const userObj = await User.findOne({where: {login: req.user.login}})
      if (userObj == null) {
        return next(ApiError.badRequest('Пользователя не существует'))
      }

      let options = {userId: userObj.id}

      if (day) {
        // find day
        const dayObj = await Day.findOne({where: {label: day}})
        if (!dayObj) {
          return next(ApiError.badRequest('Ошибка в названии дня недели'))
        }
        options.dayId = dayObj.id
      }

      if (weekType) {
        // find week
        const weekTypeObj = await WeekType.findOne({where: {label: weekType}})
        if (!weekTypeObj) {
          return next(ApiError.badRequest('Ошибка в названии типа недели'))
        }
        options.weekTypeId = weekTypeObj.id
      }

      const lessons = await Lesson.findAll({where: options})

      return res.json(lessons)

    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async update(req, res, next) {
    const {id} = req.params
    const { 
      name, 
      teacher, 
      classroom, 
      startTime, 
      endTime, 
      day,
      weekType 
    } = req.body

    try {
      // find day
      const dayObj = await Day.findOne({where: {label: day}})
      if (!dayObj) {
        return next(ApiError.badRequest('Ошибка в названии дня недели'))
      }
  
      // find week
      const weekTypeObj = await WeekType.findOne({where: {label: weekType}})
      if (!weekTypeObj) {
        return next(ApiError.badRequest('Ошибка в названии типа недели'))
      }
  
      const lesson = await Lesson.update({name, teacher, classroom, startTime, endTime, day: dayObj.id, weekType: weekTypeObj.id}, {where: {id}})
      return res.json(lesson)

    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const {id} = req.params
      const lesson = await Lesson.destroy({where: {id}})
      return res.json(lesson)
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async share(req, res) {

    try {
      // find user
      const user = await User.findOne({where: {login: req.user.login}})
      if (!user) {
        return next(ApiError.badRequest('Пользователя не существует'))
      }

      // send share code to client
      return res.json(user.shareCode)
    } catch(e) {
      return next(ApiError.internal(e.message));
    }
  }

  async pull(req, res, next) {
    try {
      const shareCode = req.body.shareCode
      
      // find user with requested shareCode
      const shareUser = await User.findOne({where: {shareCode}})
      if (!shareUser) {
        return next(ApiError.badRequest('Недействительный код'))
      }

      // find request user
      const user = await User.findOne({where: {login: req.user.login}})
      if (!user) {
        return next(ApiError.badRequest('Пользователя не существует'))
      }

      // delete all lessons from request user
      Lesson.destroy({where: {userId: user.id}})

      // get all lessons from share user
      const sharedLessons = await Lesson.findAll({where: {userId: shareUser.id}})
      
      // duplicate all lessons from share user to request user
      let newLessons = []
      
      const promises = sharedLessons.map(async lesson => {
        newLessons.push(await Lesson.create({
          name: lesson.name, 
          teacher: lesson.teacher, 
          classroom: lesson.classroom, 
          startTime: lesson.startTime, 
          endTime: lesson.endTime, 
          userId: user.id,
          dayId: lesson.dayId, 
          weekTypeId: lesson.weekTypeId
        }))
      });
      await Promise.all(promises)

      return res.json(newLessons)

    } catch(e) {
      return next(ApiError.internal(e.message));
    }
  }
}

module.exports = new lessonController()