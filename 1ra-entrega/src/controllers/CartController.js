import fs from 'fs';

export default class CartController {
    constructor(){
        this.fPath = './carrito.json'
        if (!fs.existsSync(this.fPath)) {
			fs.writeFileSync(this.fPath, JSON.stringify([]));
		    };
        }

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
                try {const getCarts  = await this.listCarts();
                     const cartById  = getCarts.find((x)=> x.id == cid);     
                        if(cartById){
                            return cartById
                            } else {
                            return {error: `El carrito ID: ${cid}, no existe.`}
                        }
                    } catch(error){
                        console.log();
                        return({error:'Error al obtener productos del carrito', ERR: error});
                    }
                };    

        async createCart(){ 
           try {let newId = 0;
                const arrCarritos = await this.listCarts();
                    if(arrCarritos.length == 0){
                        newId = 1;
                       }   else   {
                        let cartIds = arrCarritos.map( x =>{ return parseInt(x.id) } );
                        let maxId = Math.max(...cartIds);
                        newId = maxId + 1;
                    };
                const datosCarrito = {products: []};
                const nuevoObjeto = {...datosCarrito, id: newId};
    
                arrCarritos.push(nuevoObjeto);
                await fs.promises.writeFile(this.fPath, JSON.stringify(arrCarritos));
                return newId  }   catch(error)   {
                    return(error);
                }
            };

            async addProductToCart(id,pid) {
                try{const getCarts = await this.listCarts();
                    let cartById = getCarts.find((x)=> x.id == id);

                    if (cartById){
                    getCarts.map(async cart => {
                        if(cart.id == cartById.id){
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
                         }            
                    })
                        await fs.promises.writeFile(this.fPath, JSON.stringify(getCarts));
                        console.log('Info carros :',getCarts);
                        return getCarts;
                    } else {return {error:'El carrito de compras no existe'}}
            }   catch(error)    {console.log("ERR: ", error)};
        };        

    };
