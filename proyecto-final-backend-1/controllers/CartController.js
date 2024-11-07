import fs from 'fs';
import { cartModel } from '../models/carts.model.js';
import { productModel } from '../models/products.model.js';

export default class CartController {
    constructor(){}

        async listCarts(){ 
            try { return await cartModel.find().lean();
            } catch (error) {
                console.log(error);
                return([]);     
            }
                                
                
            };

        async getOpenCart(){
            try { return await cartModel.findOne({status: "open"}).lean();
            } catch (error) {
                console.log(error);
                return error;
            }
        }

        
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

        //     async addProductToCart(id,pid) {
        //         try{const getCart = await cartModel.findById(cid).lean();
        //             if (getCart){
        //                     let prodById = getCart.products.find((x)=> x.pid == pid);
        //                     console.log(' Objeto: ',prodById)
        //                     if (prodById){
        //                         console.log('Ingresa OK porque existe el producto en el carro')
        //                         cartModel.findOneAndUpdate({_id: id, products._id:pid}, updated, options);
                                
        //                     } else {//let newProd = {pid: pid, quantity: 1}
        //                           //  cart.products.push(newProd);
        //                     }
                               

        //                 await fs.promises.writeFile(this.fPath, JSON.stringify(getCarts));
        //                 console.log('Info carros :',getCarts);
        //                 return getCarts;
        //             } else {return {error:'El carrito de compras no existe'}}
        //     }   catch(error)    {console.log("ERR: ", error)};
        // };        



        async addProductToCart (cartId, productId, quantity) {
            try {
              const cart = await cartModel.findOneAndUpdate(
                { _id: cartId, "products._id": productId },
                { $inc: { "products.$.qty": quantity } },
                { new: true }
              );
          
              if (!cart) {
                // Si el producto no existe en el carrito, agrégalo con la cantidad inicial
                const updatedCart = await cartModel.findByIdAndUpdate(
                  cartId,
                  { $push: { products: { _id: productId, qty: quantity } } },
                  { new: true }
                );
                console.log('updatedCart :', updatedCart)
                return updatedCart;
              }
              
              return cart; // Retorna el carrito actualizado
            } catch (error) {
              console.error("Error updating cart:", error);
              throw error;
            }
          };

    };
