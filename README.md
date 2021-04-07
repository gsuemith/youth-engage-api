# Setting up server from scratch

'''
npx gitignore node

// or if  gitignore is installed globally

gitignore node
'''

## Installations
### Database Schema Installations

'''
// install knex globally if possible
npm knex -g

//install knex and sqlite3
npm i knex sqlite3
'''

### Server Installations
'''
// install express
npm i express

// install nodemon to devDependencies
npm i nodemon -D
'''

## Create and configure knexfile
'''
// initialize knex to create knexfile.js
knex init
'''

'''
// knexfile.js
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
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
'''
