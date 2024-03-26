const express = require("express");
const router = express.Router();
const { testing, getProducts, getProductID, queryFilter } = require("../controllers/products");

router.get('/test', testing );
router.get('/products', getProducts );
router.get('/products/:productID', getProductID )
router.get('/query', queryFilter)
// router.post('', );
// router.put('', );
// router.delete('', );

module.exports = router;