import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const productRouter = Router();
const prodController = new ProductController();

productRouter.get('/', async(req, res) => {
    try {const   products = await prodController.getProducts();
        let   limit = parseInt(req.query.limit);
        
        if (!limit || (isNaN(limit))) {
            res.send(products); 
         } else {
            res.send(products.slice(0,limit));
        }
    } catch (error) {
        console.log(error)
        res.send(error);
    }
} );

productRouter.get ('/:pid', async(req,res)=> {
    const { pid } = req.params;
    const prods = await prodController.getProductById(pid);
    res.json(prods);
});

productRouter.post('/', async(req,res)=> {
   try {const data = req.body;
        const addProduct = await prodController.addProduct(data);
        res.status(201).send(addProduct);
        } catch (error) {
        res.status(500).send({err: error});
   } 

})

productRouter.put('/:pid', async(req,res) => {
    try{const { pid } = req.params;
        const product = req.body;
        const  updateProduct = await prodController.updateProduct(pid, product);
        res.status(201).send(updateProduct)
        }  catch(error)  {
            res.send('Error al actualizar producto: ', error)
    };
} )

productRouter.delete('/:pid', async(req,res) => {
    try{const { pid } = req.params;
        const  deleteProduct = await prodController.deleteById(pid);
        res.status(201).send(deleteProduct)
        }  catch(error)  {
            res.send('Error al actualizar producto: ', error)
    };
} )

export default productRouter;