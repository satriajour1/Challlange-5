class MiddlewareAuth {
    isGuest(req, res, next) {
        if (!req.session.user) next()
        else res.redirect('/')
    }
    isAuthenticated(req, res, next) {
        if (req.session.user) next()
        elseres.redirect('/Login')
    }
}

module.exports = new MiddlewareAuth()