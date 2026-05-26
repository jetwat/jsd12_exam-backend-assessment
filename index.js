import express from "express";
import crypto from "crypto";

import { products } from "./src/data/products.js";

const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    return res.send('This is homepage');
});

app.get('/products', (req, res) => {
    return res.status(200).json(products);
});

app.get('/products/:id', (req, res) => {
    // const yo = String(Number(req.params.id)-1);
    const id = req.params.id;
    // console.log(id);
    // res.send(products[yo])
    // const index = products.indexOf(id);
    // console.log(products.find((i) => i.id === id));
    return res.status(200).json(products.find((i) => i.id === id));
});

app.post('/products', (req, res) => {
    // console.log(req.body);
    let { name, price, quantity } = req.body || {};
    if (!name || !price) return res.status(401).json({ success: false, message: "name and price are required!!!!!!!!!!" })
    if (!quantity) quantity = "1";
    const data = { id: crypto.randomUUID(), name, price, quantity };
    products.push(data);
    return res.status(200).json({ success: true, data });
});

app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    let { name, price, quantity } = req.body || {};
    const product = products.find((i) => i.id === id);
    if (!product) return res.status(400).json({ success: false, message: "id not found!" });
    const index = (products.indexOf(product));
    products[index].name = name;
    products[index].price = price;
    products[index].quantity = quantity;
    return res.status(200).json({ success: true, data: products[index] });
});

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find((i) => i.id === id); 
    if (!product) return res.status(400).json({ success: false, message: "id not found!" });
    const index = (products.indexOf(product));
    // console.log(products.splice(products[index], products[index + 1]));
    // const [dataDeleted] = products.splice(products[index], products[index + 1]);
    // console.log(dataDeleted);
    const [del] = products.splice(products[index], 1)
    return res.status(200).json({ success: true, data: del });
});

    // const index = items.findIndex(item => item.id === parseInt(req.params.id));
    // if (index !== -1) {
    //     items.splice(index, 1);
    //     res.status(200).send("Deleted successfully");
    // } else {
    //     res.status(404).send("Item not found");
    // }


// ===========================
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});