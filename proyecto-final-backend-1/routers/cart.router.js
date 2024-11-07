import { Router } from 'express';
import CartController from '../controllers/CartController.js';

const cartRouter = Router();
const cartController = new CartController();

cartRouter.get('/', async(req, res) => {
    try{const  createCart = await cartController.createCart();
        res.status(200).send(createCart);
        } catch(error) {
            res.send('Working NO OK: ', error)
    };
} );

cartRouter.post('/:cid/product/:pid', async(req,res) => {
    try{const { cid, pid } = req.params;
        const {quantity} = req.body;

        const  addProductToCart = await cartController.addProductToCart(cid, pid, quantity);
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
