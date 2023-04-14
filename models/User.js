const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username must be at least 5 characters long!']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [10, 'Email must be at least 10 characters long!']
    },
    hashedPassword: {
        type: String,
        required: true
    }
})

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2//case insensitive
    }
})

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2//case insensitive
    }
})

const User = model('User', userSchema)

module.exports = User;