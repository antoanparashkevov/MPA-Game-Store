const mongoose = require('mongoose')

const CONNECTION_STRING = 'mongodb://localhost:27017/gaming_team';

module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log('Database connected successfully!');
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}