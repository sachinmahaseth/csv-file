const mongoose = require('mongoose');

const conn = mongoose.connect( 'mongodb+srv://sachinmahaseth200319:sachinmahaseth@cluster0.n4wflrg.mongodb.net/' , {
    useNewUrlParser:true,
    useUnifiedTopology:true
}

).then( () => {
    console.log('database connect');
} ).catch((err) => console.log(err))

module.exports = conn;