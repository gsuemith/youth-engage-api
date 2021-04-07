## Client code located in 
`https://github.com/gsuemith/youth-engage`

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

## Create api directory and files

Create `index.js` in the root folder

Create a folder called `api` and a file called `server.js` in the folder

In the `api` folder create folders for each table e.g. `users`

In each folder create a router and model javascript file e.g. `user-router.js` and `user-model.js`

## Make all imports, exports, and connections
Don't forget to apply middlewares:
```
server.use(express.json())
```

Model files can access database like so:
```
const db = require('../../data/db-config.js')
```

Finally, start your server in `index.js` with:
```
server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})
```
