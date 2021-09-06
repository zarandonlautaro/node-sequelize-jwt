const app = require('./src/server');
const { sequelize } = require('./src/models/index');
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Connected to db');
  } catch (error) {
    console.log('Error to connect db', err);
  }
});
