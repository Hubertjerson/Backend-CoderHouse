const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
} = require("../resolvers/productosResolvers");

const rootValueFn = () => {
    return {
        getAllProducts, // = getAllProducts: getAllProducts
        getProductById, // = getProductById: getProductById
        addProduct, // = addProduct: addProduct
        updateProductById, // = updateProductById: updateProductById
        deleteProductById // = deleteProductById: deleteProductById
    }

}

module.exports = rootValueFn;