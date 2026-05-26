import express from "express";
import crypto from "crypto";

import { products } from "./src/data/products.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString();

    console.log(`[${time}] ${method} request to ${url}`);

    next();
});

app.get('/', (req, res, next) => {
    try {
        return res.send('This is homepage');
    } catch (err) {
        return next(err);
    }
});

app.get('/products', (req, res, next) => {
    try {
        let data = products;
        const { name } = req.query;
        if (name) {
            const [_, pattern, flags] = (name.match(/^\/(.*?)\/([gimsuy]*)$/) || [null, name, ""]);
            const regex = new RegExp(pattern, flags);
            data = products.filter(i => regex.test(i.name));
        }
        return res.status(200).json(data)
    } catch (err) {
        return next(err);
    };
});

app.get('/products/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const product = products.find((i) => i.id === id);
        if (!product) {
            return next(Object.assign(new Error("Product not found"), { status: 404 }));
        }
        return res.status(200).json(product);
    } catch (err) {
        return next(err);
    }
});

app.post('/products', (req, res, next) => {
    // console.log(req.body);
    let { name, price, quantity } = (req.body || {});
    if (!name || !price) return next(Object.assign(new Error("name and price are required"), { status: 400 }));
    if (!quantity) quantity = "1";
    const data = { id: crypto.randomUUID(), name, price, quantity };
    products.push(data);
    return res.status(201).json({ success: true, data });
});

app.patch('/products/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        let { name, price, quantity } = (req.body || {});
        // if (!(name && price && quantity)) return next(Object.assign(new Error("new name, price, and quantity required for PUT")));
        const product = products.find((i) => i.id === id);
        if (!product) return next(Object.assign(new Error("id not found"), { status: 404 }));
        const index = (products.indexOf(product));
        products[index].name = (name || products[index].name);
        products[index].price = (price || products[index].price);
        products[index].quantity = (quantity || products[index].quantity);
        return res.status(200).json({ success: true, data: products[index] });
    } catch (err) {
        return next(err);
    }
});

app.delete('/products/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        const product = products.find((i) => i.id === id);
        if (!product) return res.status(404).json({ success: false, message: "id not found!" });
        const index = (products.indexOf(product));
        // console.log(products.splice(products[index], products[index + 1]));
        // const [dataDeleted] = products.splice(products[index], products[index + 1]);
        // console.log(dataDeleted);
        const [del] = products.splice(index, 1)
        return res.status(200).json({ success: true, data: del });
    } catch (err) {
        return next(err);
    }
});

app.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: (err.message || "Internal Server Error!"),
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
        stack: err.stack,
    });
})

// =========================== Not in Request-Response Cycle
const port = 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});