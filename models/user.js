const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    id: { type : Number, required: true },
    firstName : { type : String, required: true },
    lastName: { type : String }, 
    password: { type : String , required: true },
    authorization: { type : Number, required: true },
    tokenPass: { type : String },
    tokenExpired: { type : Date}
}, { collection: 'users' });
const User = model('USER', userSchema);
module.exports = User;