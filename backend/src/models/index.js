
const { sequelize } = require('../config/database');
const User = require('./user');
const Store = require('./Store');
const Rating = require('./Rating');

User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

Store.hasMany(Rating, { foreignKey: 'storeId' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

User.hasOne(Store, { foreignKey: 'ownerId' });
Store.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(' Database synchronized');
  } catch (error) {
    console.error(' Unable to synchronize the database:', error);
  }
};

module.exports = {
  User,
  Store,
  Rating,
  syncDatabase,
};