const express = require("express");
const app = express();
const { products } = require('./data');


app.use(express.static("./public"))

app.get('/api/v1/test', (req,res) => {
    res.json({message: "It worked! "})
})
app.get('/api/v1/products', (req,res) => {
    res.json(products);
    console.log(products)
})
app.get('/api/v1/products/:productID', (req,res) => {
    const idToFind = parseInt(req.params.productID); 
    const product = products.find((p) => p.id === idToFind);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "That product was not found." });
    }
})
app.get('/api/v1/query', (req, res) => {
    const { search, limit, maxPrice } = req.query;
    let filteredProducts = products.filter(product => product.name.startsWith(search || ''));
        filteredProducts = filteredProducts.filter(product => product.price < (maxPrice ? parseFloat(maxPrice) : 20.00));
    if (limit) {
        filteredProducts = filteredProducts.slice(0, parseInt(limit));
    }
    res.json(filteredProducts);
});

app.all('*', (req,res)=> {
  res.status(404).send('<h1>Page Not Found<h1>')
})
app.listen(3000, () => {
    console.log('server is listening on port 3000')
})