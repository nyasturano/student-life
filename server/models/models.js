const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  login: {type: DataTypes.STRING, unique: true},
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

const Organization = sequelize.define('organization', {
  name: {type: DataTypes.STRING},
  shortName: {type: DataTypes.STRING},
  description: {type: DataTypes.STRING},
  shortDescription: {type: DataTypes.STRING},
  image: {type: DataTypes.STRING}
})

const OrganizationSocial = sequelize.define('organization_social', {
  link: {type: DataTypes.STRING}
})

const Lesson = sequelize.define('lesson', {
  name: {type: DataTypes.STRING},
  teacher: {type: DataTypes.STRING},
  classroom: {type: DataTypes.STRING},
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
  latitude: {type: DataTypes.DOUBLE},
  longitude: {type: DataTypes.DOUBLE},
  area: {type: DataTypes.INTEGER},
  rooms: {type: DataTypes.INTEGER},
  elevator: {type: DataTypes.BOOLEAN},
  balcony: {type: DataTypes.BOOLEAN},
  furniture: {type: DataTypes.BOOLEAN},
  appliances: {type: DataTypes.BOOLEAN},
})

const Owner = sequelize.define('owner', {
  name: {type: DataTypes.STRING},
  photo: {type: DataTypes.STRING},
  phone: {type: DataTypes.STRING},
  socialUrl: {type: DataTypes.STRING},
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

const SocialType = sequelize.define('social_type', {
  label: {type: DataTypes.STRING}
})

const WeekType = sequelize.define('week_type', {
  label: {type: DataTypes.STRING}
})

const Food = sequelize.define('food', {
  name: {type: DataTypes.STRING},
  address: {type: DataTypes.STRING},
  discount: {type: DataTypes.STRING},
  info: {type: DataTypes.STRING},
  image: {type: DataTypes.STRING},
})

const FoodCategory = sequelize.define('food_category', {
  title: {type: DataTypes.STRING},
  image: {type: DataTypes.STRING},
})


User.hasMany(Lesson)
Lesson.belongsTo(User)

Day.hasMany(Lesson)
Lesson.belongsTo(Day)

WeekType.hasMany(Lesson)
Lesson.belongsTo(WeekType)

Event.belongsToMany(User, {through: FavoriteEvent})
User.belongsToMany(Event, {through: FavoriteEvent})

Organization.hasMany(Event)
Event.belongsTo(Organization)

Organization.hasMany(OrganizationSocial)
OrganizationSocial.belongsTo(Organization)

SocialType.hasMany(OrganizationSocial)
OrganizationSocial.belongsTo(SocialType)

Owner.hasMany(Ad)
Ad.belongsTo(Owner)

Ad.hasMany(AdImage)
AdImage.belongsTo(Ad)

ResidenceType.hasMany(Ad)
Ad.belongsTo(ResidenceType)

FoodCategory.hasMany(Food)
Food.belongsTo(FoodCategory)

module.exports = {
  User,
  Event,
  Organization,
  OrganizationSocial,
  Lesson,
  Ad,
  AdImage,
  ResidenceType,
  Internship,
  Day,
  SocialType,
  WeekType,
  Food,
  FoodCategory,
  Owner
}