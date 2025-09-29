const { Store, Rating, User, } = require('../models');

const { sequelize } = require('../config/database');


exports.getOwnerDashboard = async (req, res) => {
  const ownerId = req.user.id; 

  try {
    const store = await Store.findOne({ where: { ownerId } });
    if (!store) {
      return res.status(404).json({ message: 'No store found for this owner.' });
    }

    const ratings = await Rating.findAll({
      where: { storeId: store.id },
      include: [{
        model: User,
        attributes: ['id', 'name', 'email'] 
      }],
      order: [['createdAt', 'DESC']]
    });

    const stats = await Rating.findOne({
      where: { storeId: store.id },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
        [sequelize.fn('COUNT', sequelize.col('rating')), 'totalRatings']
      ],
      raw: true 
    });

    res.status(200).json({
      storeDetails: store,
      dashboardStats: {
        averageRating: parseFloat(stats.averageRating).toFixed(2), 
        totalRatings: stats.totalRatings
      },
      ratings: ratings,
    });
  } catch (error) {
    console.error('owner dashboard Error:', error);
    res.status(500).json({ message: 'internal server error' });
  }
};