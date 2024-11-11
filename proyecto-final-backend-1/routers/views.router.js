import { Router } from 'express';
import fetch from 'node-fetch';
import CartController from '../controllers/CartController.js';


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

        //Para el link del carrito
        const cart = new CartController();
        const getOpenCart = await cart.getOpenCart();
        let openCartId;

        if (getOpenCart){
           openCartId = getOpenCart._id;
        } else {
           const createCart = await createCart();
           openCartId = createCart._id;
        }

        
        res.status(200).render('products', {products, openCartId});
     } catch (error) {
        console.log(error)
        res.status(500).render('server_error');
    }

});


viewsRouter.get('/products/:id', async (req, res) => {
    try {const response = await fetch(`${req.protocol}://${req.get('host')}/api/products/${req.params.id}`);
         const cart = new CartController();
         const product = await response.json();
         const getOpenCart = await cart.getOpenCart();
         let openCartId;
         if (getOpenCart){
            openCartId = getOpenCart._id;
         } else {
            const createCart = await createCart();
            openCartId = createCart._id;
         }
         res.status(200).render('product-detail', {product, openCartId});
     } catch (error) {
        console.log(error)
        res.status(500).render('server_error');
    }

});



viewsRouter.get('/carts/:cid', async (req, res) => {
    try {const response = await fetch(`${req.protocol}://${req.get('host')}/api/carts/${req.params.cid}`);
         const cartData = await response.json();
         const {cid} = req.params;
         //if (cartData){ console.log(cartData)} else { console.log('Carrito no existe_ ', cartData) }
        //console.log(cartData)
        res.status(200).render('cart-detail', {cartData, cid});
     } catch (error) {
        console.log(error)
        res.status(500).render('server_error');
    }

});


export default viewsRouter;









