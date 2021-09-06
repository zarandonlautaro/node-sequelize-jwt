module.exports = {
  secret: process.env.AUTH_SECRET,
  expires: process.env.AUTH_EXPIRES,
  salt: process.env.AUTH_SALT,
};
