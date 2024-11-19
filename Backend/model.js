const mongoose = require('mongoose');
const { type } = require('os');
require('dotenv').config();
mongoose.connect(`${process.env.MONGODB_URL}`)
.then(()=>{
    console.log("connected succesfully ")
})
.catch((error)=>{
    console.log("error in connecting ");
})
const usermodel = new mongoose.Schema({
    name: { type: String, required: true },
    // phno: { type: Number, required: true },
    email: { type: String, required: true }, 
    password: { type: String, required: true },
    tickets: { type: Array, default: [] }, 
    notifications: { type: Array, default: [] }
});

module.exports = mongoose.model('Users',usermodel);