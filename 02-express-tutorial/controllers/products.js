const { products } = require('../data.js');

function testing(req,res) {
    res.json({message: "It worked!"});
}
function getProducts(req,res) {
    console.log(products)
    res.json(products);
}
function getProductID(req,res) {
    const idToFind = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === idToFind);
    return !product
        ? res.status(404).json({ message: "That product was not found." }) 
        : res.json(product);
}
function queryFilter(req,res) {
    const { search, limit = 0, maxPrice = 0 } = req.query;
    const maxLimit = parseInt(limit, 10);
    const filteredProducts = products.reduce((acc, product) => {
        if (
            product.price > parseFloat(maxPrice) || 
            (search && !product.name.includes(search)) ||
            (maxLimit && acc.length === maxLimit)
        ) {
            return acc;
        }
        acc.push(product);
        return acc;
    }, []);

    res.status(200).json(filteredProducts);
}

module.exports = { testing, getProducts, getProductID, queryFilter };