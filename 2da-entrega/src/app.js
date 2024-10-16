import  express 		from 'express';
import  productRouter	from './routers/product.router.js';
import  cartRouter		from './routers/cart.router.js';
import  config          from './config.js';
import  handlebars      from 'express-handlebars';
import  initSocket      from './sockets.js';

const app = express();


const httpServer = app.listen(config.PORT, () => {
    console.log(`Server activo en puerto ${config.PORT}`);

    const socketServer = initSocket(httpServer);
    app.set('socketServer', socketServer);
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res)=>{
        res.render('form');
    })
    app.engine('handlebars', handlebars.engine());
    app.set('views', `${config.DIRNAME}views`);
    app.set('view engine', 'handlebars');

    app.get('/', (req, res)=>{
        res.render('form');
    })
    
    app.use('/static', express.static(`${config.DIRNAME}/public`));
    app.use('/api/products/', productRouter);
    app.use('/api/carts/', cartRouter);
});

