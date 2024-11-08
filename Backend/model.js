const mongoose = require('mongoose');
const { type } = require('os');
mongoose.connect('mongodb+srv://aravindmarripelli:D8EvFbZFRtxfRa67@cluster0.elde4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("connected succesfully ")
})
.catch((error)=>{
    console.log("error in connecting ");
})
const usermodel = new mongoose.Schema({
    name: { type: String, required: true },
    phno: { type: Number, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    tickets: { type: Array, default: [] }, 
    notifications: { type: Array, default: [] }
});

module.exports = mongoose.model('Users',usermodel);