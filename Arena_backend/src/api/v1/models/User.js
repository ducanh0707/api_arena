'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'id_role'
      })
      User.belongsTo(models.Organization, {
        foreignKey: 'id_organization'
      })
      User.belongsToMany(models.Course, {
        through: 'UserCourse'
      })
      User.belongsToMany(models.Lesson, {
        through: 'UserLesson'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,

    email: DataTypes.STRING,

    password: DataTypes.STRING,

    id_role: DataTypes.INTEGER,

    id_organization: DataTypes.INTEGER,

    status: DataTypes.BOOLEAN,
    
    totalPass: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};