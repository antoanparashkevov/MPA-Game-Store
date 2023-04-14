function hasUser() {
    return (req,res,next) => {
        if( req.user ) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
}

//to stop access to authenticated user to enter to login and register page
function isGuest() {
    return (req,res,next) => {
        if( req.user ) {
            res.redirect('/')
        }
        next();        
    }
}

module.exports = {
    hasUser,
    isGuest
}