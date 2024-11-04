import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const productRouter = Router();
const prodController = new ProductController();

productRouter.get('/', async(req, res) => {
try {   let page = (req.query.page && (!isNaN(req.query.page))) ? req.query.page : 1;  
        let limit = (req.query.limit && (!isNaN(parseInt(req.query.limit)))) ? parseInt(req.query.limit) : 10;
        let sort = (req.query.sort && (!isNaN(parseInt(req.query.sort)))) ? parseInt(req.query.sort) : false;
              
        const getProducts    = await prodController.getPaginated(page, sort, limit);
        const products       = (!limit || (isNaN(limit))) ? getProducts.docs : getProducts.docs.slice(0,limit);  
        const data  = {
            status:200
            ,payload: products
            ,totalPages: getProducts.totalPages
            ,prevPage: getProducts.prevPage
            ,nextPage: getProducts.nextPage
            ,page: getProducts.page
            ,hasPrevPage: getProducts.hasPrevPage
            ,hasNextPage: getProducts.hasNextPage
            ,prevLink: ((getProducts.hasPrevPage) ? `/products/?limit=${limit}&page=${getProducts.prevPage}&sort=${sort}` : false)
            ,nextLink: ((getProducts.hasNextPage) ? `/products/?limit=${limit}&page=${getProducts.nextPage}&sort=${sort}` : false)
        }

            res.send(data); 

} catch (error) {
        console.log(error)
        res.send(error);
}

} );

productRouter.get ('/:pid', async(req,res)=> {
    const { pid } = req.params;
    const product = await prodController.getProductById(pid);
    res.status(200).json(product);
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
            res.status(500).send('Error al actualizar producto: ', error)
    };
} )

productRouter.delete('/:pid', async(req,res) => {
    try{const { pid } = req.params;
        const  deleteProduct = await prodController.deleteById(pid);
        res.status(201).send(deleteProduct)
        }  catch(error)  {
            res.status(500).send('Error al actualizar producto: ', error)
    };
} )

export default productRouter;