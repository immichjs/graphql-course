const { users, perfis } = require('../data/database')

module.exports = {
  hello: () => 'Hello World', // Resolvers são funções
  currentHour: () => new Date,
  userLogged: () => {
    return {
      _id: Math.random(),
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
    const generateRandomNumber = () => parseInt(Math.random() * 100)

    return Array(6).fill(0)
      .map(() => generateRandomNumber())
      .map((n, _, arr) => arr.indexOf(n) === -1 ? n = generateRandomNumber : n)
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
  perfil(_, { _id }) {
    const selecionados = perfis.filter(p => p._id === _id)
    return selecionados ? selecionados[0] : null
  }
}
