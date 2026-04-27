import { createProduct, getSellerProduct , getAllProducts , getProductById, addVariant, updateVariantStock } from "../services/product.api.js"
import { useDispatch } from "react-redux"
import { setSellerProduct , setProducts} from "../state/product.slice.js"


export const useProduct = () => {

    const dispatch = useDispatch()
    async function handleCreateProduct(formdata) {
        const data = await createProduct(formdata)
        return data.product;
    }
    async function handleGetSellerProduct() {
        const data = await getSellerProduct()
        dispatch(setSellerProduct(data.products))
        return data.products
    }
    async function handleGetAllProducts() {
        const data = await getAllProducts()
        dispatch(setProducts(data.products))
        return data.products
    }
    async function  handleGetProductById(productId)  {
        const data = await getProductById(productId)
        return data.product
    }

    async function handleAddVariant(productId, formData) {
        const data = await addVariant(productId, formData)
        return data.product
    }

    async function handleUpdateStock(productId, variantId, stock) {
        const data = await updateVariantStock(productId, variantId, stock)
        return data.product
    }
    async function  handleAddProductVariant(productId, newProductVariant) {
        const data = await addProductVariant(productId, newProductVariant)
        return data.product
    }

    return {
        handleCreateProduct,
        handleGetSellerProduct,
        handleGetAllProducts,
        handleGetProductById,
        handleAddVariant,
        handleUpdateStock,
        handleAddProductVariant
    }
}
    
