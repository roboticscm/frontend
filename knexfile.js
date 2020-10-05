// Update with your config settings.

module.exports = {


  development: {
    client: 'pg',
    connection: {
      port: 5433,
      host: 'localhost',
      database: 'frontend',
      user: 'frontend',
      password: 'frontend'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {

    }
  },
  production: {
    client: 'pg',
    connection: {
      port: 5433,
      host: 'localhost',
      database: 'frontend',
      user: 'frontend',
      password: 'frontend'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {

    }
  }

};
