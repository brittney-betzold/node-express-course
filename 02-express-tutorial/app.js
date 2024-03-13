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
    return !product
    ? res.status(404).json({ message: "That product was not found." }) 
    : res.json(product);
})
app.get('/api/v1/query', (req, res) => {
    const { search, limit = 0, maxPrice = 0 } = req.query;

    const maxLimit = parseInt(limit, 10);

    // use Array.reduce to build a list of filtered products
    const filteredProducts = products.reduce((acc, product) => {
        // if the product price is greater than maxPrice OR
        // if there's a search and the product name doesn't include the search term OR
        // if there’s a limit and the accumulator (acc === list of filtered products) hit the limit
        // then return the accumulator (acc === list of filtered products)
        if (
            product.price > parseFloat(maxPrice) || 
            (search && !product.name.includes(search)) ||
            (maxLimit && acc.length === maxLimit)
        ) {
            return acc;
        }
       
        // add product to accumulator list
        acc.push(product);

        // return the accumulator to check the next product
        return acc;
    }, []);

    res.status(200).json(filteredProducts);
});

app.all('*', (req,res)=> {
  res.status(404).send('<h1>Page Not Found<h1>')
})
app.listen(3000, () => {
    console.log('server is listening on port 3000')
})