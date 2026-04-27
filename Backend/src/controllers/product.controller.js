import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";    



export async function createProduct(req, res) {

        const{title, description, priceAmount , priceCurrency } = req.body;
        const seller  =  req.user
    
        const images=  await Promise.all(req.files.map(async (file)=>{
                return await  uploadFile({
                        buffer : file.buffer ,
                         fileName : file.originalname
                        })
        }))

        const product =  await productModel.create({
                title,
                description,
                price:{
                        amount : priceAmount,
                        currency : priceCurrency || "INR",
                },
                images,
                seller:seller._id
        })
        res.status(201).json({ 
                message:"Product created successfully", 
                success : true,
                product
        })
}


export async function GetSellerProducts(req,res) {
                const seller = req.user;

                const products = await productModel.find({
                        seller:seller._id
                })
                res.status(200).json({
                        message:"Products saved successfully",
                        success:true,
                        products ,  
                })




}


export async function GetAllProducts(req,res) { 
        const products = await productModel.find()
        res.status(200).json({
                message:"Products fetched successfully",
                success:true,
                products ,  
        })
}       


export async function getProductDetail(req,res) {
        const {id} = req.params;
        const product = await productModel.findById(id)
        if(!product){
                return res.status(404).json({
                        message:"Product not found",
                        success:false,
                })
        }
        res.status(200).json({
                message:"Product fetched successfully",
                success:true,
                product ,  
        })
}
export async function addProductVariant(req, res) {
    try {
        const { productId } = req.params;

        const product = await productModel.findOne({
            _id: productId,
            seller: req.user._id
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }

        const files = req.files || [];
        let images = [];

        if (files.length > 0) {
            images = await Promise.all(
                files.map(async (file) => {
                    return await uploadFile({
                        buffer: file.buffer,
                        fileName: file.originalname
                    });
                })
            );
        }

        const price = {
            amount: req.body.priceAmount,
            currency: req.body.priceCurrency || "INR"
        };

        const stock = Number(req.body.stock) || 0;
        const attributes = JSON.parse(req.body.attributes || "{}");

        const newVariant = {
            price,
            stock,
            attributes,
            images
        };

        product.variants.push(newVariant);
        await product.save();

        return res.status(200).json({
            success: true,
            message: "Variant added successfully",
            product
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


