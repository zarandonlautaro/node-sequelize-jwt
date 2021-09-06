const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { User } = require('../models/index');

const auth = async (req, res, next) => {
  let result, token, userDecoded;
  // req.headers.authorization = Bearer + token
  if (!req.headers.authorization) {
    result = { success: false, msg: 'Acceso no autorizado' };
    return res.status(401).json(result);
  }
  token = req.headers.authorization.split(' ')[1];
  try {
    userDecoded = jwt.verify(token, authConfig.secret);
    const user = await User.findByPk(userDecoded.user.id, { include: 'roles' });
    if (!user) {
      result = { success: false, msg: 'Usuario no encontrado' };
      return res.status(404).json(result);
    }
    req.user = user;
    return next();
  } catch (err) {
    result = { success: false, msg: 'Token no válido' };
    return res.status(400).json(result);
  }
};

module.exports = auth;
