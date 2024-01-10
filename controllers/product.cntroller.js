const db = require('../configs/db')
async function findALLProduct(req, res, next) {
    try {
        const page = +req.query.page
        const limit = +req.query.limit

        if (req.query.page && req.query.limit && (isNaN(page) || page < 1 || isNaN(limit) || limit < 1)) {
            const error = new Error("limit or|and page must be a positive integer")
            error.status = 400
            throw error
        }

        const countQuery = "SELECT COUNT(id) FROM users";
        const [[result]] = await db.query(countQuery);
        
    } catch (error) {
        console.log(error);
    }

} 
async function updateProduct(req, res, next) {
   
} 
async function findByidProduct(req, res, next) {

    
}  
async function deleteProduct(req, res, next) {

    
} 
async function createProduct(req, res, next){
    
}  
module.exports = {
    deleteProduct,
    createProduct,
    findALLProduct,
    updateProduct,
    findByidProduct
}