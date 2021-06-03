const { ApolloServer, gql } = require('apollo-server')

const users = [{
  _id: 1,
  name: 'João Silva',
  email: 'jsilva@zemail.com',
  age: 29
}, {
  _id: 2,
  name: 'Rafael Junior',
  email: 'rafajun@zemail.com',
  age: 31
}, {
  _id: 3,
  name: 'Daniela Smith',
  email: 'danismi@zemail.com',
  age: 24
}]

const perfis = [
  { id: 1, name: 'Comum' },
  { id: 2, name: 'Administrador' },
]

// `` é uma forma diferente de chamar uma função ES6+ 
const typeDefs = gql`
  scalar Date

  type Product {
    name: String!
    price: Float!
    discount: Float
    priceWithDiscount: Float
  }

  type Perfil {
    id: Int!
    name: String!
  }

  type User {
    _id: Int! # ID converte para String
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
    numerosMegaSena: [Int!]!
    users: [User]
    user(_id: Int): User
    perfis: [Perfil]
    perfil(id: Int): Perfil
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
    },
    numerosMegaSena() {
      const crescente = (a, b) => a - b
      return Array(6).fill(0)
        .map(n => parseInt(Math.random() * (60 + 1)))
        .sort(crescente)
    },
    users () {
      return users
    },
    user (_, { _id }) {
      const selecionados = users.filter(e => e._id === _id)
      return selecionados ? selecionados[0] : null
    },
    perfis () {
      return perfis
    },
    perfil(_, { id }) {
      const selecionados = perfis.filter(e => e.id === id)
      return selecionados ? selecionados[0] : null
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🔥 Servidor inicializado: ${url}`)
})
