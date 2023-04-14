//controllers
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const gameController = require('../controllers/gameController');
const searchController = require('../controllers/searchController');
const { hasUser } = require("../middlewares/guard");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/game', gameController);
    app.use('/search', hasUser(), searchController);
    
    app.get('*', (req, res) => {
        res.render('404', {
            title: 'Not found!'
        })
    })
}