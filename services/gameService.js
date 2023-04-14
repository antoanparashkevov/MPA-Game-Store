const Game = require('../models/Game');

async function getByCriteria(search) {
    let query = {};
    
    if( search ) {
        for(let param in search) {
            query[param] = new RegExp(search[param], 'i')
        }
    }
    
    return Game.find(query).lean();
}

async function getAll() {
    return Game.find({}).lean();
}

async function getById(id) {
    return Game.findById(id).lean();
}

async function create(formData) {
    return Game.create(formData)
}

async function edit(gameId, formData) {
    const game = await Game.findById(gameId);
    
    game.name = formData.name;
    game.image = formData.image;
    game.price = formData.price;
    game.description = formData.description;
    game.genre = formData.genre;
    game.platform = formData.platform;
    
    return game.save();
}

async function deleteById(gameId) {
    return Game.findByIdAndRemove(gameId)
}

async function buyGame(gameId, userId) {
    const existing = await Game.findById(gameId);
    
    if(existing.boughtBy.map( u => u.toString()).includes(userId.toString())) {
        throw new Error('You cannot buy this game twice!')
    }
    
    existing.boughtBy.push(userId);
    
    return existing.save();
}

module.exports = {
    getByCriteria,
    getAll,
    getById,
    create,
    edit,
    deleteById,
    buyGame
}