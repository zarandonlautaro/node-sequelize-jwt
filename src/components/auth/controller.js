const { User } = require('../../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../../config/auth');

const authController = {
  signIn: async (req, res) => {
    let result, token;
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        result = { success: false, msg: 'El correo ingresado no existe' };
        return res.status(400).json(result);
      }
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (passwordMatches) {
        token = jwt.sign({ user }, authConfig.secret, {
          expiresIn: authConfig.expires,
        });
        result = { success: 'true', token, user };
        return res.status(200).json(result);
      } else {
        result = { success: 'false', mgs: 'Contraseña incorrecta' };
        return res.status(401).json(result);
      }
    } catch (error) {
      result = { success: 'false', msg: error };
      return res.status(500).json(result);
    }
  },
  signUp: async (req, res) => {
    let result;
    try {
      const { password, name, email } = req.body;
      if (password.length < 9 || password.length > 50) {
        result = {
          success: 'false',
          msg: 'La constraseña debe tener entre 9 y 50 caractereces',
        };
        return res.status(400).json(result);
      }

      const encryptedPassword = await bcrypt.hash(
        password,
        Number.parseInt(authConfig.salt),
      );
      const user = await User.create({
        name,
        email,
        password: encryptedPassword,
      });
      result = {
        success: 'true',
        mgs: 'Usuario registrado',
        user,
      };
      return res.status(201).json(result);
    } catch (error) {
      result = { success: 'false', msg: error };
      return res.status(500).json(result);
    }
  },
};

module.exports = authController;
