const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
const session = require('express-session')
const middlewareAuth = require('./middleware/middlewareAuth')

app.use(
    session({ secret: 'hgfjcghuu88jj;oilu9bggfy', cookie: { maxAge: 60000 } }),
    )
    app.use('/css', express.static(__dirname + '/css'))
    app.use('/js', express.static(__dirname + '/js'))
    app.use('/assets', express.static(__dirname + '/assets'))

    app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/homepage.html'))
    })
    app.get('/suit', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/suit.html'))
    })

    app.get('/login', middlewareAuth.isGuest, (req, res) => {
    res.sendFile(path.join(__dirname + '/views/loginpage.html'))
    })

    app.post('/login', middlewareAuth.isGuest, (req, res) => {
    const { , password } = req.body
    const data = JSON.parse(fs.readFileSync('user.json'))
    const user = data.find(
        (item) => item.email === email && item.password === password,
    )
    if (user) {
        req.session.user = user
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
    })
    app.get('/register', middlewareAuth.isGuest, (req, res) => {
    res.sendFile(path.join(__dirname + '/views/registerpage.html'))
    })

    app.post('/register', middlewareAuth.isGuest, (req, res) => {
    const { email, password } = req.body
    const user = JSON.parse(fs.readFileSync('user.json'))
    const isAuth = user.find((item) => item.email === email)

    if (isAuth) {
        res.redirect('/register')
    } else {
        const id = user.length + 1
        user.push({ id: id, email, password })
        const data = JSON.stringify(user)
        fs.writeFileSync('user.json', data)
        res.redirect('/login')
    }
    })

    app.get('/logout', middlewareAuth.isAuthenticated, (req, res) => {
    req.session.destroy()
    res.redirect('/')
    })

    app.listen(5000, () => {
    console.log('Aplicatioon is running in localhost:5000')
})
