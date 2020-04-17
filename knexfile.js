// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/projects.db3'
    },
    useNullAsDefault: true, // needed for sqlite3
    // add migrations and seeds
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  }
};
