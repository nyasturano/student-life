const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  login: {type: DataTypes.STRING, unique: true},
  name: {type: DataTypes.STRING},
  course: {type: DataTypes.INTEGER, validate: {min: 0, max: 6}},
  photo: {type: DataTypes.STRING},
  shareCode: {type: DataTypes.STRING}
})

const Event = sequelize.define('event', {
  title: {type: DataTypes.STRING},
  description: {type: DataTypes.STRING},
  date: {type: DataTypes.DATE},
  image: {type: DataTypes.STRING}
})

const FavoriteEvent = sequelize.define('favorite_event', {})

const Organizer = sequelize.define('organizer', {
  name: {type: DataTypes.STRING},
  description: {type: DataTypes.STRING},
  image: {type: DataTypes.STRING}
})

const OrganizerSocial = sequelize.define('organizer_social', {
  link: {type: DataTypes.STRING}
})

const Lesson = sequelize.define('lesson', {
  name: {type: DataTypes.STRING},
  teacher: {type: DataTypes.STRING},
  classroom: {type: DataTypes.INTEGER},
  startTime: {type: DataTypes.TIME},
  endTime: {type: DataTypes.TIME}
})

const Ad = sequelize.define('ad', {
  title: {type: DataTypes.STRING},
  description: {type: DataTypes.STRING},
  cover: {type: DataTypes.STRING},
  price: {type: DataTypes.INTEGER},
  address: {type: DataTypes.STRING},
  floor: {type: DataTypes.INTEGER},
  lattitude: {type: DataTypes.DOUBLE},
  longitude: {type: DataTypes.DOUBLE},
  area: {type: DataTypes.INTEGER},
  rooms: {type: DataTypes.INTEGER},
  elevator: {type: DataTypes.BOOLEAN},
  balcony: {type: DataTypes.BOOLEAN},
  furniture: {type: DataTypes.BOOLEAN},
  appliances: {type: DataTypes.BOOLEAN},
})

const ResidenceType = sequelize.define('residence_type', {
  label: {type: DataTypes.STRING}
})

const AdImage = sequelize.define('ad_image', {
  image: {type: DataTypes.STRING}
})

const Internship = sequelize.define('internship', {
  title: {type: DataTypes.STRING},
  description: {type: DataTypes.STRING},
  image: {type: DataTypes.STRING},
  url: {type: DataTypes.STRING}
})

const Day = sequelize.define('day', {
  label: {type: DataTypes.STRING}
})

const Faculty = sequelize.define('faculty', {
  label: {type: DataTypes.STRING}
})

const SocialType = sequelize.define('social_type', {
  label: {type: DataTypes.STRING}
})

const WeekType = sequelize.define('week_type', {
  label: {type: DataTypes.STRING}
})

User.hasMany(Lesson)
Lesson.belongsTo(User)

Faculty.hasMany(User)
User.belongsTo(Faculty)

Day.hasMany(Lesson)
Lesson.belongsTo(Day)

WeekType.hasMany(Lesson)
Lesson.belongsTo(WeekType)

Event.belongsToMany(User, {through: FavoriteEvent})
User.belongsToMany(Event, {through: FavoriteEvent})

Organizer.hasMany(Event)
Event.belongsTo(Organizer)

Organizer.hasMany(OrganizerSocial)
OrganizerSocial.belongsTo(Organizer)

OrganizerSocial.hasMany(SocialType)
SocialType.belongsTo(OrganizerSocial)

Ad.hasMany(AdImage)
AdImage.belongsTo(Ad)

ResidenceType.hasMany(Ad)
Ad.belongsTo(ResidenceType)

module.exports = {
  User,
  Event,
  Organizer,
  OrganizerSocial,
  Lesson,
  Ad,
  AdImage,
  ResidenceType,
  Internship,
  Day,
  Faculty,
  SocialType,
  WeekType
}