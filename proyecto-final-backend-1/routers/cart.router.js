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


cartRouter.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { productId, quantity } = req.body;
        const addProductToCart = await cartController.addProductToCart(cid, productId, quantity);
        
        console.log(addProductToCart);
        res.status(201).send(addProductToCart)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});

cartRouter.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const  quantity  = req.body.quantity;
        const updateProdQty = await cartController.updateProductQty(cid, pid, quantity);
       
        res.status(201).send(updateProdQty)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});


//DELETE S 
cartRouter.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const deleteProducts = await cartController.deleteAllProducts(cid);
        
        console.log(deleteProducts);
        res.status(201).send(deleteProducts)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});


cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {const { cid, pid } = req.params;
         const deleteProduct = await cartController.deleteProductById(cid, pid);
         res.status(201).send(deleteProduct)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
});



export default cartRouter
