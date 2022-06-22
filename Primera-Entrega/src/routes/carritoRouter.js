const express = require('express')
const carritoRouter = express.Router();
const carrito = require('../controller/carrito');
const productos = require('../controller/producto');

let myCarrito = new carrito('./controller/carrito.txt');
let myProductos = new productos('./controller/productos.txt');

carritoRouter.get('/:id/productos', async (req, res) => {
    try {
        let idCart = req.params.id;
        let productsId = await myCarrito.productoId(idCart);
        if (productsId.length == 0) {
            return res.json({ error: `No existe el carrito con el id ${idCart}` });
        } else {
            return res.json(productsId);
        }
    } catch (error) {
        return res.json({ error: `Error ${error}` });
    }
});

carritoRouter.post('/', async (req, res) => { 
    try{
        const id = await myCarrito.guardarCarrito();
        return res.json(`El id Asignado del carrito es : ${id}`);
    }catch (error) {
        return res.json({ error: `Error ${error}` });
    }
});
carritoRouter.post('/:idCar/:idProd', async (req, res) => {
    try{
        let idCart = Number(req.params.idCar);
        let idProduct = req.params.idProd;

        let allCarts = await myCarrito.listarCarrito();

        const cartIndex = allCarts.findIndex(cart => cart.id == idCart);

        if (cartIndex < 0) {
            return res.json({ error: `No existe el carrito` });
        }

        let cart = await myCarrito.carritoId(idCart);
        if(cart.length == 0){
            return res.json({ error: `Error no se encontro el carrito con el id ${idCart}` });
        }
        let productId = await myProductos.listarId(idProduct);
        if(productId.length == 0){
            return res.json({ error: `Error no se encontro el producto con el id ${idProduct}` });
        }

        allCarts[cartIndex].products.push(productId[0]);
        await myCarrito.write(allCarts,`Producto agregado al carrito`);
        return res.json(`Producto agregado con id ${idProduct} al carrito con id ${idCart}`);
    }catch (error) {
        return res.json({ error: `Error ${error}` });
    }
});
carritoRouter.delete('/:id', async (req, res) => {
    try{
        let idCart = Number(req.params.id);
        await myCarrito.borrarCarrito(idCart);
        return res.json(`Carrito con id ${idCart} eliminado`);
    }catch (error) {
        return res.json({ error: `Error ${error}` });
    }
 });
carritoRouter.delete('/:id/productos/:idProd', async (req, res) => {
    try{
        let idCart = Number(req.params.id);
        let idProduct = req.params.idProd;
        await myCarrito.eliminarProducto(idCart,idProduct);
        return res.json(`Producto con id ${idProduct} eliminado del carrito con id ${idCart}`);
    }catch (error) {
        return res.json({ error: `Error ${error}` });
    }
});
module.exports = carritoRouter;