const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.route('/').get((req, res) =>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    //const password = req.body.password;
    const firstName = req.body.firstName;
    const surname = req.body.surname;    
    const dob = Date.parse(req.body.dob);

    //hash password
    const password = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({username,password,firstName, surname, dob});
        
    newUser.save()
    .then(()=> res.json('User added!!!!'))
    .catch(err => res.status(400).json('Error with saving' + err));
});

router.route('/signin').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username:username})
    .then(validuser => {
        if(!validuser){
            return res.status(422).json({error:"Invalid username/password"});
        }else{
            bcrypt.compare(password, validuser.password)
            .then(validpass => {
                if(!validpass){
                    return res.status(422).json({error:"Invalid username/password"});
                }
                else{
                    res.json({message:"Matched username and password"});
                }
            })
        }
    })
});

module.exports = router;