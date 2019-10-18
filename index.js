const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')

const app = express()

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['userId'] }))
require('express-dynamic-helpers-patch')(app)

const users = []

const findUserByNickname = nickname => users.find(u => u.nickname === nickname)
const currentUser = (req, _res) => users.find(u => u.id === req.session.userId)

app.dynamicHelpers({ currentUser });

// Cuando te peguen a / con el metodo GET hace tal cosa
app.get('/', (req, res) => {
  res.render('index')
})

// Cuando te peguen a /login con el metodo POST hace tal cosa
app.post('/login', (req, res) => {
  const { nickname, password } = req.body

  const user = findUserByNickname(nickname)

  if (!user)
    res.render('index', { message: 'Email incorrecto' })

  else if (password !== user.password)
    res.render('index', { message: 'password incorrecto' })

  else {
    req.session.userId = user.id
    res.render('index')
  }
})

app.post('/logout', (req, res) => {
  const user = currentUser(req)
  delete req.session.userId
  res.render('index', { message: 'Gracias, vuelva prontos ' + user.nickname + '!' })
})

app.post('/register', (req, res) => {
  const { nickname, password, confirmPassword } = req.body

  if (findUserByNickname(nickname))
    res.render('index', { message: 'Email tomado' })

  else if (password !== confirmPassword)
    res.render('index', { message: 'Las contraseñas no coinciden' })

  else {
    const user = { nickname, password, id: new Date().getTime() }
    users.push(user)
    req.session.userId = user.id
    res.render('index')
  }
})

app.get('/asdf', (req, res) => [
  res.send(JSON.stringify({ asdf: 123 }))
])

app.listen(
  3000,
  _ => console.log('Hola estoy esperando que me pidas algo papu')
)
