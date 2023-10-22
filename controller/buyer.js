const model = require('../model/user')
const User = model.User


exports.getSellers = async (req, res) => {
    try {
        const sellers = await User.find({ UserType: 'seller' },{'UserName':1});

        if (sellers.length > 0) {
            res.status(200).json(sellers);
        } else {
            res.status(404).json({ message: 'No sellers found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching sellers' });
    }
};


exports.getCatalog = async (req, res) => {
    const sellerId = req.params.seller_id;

    try {
        const seller = await User.findOne({ _id: sellerId });

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        if (seller.UserType !== 'seller') {
            return res.status(400).json({ message: 'User is not a seller' });
        }

        const catalog = seller.Catalog;

        if (!catalog || catalog.length === 0) {
            return res.status(404).json({ message: 'Seller has no items in the catalog' });
        }

        const catalogData = catalog.map(item => ({ name: item.name, price: item.price }));

        res.status(200).json(catalogData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the seller catalog' });
    }
};

exports.book = async (req, res) => {
    const sellerId = req.params.seller_id;
    const { name, quantity } = req.body; // Assuming the request body contains the name and quantity of the order

    try {
        const seller = await User.findOne({ _id: sellerId });

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        if (seller.UserType !== 'seller') {
            return res.status(400).json({ message: 'User is not a seller' });
        }

        const order = {
            name,
            quantity,
        };
        seller.Order.push(order);

        await seller.save();

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the order' });
    }
};











