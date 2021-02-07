const {Schema, model} = require('mysql');

const UsuarioSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = model('Usuario', UsuarioSchema);