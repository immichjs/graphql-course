const users = [{
  _id: 1,
  name: 'João Silva',
  email: 'jsilva@zemail.com',
  age: 29,
  perfil_id: 1,
  status: 'ACTIVE'
}, {
  _id: 2,
  name: 'Rafael Junior',
  email: 'rafajun@zemail.com',
  age: 31,
  perfil_id: 2,
  status: 'INACTIVE'
}, {
  _id: 3,
  name: 'Daniela Smith',
  email: 'danismi@zemail.com',
  age: 24,
  perfil_id: 1,
  status: 'BLOCKED'
}]

const perfis = [
  { _id: 1, name: 'Comum' },
  { _id: 2, name: 'Administrador' },
]

module.exports = {
  users,
  perfis
}
