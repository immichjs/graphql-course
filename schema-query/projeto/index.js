const { ApolloServer, gql } = require('apollo-server')

// `` é uma forma diferente de chamar uma função ES6+ 
const typeDefs = gql`
  scalar Date

  type Product {
    name: String!
    price: Float!
    discount: Float
    priceWithDiscount: Float
  }

  type User {
    _id: ID! # ID converte para String
    name: String!
    email: String!
    age: Int!
    salary: Float
    vip: Boolean
    # sentence: String
  }

  # Pontos de entrada da sua API
  type Query {
    hello: String
    currentHour: Date
    userLogged: User
    productActive: Product
  }
`

const resolvers = {
  User: {
    salary (user) {
      return user.real_salary
    },
    // sentence (user) {
    //   return 'O dia está muito bonito'
    // }
  },

  Product: {
    priceWithDiscount: (product) => product.price = product.discount ? product.price * (1 - product.discount) : product.price
  },

  Query: {
    hello: () => 'Hello World', // Resolvers são funções
    currentHour: () => new Date,
    userLogged: () => {
      return {
        _id: String(Math.random()),
        name: 'Mich',
        email: 'immichjs@test.com',
        age: 19,
        real_salary: 990.00,
        vip: true,
      }
    },
    productActive: () => {
      return {
        name: 'iPhone X',
        price: 3333.9,
        discount: 0.1,
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🔥 Servidor inicializado: ${url}`)
})
