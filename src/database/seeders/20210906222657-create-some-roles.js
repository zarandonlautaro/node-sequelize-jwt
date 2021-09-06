'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert(
        'roles',
        [
          { name: 'admin', createdAt: new Date(), updatedAt: new Date() },
          { name: 'user', createdAt: new Date(), updatedAt: new Date() },
        ],
        {},
      ),
      queryInterface.bulkInsert(
        'user-role',
        [
          {
            userId: 1,
            roleId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 1,
            roleId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 2,
            roleId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {},
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('roles', null, {}),
      queryInterface.bulkDelete('user-role', null, {}),
    ]);
  },
};
