const { usuarios, nextId } = require('../data/db')

function usuarioIndex (filtro) {
  if (!filtro) return -1

  const { id, email } = filtro

  if (id)
    return usuarios.findIndex(u => u.id === id)
  else if (email)
    return usuarios.findIndex(u => u.email === email)

  return -1
}


module.exports = {
  novoUsuario(_, { data }) {
    const emailExistente = usuarios
      .some(u => u.email === data.email)

    if (emailExistente)
      throw new Error('Este e-mail já está cadastrado, tente novamente.')

    const novo = {
      id: nextId(),
      ...data,
      perfil_id: 1,
      status: 'ATIVO'
    }

    usuarios.push(novo)
    return novo
  },

  excluirUsuario (_, { filtro }) {
    const i = usuarioIndex(filtro)

    if (i < 0)
      return null

    const excluidos = usuarios.splice(id, 1)
    return excluidos ? excluidos[0] : null
  },

  alterarUsuario(_, args) {
    const i = usuarios.findIndex(u => u.id === args.id) 

    if (i < 0) return null

    if (args.nome.trim().length)
      usuarios[i].nome = args.nome

    if (args.email.trim().length)
      usuarios[i].email = args.email

    if (args.idade)
      usuarios[i].idade = args.idade

    return usuarios[i]

    // const usuario = {
    //   ...usuarios[i],
    //   ...args
    // }

    // usuarios.splice(i, 1, usuario)

    // return usuario
  }
}
