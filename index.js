const dotenv = require('dotenv').config()  //eslint-disable-line

const server = require('./api/server')
const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})