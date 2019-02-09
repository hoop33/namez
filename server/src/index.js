const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const NameAPI = require('./datasources/name');
const WordnikAPI = require('./datasources/wordnik');
const RollingStore = require('./datasources/rolling_store');

const store = new RollingStore();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    nameAPI: new NameAPI(store),
    wordnikAPI: new WordnikAPI(),
  }),
});

server.listen().then(({url}) => {
  console.log(`Server listening at ${url}`);
});
