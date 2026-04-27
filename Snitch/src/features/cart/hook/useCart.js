import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { 
    addItem as addItemApi, 
    getCart as getCartApi, 
    removeFromCart as removeFromCartApi, 
    updateQuantity as updateQuantityApi 
} from "../service/cart.api.js";
import { 
    setCart, 
    addTheItem, 
    removeItemAction, 
    updateQuantityAction 
} from "../state/cart.slice.js";

export const useCart = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetCart = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getCartApi();
            if (res.success) {
                dispatch(setCart(res.cart?.items || []));
            }
        } catch (err) {
            setError(err.message || "Failed to fetch cart");
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    const handleAddItem = async ({ productId, variantId, quantity = 1 }) => {
        try {
            setLoading(true);
            const res = await addItemApi({ productId, variantId, quantity });
            if (res.success) {
                // Sync with full cart from response to ensure accuracy
                dispatch(setCart(res.cart?.items || []));
                return res;
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to add item");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async ({ productId, variantId }) => {
        try {
            setLoading(true);
            const res = await removeFromCartApi({ productId, variantId });
            if (res.success) {
                dispatch(removeItemAction({ productId, variantId }));
                // Or sync with full cart: dispatch(setCart(res.cart?.items || []));
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to remove item");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async ({ productId, variantId, quantity }) => {
        if (quantity < 1) return;
        try {
            setLoading(true);
            const res = await updateQuantityApi({ productId, variantId, quantity });
            if (res.success) {
                dispatch(updateQuantityAction({ productId, variantId, quantity }));
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to update quantity");
        } finally {
            setLoading(false);
        }
    };

    return { 
        handleAddItem, 
        handleGetCart, 
        handleRemoveItem, 
        handleUpdateQuantity, 
        loading, 
        error 
    };
};
