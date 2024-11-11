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
                return await cartModel.findById(cid).populate({ path: 'products._id', model: productModel, select: 'title price' }).lean();
            } catch (error) {
                console.log(error);
                return false;
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


        async addProductToCart (cartId, productId, quantity) {
            try {
              const cart = await cartModel.findOneAndUpdate(
                { _id: cartId, "products._id": productId },
                { $inc: { "products.$.qty": quantity } },
                { new: true }
              );
          
              if (!cart) {
                 
                const updatedCart = await cartModel.findByIdAndUpdate(
                  cartId,
                  { $push: { products: { _id: productId, qty: quantity } } },
                  { new: true }
                );
                console.log('updatedCart :', updatedCart)
                return updatedCart;
              }
              
              return cart;
            } catch (error) {
              console.error("Error updating cart:", error);
            }
          };

          async updateProductQty(cartId, productId, qty) {
            try {  const cart = await cartModel.findOneAndUpdate(
                    { _id: cartId, "products._id": productId },
                    { $set: { "products.$.qty": qty } },
                    { new: true }
                );
                return cart;
            } catch (error) {
                console.error("Error updating product qty:", error);
            }
        }


    };
