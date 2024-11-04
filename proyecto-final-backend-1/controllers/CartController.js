import fs from 'fs';
import { cartModel } from '../models/carts.model.js';
import { productModel } from '../models/products.model.js';

export default class CartController {
    constructor(){}

        async listCarts(){ 
            try { 
                const objetos = await fs.promises.readFile(this.fPath,'UTF-8');
                return JSON.parse(objetos);
                } catch(error){
                    console.log('Error al listar: ', error);
                    return([]);
                }
            };

            async getCartProducts(cid){ 
                try {
                    return await cartModel.findById(cid).populate({ path: 'products', model: productModel }).lean();
                } catch (error) {
                    console.log(error);
                    return error;
                }
            };    

        async createCart(){ 
           try {
                const data = {products: [], status:'open'};  
                return await cartModel.create(data);
            }  catch(error)   {
                    console.log(error)
                    return(error);
                }
            };

            async addProductToCart(id,pid) {
                try{const getCart = await cartModel.findById(cid).lean();
                    let cartById = getCarts.find((x)=> x.id == id);

                    if (cartById){

                            let prodById = cart.products.find((x)=> x.pid == pid);
                            console.log(' Objeto: ',prodById)
                            if (prodById){
                                console.log('Ingresa OK porque existe el producto en el carro')
                                cart.products.map(async prod => {
                                    if(prod.pid == pid){
                                        prod.quantity += 1
                                    }
                                })
                            } else {let newProd = {pid: pid, quantity: 1}
                                    cart.products.push(newProd);
                            }
                               

                        await fs.promises.writeFile(this.fPath, JSON.stringify(getCarts));
                        console.log('Info carros :',getCarts);
                        return getCarts;
                    } else {return {error:'El carrito de compras no existe'}}
            }   catch(error)    {console.log("ERR: ", error)};
        };        

    };
