import fs from 'fs';
import { productModel } from '../models/products.model.js';

export default class ProductController {
    constructor(){}

    //métodos

        //Listar productos
        getProducts = async () => {
                try {
                    return await productModel.find().lean();
                } catch (err) {
                    return err.message;
                }
            };

        getPaginated = async (pg) => {
            try {
                const data = await productModel.paginate({}, { limit: 2, page: pg, lean: true });
                //console.log(data.docs[0])
                return data;
            } catch (err) {
                return err.message;
            }
        }
        
        async getProductById(id){
            try {let obj = await this.getProducts();
                 obj = obj.find(x => x.id == id)
                 if (obj === undefined){
                    return `No se pudo encontrar el producto ID: ${id}`;
                    } else {
                 return obj;}
            }   catch(error)  { return 'Error al buscar producto por ID'}
        };

        async addProduct(prod){
            try{    const objetos = await this.getProducts();
                    let newId = 0;
                        if (objetos.length == 0){
                            newId = 1;
                        } else {
                            let valorIds = objetos.map( ids => { return parseInt(ids.idNumber) } );
                            let maxID = Math.max(...valorIds)
                            newId = maxID + 1;
                        };

                        const msgRequiredProps   = [];
                        const cleanProduct    = {code:"", title:"", description:"", status:"", price:0, thumbnails:[], category:"", stock:0};
                        const {code, title, description, status, price, thumbnails, category, stock} = prod;
                        (!code)          ? msgRequiredProps.push('code')            : cleanProduct.code         = code;
                        (!title)         ? msgRequiredProps.push('title')           : cleanProduct.title        = title;
                        (!description)   ? msgRequiredProps.push('description')     : cleanProduct.description  = description;
                        (!status)        ? msgRequiredProps.push('status')          : cleanProduct.status       = true;
                        (!price)         ? msgRequiredProps.push('price')           : cleanProduct.price        = price;
                        (!category)      ? msgRequiredProps.push('category')        : cleanProduct.category     = category;
                        (!stock)         ? msgRequiredProps.push('stock')           : cleanProduct.stock        = stock;
                        (!thumbnails)    ? cleanProduct.thumbnails = []             : cleanProduct.thumbnails.push(...thumbnails);

                        if (msgRequiredProps.length > 0){
                            console.log('Error: faltan campos obligatorios')
                            return {Error: `Las siguientes propiedades son obligatorias: ${msgRequiredProps}`}
                        } else {
                            const objetoNuevo = {...cleanProduct,idNumber: newId};
                            objetos.push(objetoNuevo);
                            //await fs.promises.writeFile(this.fPath, JSON.stringify(objetos));
                            const insert = await productModel.create(objetoNuevo);
                            return { INSERT : `producto id: ${newId} agregado correctamente` }
                        }

                } catch(error) {
                    console.log('Error al guardar: ', error);
                    }
            }; 

            async updateProduct(id, product){
                try {let prods       = await this.getProducts();
                     let prod        = prods.find((x)=> x.id == id);
                     let prodsFilter = prods.filter((x) => x.id != id);
                        if (!prod){
                            return {Error: 'Producto no encontrado'};
                        } else {
                           
                            const {code, title, description, status, price, thumbnails, category, stock} = product;
                            (code)          ? prod.code         = code            : null;
                            (title)         ? prod.title        = title           : null;
                            (description)   ? prod.description  = description     : null;
                            (status)        ? prod.status       = status          : null;
                            (price)         ? prod.price        = price           : null;
                            (thumbnails)    ? prod.thumbnails   = thumbnails      : null;
                            (category)      ? prod.category     = category        : null;
                            (stock)         ? prod.stock        = stock           : null;
        
                            const objetoActualizado = {...prod,id: id};
                            prodsFilter.push(objetoActualizado);
                            await fs.promises.writeFile(this.fPath, JSON.stringify(prodsFilter));
                            
                            return { UPDATE : `producto id: ${id} actualizado correctamente` }}
        
                        } catch(error) {  console.log(error)  }
            };
        
            async deleteById(id){
                try{
                    let objetos = await this.getProducts();
                    const objToDelete = objetos.findIndex(x => x.id == id);
                        if (objToDelete !== -1){
                           objetos = objetos.filter(x => x.id != id);
                           await fs.promises.writeFile(this.fPath,JSON.stringify(objetos));
                           return (`El producto id:${id}, fue eliminado.`)
                    } else {
                           return (`El producto id:${id}, no existe.`)
                    }
                } catch(error) {
                    return ('Error al eliminar por ID')
                }
            };


    };