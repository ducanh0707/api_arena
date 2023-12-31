'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.Lesson, {
        foreignKey: 'id_course'
      })
      Course.belongsToMany(models.User, {
        through: 'UserCourse'
      })
    }
  }
  Course.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    image: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};