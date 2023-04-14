const router = require('express').Router();
const parseError = require('../util/errorParser');
const { getAll, getByCriteria } = require("../services/gameService");

router.get('/', async (req,res) => {
    console.log('req.query >>>', req.query)
    try {
        let games = [];
        
        if(req.query.name || req.query.platform) {
            games = await getByCriteria(req.query)
        } else {
            games = await getAll();
        }

        res.render('search', {
            title: 'Search Page',
            games,
            name: req.query.name
        })
    } catch ( error ) {
        const errors = parseError(error);
        
        res.render('search', {
            title: 'Search Page',
            errors
        })
    }
})

module.exports = router;