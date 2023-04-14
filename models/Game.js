const { Schema, model, Types: {ObjectId} } = require('mongoose');

const IMAGE_PATTERN = /^https?:\/\/.+$/i

const gameSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [4, 'The game name must be at least 4 characters long!']
    },
    image: {
        type : String,
        required : true,
        validate: {
            validator: (v) => {
                return IMAGE_PATTERN.test(v);
            },
            message: 'The image must start with http:// or https://'
        }
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'The price must be a positive number!']
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'The description must be at least 10 characters long!']
    },
    genre: {
        type: String,
        required: true,
        minlength: [2, 'The genre must be at least 2 characters long!']
    },
    platform: {
        type: String,
        enum: {
          values: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
          message: '{VALUE} is not supported!'  
        },
        required: true
    },
    boughtBy: {
        type: [ObjectId],
        default: [],
        ref: 'User'
    },
    owner: {
        type: ObjectId,
        required: true,
        ref: 'User'
    }
})

const Game = model('Game', gameSchema)

module.exports = Game;

