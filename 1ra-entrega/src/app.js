import  express 		from 'express';
import  productRouter	from './routers/product.router.js';
import  cartRouter		from './routers/cart.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products/', productRouter);
app.use('/api/carts/', cartRouter);

const PORT = 8080;
const server = app.listen(PORT, ()=>{
 console.log(`Escuchando en puerto: ${PORT}`);
});
