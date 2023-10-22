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



exports.login = async (req, res) => {

    try {
        const user = await User.findOne({ UserName: req.body.UserName })
        const isAuth = bcrypt.compareSync(req.body.Password, user.Password);
        if (isAuth) {
            const payload = {
                UserName: req.body.UserName,
            };
            const options = {
                expiresIn: '1d',
            };
            var token = jwt.sign(payload, process.env.SECRET_KEY, options);
            user.token = token;
            const doc = await user.save();
            console.log(doc);
            res.status(201).json(token);
        }
        else
            res.send("Wrong Password or UserName")
    }
    catch (err) {
        res.status(401).json(err);
    }


}