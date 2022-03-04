const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://localhost:27017/explorer-movies-db',
} = process.env;

module.exports = { PORT, DB_ADDRESS };
