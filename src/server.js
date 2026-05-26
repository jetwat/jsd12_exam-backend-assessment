import express from "express";

import { products } from "./data/products.js";

const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    res.send('This is homepage');
});

app.get('/products', (req, res) => {
    res.status(200).json(products);
});

app.get('/products/:id', (req, res) => {
    // const yo = String(Number(req.params.id)-1);
    const id = req.params.id - 1;
    // console.log(typeof req.params.id);
    // res.send(products[yo])
    res.status(200).json(products[id]);
});

app.post('/products', async (req, res) => {
    console.log(req.body);
    res.json({ success: true, data: req.body});
});












// ===========================
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});