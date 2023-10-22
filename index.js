const express = require('express')
const jwt = require('jsonwebtoken')
const {default:mongoose} = require('mongoose');
const authRouter = require('./routes/auth')
// const buyerRouter = require('./routes/buyer')
// const sellerRouter = require('./routes/seller')


require('dotenv').config()

const app = express()

app.use(express.json());


const auth = (req, res, next) => {
    const authorizationHeader = req.get('Authorization');
    if (authorizationHeader) {
        const token = authorizationHeader.split('Bearer ')[1];
        try {
            var decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded.UserName) {
                console.log("JWT verified");
                next();
            }
            else {
                res.status(401).send('Unauthorized');
            }
        } catch {
            res.status(401).send('Unauthorized');
        }
    }
    else {
        res.status(401).send('Unauthorized');
    }
}



main().catch(err => console.log(err));
async function main()
{
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
    console.log("database connected")
}

app.use('/api/auth',authRouter.AuthRoutes)
// app.use('/api/buyer',auth,buyerRouter.router.BuyerRoutes )
// app.use('/api/seller',auth,sellerRouter.SellerRoutes )
























app.listen(process.env.PORT || 5000, () => {
    console.log("Server is listening...")
})

