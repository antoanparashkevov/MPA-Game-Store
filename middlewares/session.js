const { verifyToken } = require("../services/authService");
module.exports = () => (req,res,next) => {
    const token = req.cookies['token'];
    
    if( token ) {
        try {
            const payload = verifyToken(token);
            req.user = payload;
            res.locals.user = payload;
        } catch ( error ) {
            res.clearCookie('token')
            res.redirect('/auth/login')
            return;
        }
    }
    
    next();
}