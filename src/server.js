require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const fetch = require('node-fetch');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const makeLoaders = require('./loaders');
const store = require('./store');
const utils = require('./utils');

const movieModel = require('./models/movie');
const castModel = require('./models/cast');

// Global config options for the Movie DB
const config = {
  port: 3000,
  url: 'https://api.themoviedb.org/3',
  params: {
    api_key: '4e911a064e43b9cd6fbb3137c572d89a',
    include_adult: false,
  },
};

// Initialize data models and pass dependencies
const models = {
  movie: movieModel({ config, utils, store, loaders: makeLoaders() }),
  cast: castModel({ config, utils, loaders: makeLoaders() }),
};

const context = { models, user: 'a@a.com' };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: true,
});

// Set up Apollo Server

// Start our server with our port config
server.listen({
  port: config.port,
}).then(({ port }) => console.log(`running on port ${port}`));
