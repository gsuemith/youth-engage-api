const dotenv = require('dotenv').config()
const cors = require('cors')
const server = require('./api/server')
const PORT = process.env.PORT || 5000;



server.use(cors())



server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})