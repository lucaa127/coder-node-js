import { Server } from 'socket.io';
import ProductController from './controllers/ProductController.js';

const prodController = new ProductController();

const initSocket = (httpServer) => {
    const messages = [];
    
    const io = new Server(httpServer);

    io.on('connection', async client => {
        console.log(`Cliente conectado, id ${client.id} desde ${client.handshake.address}`);

        const products      = await prodController.getPaginated(1)
   
        client.emit('server:product-data', products.docs);


        client.on('client:product-data', async data => {
            //const prod_test = {'name':'prod1', 'price':30};
            //code, title, description, status, price, thumbnails, category, stock
            const new_product   = {...data, code: '0001', status: true, stock: 1};
            const add_products  = await prodController.addProduct(new_product);
            const products      = await prodController.getProducts();

            client.emit('server:product-data', products);
        });

        client.on('client:delete-product', async data => {
            console.log(`Producto ID: ${data} eliminado.`)
            const products      = await prodController.getProducts();
            client.emit('server:product-data', products);
        });

        client.on('disconnect', reason => {
            console.log(reason);
        });
    });

    return io;
}

export default initSocket;