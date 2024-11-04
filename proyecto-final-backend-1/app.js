import  express 		from 'express';
import  productRouter	from './routers/product.router.js';
import  cartRouter		from './routers/cart.router.js';
import  viewsRouter     from './routers/views.router.js';
import  config          from './config.js';
import  handlebars      from 'express-handlebars';
import  initSocket      from './sockets.js';
import  mongoose        from 'mongoose';

const app = express();


const httpServer = app.listen(config.PORT, async () => {
    console.log(`Server activo en puerto ${config.PORT}`);
    await mongoose.connect(config.MONGODB_URI);
    const socketServer = initSocket(httpServer);
    app.set('socketServer', socketServer);
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.engine('handlebars', handlebars.engine());
    app.set('views', `${config.DIRNAME}views`);
    app.set('view engine', 'handlebars');

    app.use('/', viewsRouter);
    app.use('/api/products/', productRouter);
    app.use('/api/carts/', cartRouter);   
    app.use('/static', express.static(`${config.DIRNAME}/public`));

});

