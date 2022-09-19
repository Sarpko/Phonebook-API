'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Person.init({
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumbers: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        if (this.getDataValue('phoneNumbers'))
        return this.getDataValue('phoneNumbers').split(';')
      },
      set(val) {
        this.setDataValue('phoneNumbers',val.join(';'));
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};