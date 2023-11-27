const express = require('express');
const db = require('./db/connection');
const bodyparser = require('body-parser');
const app = express();


app.set('view engine' , 'ejs');
app.use('/assets', express.static('assets'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));




app.use(require('./routes/authRouter'));

app.listen(5000, () => {
    console.log('server running 5000');
})