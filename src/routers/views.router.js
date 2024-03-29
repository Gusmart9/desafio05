const { Router } = require("express");
const ProductManager = require('../ProductManager.js');

const router = Router();

router.get('/', async (req, res) => {
    const products = await ProductManager.getProducts()
    res.render('home', { products })
})

router.get('/realtimeproducts', async (req, res) => {
    const products = await ProductManager.getProducts()
    res.render('realTimeProducts', { products })
})

export default router;