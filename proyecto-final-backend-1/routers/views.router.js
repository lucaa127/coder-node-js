import { Router } from 'express';
import fetch from 'node-fetch';


const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
    const data = {};
    
    res.status(200).render('form', data);
});

viewsRouter.get('/products', async (req, res) => {
    try {let page = (req.query.page || (!isNaN(req.query.page))) ? req.query.page : 1;   
         let limit = (req.query.limit || (!isNaN(req.query.limit))) ? req.query.limit : 10;
         let sort = (req.query.sort && (!isNaN(parseInt(req.query.sort)))) ? parseInt(req.query.sort) : false;
         //let order = req.query.order ?limit=1&page=1
        const response = await fetch(`${req.protocol}://${req.get('host')}/api/products/?limit=${limit}&page=${page}&sort=${sort}`);
        const products = await response.json();
        
        res.status(200).render('products', {products});
     } catch (error) {
        console.log(error)
        res.status(500).render('server_error');
    }

});


viewsRouter.get('/products/:id', async (req, res) => {
    try {
        const response = await fetch(`${req.protocol}://${req.get('host')}/api/products/${req.params.id}`);
        const product = await response.json();
        
        res.status(200).render('product-detail', {product});
     } catch (error) {
        console.log(error)
        res.status(500).render('server_error');
    }

});


export default viewsRouter;









