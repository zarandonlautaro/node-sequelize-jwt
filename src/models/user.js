'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // en hasMany la fk la tiene el modelo de destino (Post)
      User.hasMany(models.Post, { as: 'posts', foreignKey: 'userId' });
      //  belongsToMany para relaciones Many-To-Many
      // user-role como tabla de unión, que tendrá las fk correspondientes (userId y roleId)
      User.belongsToMany(models.Role, {
        as: 'roles',
        through: 'user-role',
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // Se realizan algunas validaciones por atributo
        validate: {
          isAlpha: {
            msg: 'El nombre solo puede contener letras',
          },
          len: {
            args: [2, 50],
            msg: 'El nombre debe tener entre 2 y 50 caracteres',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            arg: [9, 255],
            msg: 'La contraseña debe tener entre 9 y 255 caracteres',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'El email tiene que ser un correo válido',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );

  User.isAdmin = function (roles) {
    let auxRoles = [];
    // Si tiene el rol 'admin' devuelve true, de lo contrario false
    roles.forEach((role) => {
      auxRoles.push(role.role);
    });
    return auxRoles.includes('admin');
  };
  return User;
};
