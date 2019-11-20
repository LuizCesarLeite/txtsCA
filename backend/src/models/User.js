const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: String,
  ra : String,
  telefone : String,
  email: { type: String, unique: true },
  foto: String,
  roles: [{ type: 'String' }],
  taVerificad: { type: Boolean, default: false },
  senha: String,
  senhaResetToken: String,
  senhaResetExpires: Date
});

module.exports = mongoose.model('User', UserSchema);
