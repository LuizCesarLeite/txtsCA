const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome : String,
    ra : String,
    telefone : String,
    email : String,
    senha : String
});

module.exports = mongoose.model('User', UserSchema);