const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    UserName: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    UserType: { type: String, required: true, enum: ['buyer', 'seller'] },
    Catalog: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
        }
    ],
    Order: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
        }
    ],
});

exports.User = mongoose.model('User', UserSchema);