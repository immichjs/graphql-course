const { perfis } = require('../data/database')

module.exports = {
  salary (user) {
    return user.real_salary
  },

  perfil (user) {
    const selecionados = perfis.filter(p => p._id === user.perfil_id)
    return selecionados ? selecionados[0] : null
  }
}
