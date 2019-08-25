const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const isEmail = require('isemail');

const dotenv = require('dotenv');
const config = dotenv.config(); // upadtes process.env.XYZ varibales

const store = createStore();

const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');
    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null };
    // find a user by their email
    const users = await store.users.findOrCreate({ where: { email } });
    const user = users && users[0] ? users[0] : null;

    return { user: { ...user.dataValues } };
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
  }),
  engine: {
    apiKey: process.env.ENGINE_API_KEY, // 'service:karpolan-apollo-fullstack-tutorial:axYRUtQgCfzgFhdDnQ-QMQ',
  },
});

server.listen().then(({ url }) => {
  // console.log('ENGINE_API_KEY:', process.env.ENGINE_API_KEY);
  console.log(`Apollo Server ready at ${url}`);
});
