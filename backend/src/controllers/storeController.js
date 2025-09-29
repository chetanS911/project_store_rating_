const { Store, Rating } = require('../models');
const { sequelize } = require('../config/database');
const { Op } = require('sequelize'); 

exports.getAllStores = async (req, res) => {
  const userId = req.user.id; 
  const { search } = req.query; 

  try {
    const searchFilter = search 
      ? { [Op.or]: [ 
            { name: { [Op.iLike]: `%${search}%` } }, 
            { address: { [Op.iLike]: `%${search}%` } }
          ]}
      : {};

    const stores = await Store.findAll({
      where: searchFilter,
      attributes: [
        'id',
        'name',
        'email',
        'address',
        
        [sequelize.fn('AVG', sequelize.col('Ratings.rating')), 'overallRating'],
        
        [sequelize.literal(`(
          SELECT rating FROM "Ratings"
          WHERE "Ratings"."storeId" = "Store"."id" AND "Ratings"."userId" = '${userId}'
        )`), 'myRating']
      ],
      include: [{
        model: Rating,
        attributes: [] 
      }],
      group: ['Store.id'] 
    });

    res.status(200).json(stores);
  } catch (error) {
    console.error('get Stores Error:', error);
    res.status(500).json({ message: 'internal server error' });
  }
};

exports.rateStore = async (req, res) => {
    const { rating } = req.body;
    const storeId = req.params.id;
    const userId = req.user.id;
  
    try {
      const store = await Store.findByPk(storeId);
      if (!store) {
        return res.status(404).json({ message: 'Store not found' });
      }
  
      if (rating < 1 || rating > 5) {
          return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
      }
      const [newRating, created] = await Rating.findOrCreate({
        where: { userId, storeId },
        defaults: { rating }
      });
  
      if (!created) {
        await newRating.update({ rating });
      }
  
      res.status(201).json({ message: 'rating submitted successfully', rating: newRating });
  
    } catch (error) {
      console.error('rate Store Error:', error);
      res.status(500).json({ message: 'internal server error' });
    }
  };