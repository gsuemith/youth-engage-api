## Client code located in 
https://github.com/gsuemith/youth-engage

## Endpoints
```
[GET] /api/users
[GET] /api/posts
[GET] /api/comments
```

# Setting up server from scratch

```
npx gitignore node

// or if  gitignore is installed globally

gitignore node
```

## Installations
### Database Schema Installations

```
// install knex globally if possible
npm knex -g

//install knex and sqlite3
npm i knex sqlite3
```

### Server Installations
```
// install express
npm i express

// install nodemon to devDependencies
npm i nodemon -D
```

## Create api directory and files

Create `index.js` in the root folder

Create a folder called `api` and a file called `server.js` in the folder

In the `api` folder create folders for each resource e.g. `users`

In each folder create a router and model javascript file e.g. `user-router.js` and `user-model.js`

## Make all imports, exports, and connections
Create servers and routers:
```
// needed in all routers and servers
const express = require('express')

// instantiate
const server = express()
// or
const router = express.Router()

// Be sure to export your routers and server
module.exports = server
// or
module.exports = router
```

### Using routers:
```
// in server.js
// do the following for each resource
const resourceRouter = require('./resource/resource-router.js')

server.use('/api/resource', resourceRouter)
```

### Don't forget to apply middlewares:
```
server.use(express.json())
server.use(helmet())
server.use(cors())
```

### Model files can access database like so:
```
const db = require('../../data/db-config.js')
```

## Start your server in `index.js` with:
```
server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})
```

# Database Setup

## Create and configure knexfile
```
// initialize knex to create knexfile.js
knex init
```

```
// knexfile.js
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      //set to your path and filename
      filename: './data/youth_db.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};
```

## Create Migrations
Run `knex migrate:make <create-name>` to create a migration file.

You will find it in the directory specified in `knexfile.js`

Create your schema migration

Run `knex migrate:latest` to create the database file.

In the data folder, create a file called `db-config.js`.  The file can be configured as follows
```
//db-config.js

const knex = require('knex')
const configs = require('../knexfile.js')
const environment = process.env.NODE_ENV || 'development'

module.exports = knex(configs[environment])
```

## Create Seeds
Run `knex seed:make <00-table-name>` to create a seed file.  Number your seeds to run in such an order so that foreign keys refer to existing tables.

Sample seed file
```
// /seeds/01-users.js
exports.seed = function(knex) {
  return knex('users').insert([
    { username: 'garrick', email:'g@rrick.com', password: 'password'},
    { username: 'samuel', email:'s@muel.ai', password: 'password'},
  ])
};
```

Run `knex seed:run` to seed database.

# Implement Endpoints
