// import mongoose from "mongoose";
// import Product from "../models/product.model";
// import asyncHandler from "express-async-handler"
// import ProductRoutes from "../models/product.model";

// // CRUD
// // Create
// export const createProductList = asyncHandler(async (req, res, next) => {
//     const { name, title, description, price, image, category, countInStock, numReviews, rating } = req.body;  // ✅ Extract from req.body

//     // Validate request body
//     if (!name || !title || !description || price === undefined || !image || !category || countInStock === undefined || numReviews === undefined || rating === undefined) {
//         return res.status(400).json({ message: "All fields are required" });  // ✅ Prevents missing data errors
//     }

//     const product = new Product({
//         name,
//         title,
//         description,
//         price,
//         image,
//         category,
//         countInStock,
//         numReviews,
//         rating
//     });
//     // const createProductList = await Product.create(product)
//     // res.status(201).json(createProductList)

//     const createdProduct = await product.save();  // ✅ Saves product to MongoDB
//     res.status(201).json(createdProduct);
// });

// // READALL
// export const getProducts = asyncHandler(async (req, res, next) => {
//     const products = await ProductRoutes.find().exec()
//         res.status(200).json(products)
  

// })

// import mongoose from "mongoose";
// import Product from "../models/product.model.js";
// import asyncHandler from "express-async-handler";

// // CRUD
// // Create Product
// export const createProductList = asyncHandler(async (req, res, next) => {
//     const { name, title, description, price, image, category, countInStock, numReviews, rating } = req.body;

//     if (!name && !title && !description && !image && !category) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     const productList = await Product.create({
//         name,
//         title,
//         description,
//         price,
//         image,
//         category,
//         countInStock,
//         numReviews,
//         rating
//     });
//     res.status(201).json(productList);

   
// });

// //Get All Products
// export const getProductsList = asyncHandler(async (req, res, next) => {
//     const productsList = await Product.find().exec();
//     res.status(200).json(productsList);
// });

// //Get Product By ID
// export const getProductListById = asyncHandler(async (req, res, next) => {
//     const { id} = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({message: "Invalid product id"})
//     } 

//     const productList = await Product.findById(id).exec()
//     if(!productList){
//         return res.sendStatus(404).json({message: "product not found"})
//     }
//     res.status(200).json(productList)
// });

// // Update Product
// export const updateProductList = asyncHandler(async (req, res, next) => {
//    const { id } = req.params
//    const { name, title, description, price, image, category, countInStock, numReviews, rating} = req.body
//    if(!mongoose.Types.ObjectId.isValid(id)){
//          return res.status(400).json({message: "Invalid product id"})
//    }

//    const toUpdate = {}
//     if(name) toUpdate.name = name
//     if(title) toUpdate.title = title
//     if(description) toUpdate.description = description
//     if(price) toUpdate.price = price
//     if(image) toUpdate.image = image
//     if(category) toUpdate.category = category
//     if(countInStock) toUpdate.countInStock = countInStock
//     if(numReviews) toUpdate.numReviews = numReviews
//     if(rating) toUpdate.rating = rating 

//     if(Object.keys(toUpdate).length === 0) {
//         res.status(400).json({message: "No fields to updte"})
//     }

//     const updateProductList = await Product.findByIdAndUpdate(id, toUpdate, {new: true}).exec()
//        if(!updateProductList) {
//            return res.status(404).json({message: "Product not found"})
//        }

//          res.status(200).json({updateTodoList})
// });


// // Delete Product
// export const deleteProduct = asyncHandler(async (req, res, next) => {
//     // const product = await Product.findById(req.params.id);
//     const { id} =  req.params
//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({message: "Invaöid product id"})
//     }
//        const productList = await Product.findByIdAndDelete(id).exec()
//        if(!productList) {
//               return res.status(404).json({message: "Product not found"})
//        }
//          res.status(200).json({message: "Product deleted successfully"})
// });



import mongoose from "mongoose";
import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";

// Create Product
export const createProductList = asyncHandler(async (req, res) => {
    const { name, title, description, price, image, category, countInStock, numReviews, rating } = req.body;

    if (!name || !title || !description || !image || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const productList = await Product.create({
        name,
        title,
        description,
        price,
        image,
        category,
        countInStock,
        numReviews,
        rating
    });

    res.status(201).json(productList);
});

// Get All Products
export const getProductsList = asyncHandler(async (req, res) => {
    const productsList = await Product.find();
    res.status(200).json(productsList);
});

// Get Product By ID
export const getProductListById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid product id" });
    }

    const productList = await Product.findById(id);
    if (!productList) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(productList);
});

// Update Product
export const updateProductList = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, title, description, price, image, category, countInStock, numReviews, rating } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product id" });
    }

    const toUpdate = {};
    if (name) toUpdate.name = name;
    if (title) toUpdate.title = title;
    if (description) toUpdate.description = description;
    if (price) toUpdate.price = price;
    if (image) toUpdate.image = image;
    if (category) toUpdate.category = category;
    if (countInStock) toUpdate.countInStock = countInStock;
    if (numReviews) toUpdate.numReviews = numReviews;
    if (rating) toUpdate.rating = rating;

    if (Object.keys(toUpdate).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, toUpdate, { new: true });

    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
});

// Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Invalid product id" });
    }

    const productList = await Product.findByIdAndDelete(id);

    if (!productList) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
});
