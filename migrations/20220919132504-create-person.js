
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('People', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumbers: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('phoneNumbers').split(';')
        },
        set(val) {
          this.setDataValue('phoneNumbers',val.join(';'));
        },
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('People');
  }
};