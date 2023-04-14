const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'mySecretCode';

async function register(username, email, password) {
    const existingUsername = await User.findOne({username}).collation({
        locale: 'en',
        strength: 2
    })
    
    if( existingUsername ) {
        throw new Error("Username is taken!")
    }
    
    const existingEmail = await User.findOne({email}).collation({
        locale: 'en',
        strength: 2
    })
    
    if( existingEmail ) {
        throw new Error("Email is taken!")
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        username,
        email,
        hashedPassword
    })
    
    return signToken(user);
}

async function login(email, password) {
    const user = await User.findOne({email}).collation({
        locale: 'en',
        strength: 2
    })
    
    if( !user ) {
        throw new Error('Incorrect email or password');
    }
    
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    
    if( hasMatch === false ) {
        throw new Error('Incorrect email or password');
    }
    
    return signToken(user)
}

function signToken({ _id, username, email }) {
    const payload = {
        _id,
        username,
        email
    }
    
    return jwt.sign(payload, SECRET);//the token
    
}

//used in the session middleware to verify the token
function verifyToken(token) {
    return jwt.verify(token, SECRET);
}

module.exports = {
    login,
    register,
    verifyToken
}