const model = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = model.User

exports.register = async (req,res)=>{
    const user = new User(req.body);
    const payload  = {
        UserName : req.body.UserName
    };
    const options = {
        expiresIn: '1d'
    };

    try{
        var token = jwt.sign(payload,process.env.SECRET_KEY,options);
        const hashedPwd = await bcrypt.hash(req.body.Password,10);
        user.Password = hashedPwd;
        const doc = await user.save();
        res.status(201).json(token);

    }catch(err){
        console.error(err);
        res.status(500).json(err);
    }
}


// exports.login = 