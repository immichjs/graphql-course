const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')

const resolvers = require('./resolvers')
const schemaPath = './schema/index.graphql'

// `` é uma forma diferente de chamar uma função ES6+ 

const server = new ApolloServer({
  typeDefs: importSchema(schemaPath),
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🔥 Servidor inicializado: ${url}`)
})
