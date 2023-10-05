'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lesson.belongsTo(models.Course)
      Lesson.belongsToMany(models.User, {
        through: 'UserLesson'
      })
    }
  }
  Lesson.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    key: DataTypes.STRING,
    point: DataTypes.INTEGER,
    id_course: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};