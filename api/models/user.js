import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({//esquema de un usuario
    name: { type: String, required: [true] },
    email :{ type: String, required: [true], unique: true },
    password: { type: String, required: [true] }
});

//Validator

userSchema.plugin(uniqueValidator, {message: 'Error, email already exists.'})

//Convert to model
const User = mongoose.model('User',userSchema);

export default User;