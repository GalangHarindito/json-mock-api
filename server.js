const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const userdb = JSON.parse(fs.readFileSync('./admin.json', 'UTF-8'))

server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

// Check if the user exists in database
function isAuthenticated(userName, password){
  return userdb.admin.findIndex(user => user.userName === userName && user.password === password )
}

server.post('/auth', (req, res) => {
  if (isAuthenticated(req.body.userName, req.body.password) === -1) {
    const status = 401
    const message = 'Incorrect user name or password'
    res.status(status).json({status, message})
    return
  }
  const message = 'success'
  res.status(200).json({message})
})

server.use(router)

server.listen(8000, () => {
  console.log('Run Auth API Server')
})