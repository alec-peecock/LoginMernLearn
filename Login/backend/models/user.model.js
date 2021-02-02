const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, minlength:5, required:true,unique:true, trim:true},
    password: {type: String, minlength:5, required:true},
    firstName: {type:String , required:true},
    surname: {type:String , required:true},
    dob: {type:Date , required:true},
},{
    timestamps:true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;