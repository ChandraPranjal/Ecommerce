const model = require('../model/user'); // Import your User model
const User = model.User

exports.getOrders = async (req, res) => {
    const userId = req.body.UserId; // Assuming the request body contains the seller's user ID

    try {
        const seller = await User.findOne({ _id: userId });
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        if (seller.UserType !== 'seller') {
            return res.status(400).json({ message: 'User is not a seller' });
        }
        const orders = seller.Order;

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Seller has no orders' });
        }
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the seller orders' });
    }
};

exports.createCatalog = async (req, res) => {
    const { SellerId, name, price } = req.body; // Assuming the request body contains SellerId, name, and price

    try {
        const seller = await User.findOne({ _id: SellerId });
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        if (seller.UserType !== 'seller') {
            return res.status(400).json({ message: 'User is not a seller' });
        }

        const catalogItem = {
            name,
            price,
        };
        seller.Catalog.push(catalogItem);
        await seller.save();

        res.status(201).json(catalogItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the catalog item' });
    }
};










