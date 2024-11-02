import { Router } from 'express';
import fetch from 'node-fetch';


const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
    const data = {};
    
    res.status(200).render('form', data);
});

viewsRouter.get('/products', async (req, res) => {
    const response = await fetch(`${req.protocol}://${req.get('host')}/api/products`);
    const products = await response.json();
    res.status(200).render('products', {products:products});
});


export default viewsRouter;









