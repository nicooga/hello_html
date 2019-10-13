const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

// Cuando te peguen a / con el metodo GET hace tal cosa
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'asdf.html'))
})

// Cuando te peguen a /login con el metodo POST hace tal cosa
app.post('/login', (req, res) => {
  if (
    req.body.nickname == 'kpo' &&
    req.body.password == '123123'
  ) {
    res.send('HOLA KPO, TE ESTABA GUARDANDO ESTO <3')
  } else {
    res.send('HOLA KPO TE TRATASTE DE LOGUEAR, PERO NO SOS TAN KPO')
  }
})

app.listen(
  3000,
  _ => console.log('Hola estoy esperando que me pidas algo papu')
)
