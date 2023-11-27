const express = require('express');
const userSchema = require('../model/userSchema'); //schema
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', function (req, res) {
    res.render('index');
})
router.get('/login', function (req, res) {
    res.render('login');
})
router.post('/login', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    try {
        var user = await userSchema.findOne({ email: email })
            .exec();
        console.log(user)
        if (!user) {
            res.redirect('/login');
        }
        user.comparePassword(password, (error, match) => {
            if (!match) {
                res.redirect('/login')
            }
        });
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
})



router.get('/register', function (req, res) {
    res.render('register');
})
router.post('/register', (req, res) => {
    var register = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }
    const regpost = new userSchema(register);
    regpost.save()
        .then(() => res.json('register successfully'))
        .catch((error) => res.status(400).json('error' + error))
});


router.get('/viewdata', async(req ,res)=>{
   
    const data = await userSchema.find({})
    res.render('viewdata' , {data :data})
    console.log('data')
    
    });
      
    
    router.get('/export-csv' , async(req ,res)=>{
        try{
    const data = await userSchema.find({})
    const createCsvWriter = require('csv-writer').createObjectCsvWriter
    
    const csvWriter = createCsvWriter({
        path:'data.csv',
    
        header:[
            {id:'name' , title:'name'},
            {id:'email' , title:'email'},
            {id:'phone' , title:'phone'},
            {id:'password' , title:'password'}
        ],
    })
    csvWriter.writeRecords(data)
    .then(()=>console.log('DATA EXPORT SUCCESFULL'))
    res.download('data.csv')
    .catch((err)=>console.log(error))
    
        }catch(eror){
            console.log('error')
        }
    })









module.exports = router;


