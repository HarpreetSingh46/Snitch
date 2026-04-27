import axios from "axios";

const CartApiInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true,
});

export const addItem = async ({ productId, variantId, quantity }) => {
    const response = await CartApiInstance.post("/add", { productId, variantId, quantity });
    return response.data;
};

export const getCart = async () => {
    const response = await CartApiInstance.get("/");
    return response.data;
};

export const removeFromCart = async ({ productId, variantId }) => {
    const response = await CartApiInstance.delete("/remove", { data: { productId, variantId } });
    return response.data;
};

export const updateQuantity = async ({ productId, variantId, quantity }) => {
    const response = await CartApiInstance.patch("/update", { productId, variantId, quantity });
    return response.data;
};