const { Sequelize } = require('sequelize');

const sequelize = new  Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('succesfully connected to the database ')
    }catch (error) {
        console.error('unable to connect to database:', error);
    }
};

module.exports = {sequelize, connectDB };   