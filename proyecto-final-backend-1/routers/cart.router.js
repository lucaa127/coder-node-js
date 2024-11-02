import { Router } from 'express';
import CartController from '../controllers/CartController.js';

const cartRouter = Router();
const cartController = new CartController();

cartRouter.post('/', async(req, res) => {
    try{const  createCart = await cartController.createCart();
        console.log(createCart)
        } catch(error) {
            res.send('Working NO OK: ', error)
    };
} );

cartRouter.post('/:cid/product/:pid', async(req,res) => {
    try{const { cid, pid } = req.params;
        const  addProductToCart = await cartController.addProductToCart(cid, pid);
        res.status(201).send(addProductToCart)
        }  catch(error)  {
            res.send('Error al agregar productos al carrito: ', error)
    };
} )

cartRouter.get('/:cid', async(req, res) => {
    try {const {cid} = req.params;
         const   products = await cartController.getCartProducts(cid);
         res.status(201).send(products)
         } catch (error) {
          console.log(error)
          res.send(error);
    }
} );


export default cartRouter
