import { setError, setLoading, setUser } from "../state/auth.slice";

import { register, login ,getMe} from "../services/auth.api";
import { useDispatch } from "react-redux";



export const userAuth = () => {

    const dispatch = useDispatch();

    async function handleRegister({ email, isSeller = false, contact, username, password }) {
        const data = await register({ email, contact, username, password, isSeller })
        dispatch(setUser(data.user))
        return data.user
    }

    async function handleLogin({ email, password }) {
        const data = await login({ email, password })
        dispatch(setUser(data.user))
        return data.user
    }

    async function handleGetMe() {

        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setError(error.message))
            dispatch(setLoading(false))
            console.log(error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function  handleAddProductVariant(productId, newProductVariant) {
        try {
            dispatch(setLoading(true))
            const data = await addProductVariant(productId, newProductVariant)
            dispatch(setLoading(false))
            return data
        } catch (error) {
            dispatch(setError(error.message))
            dispatch(setLoading(false))
            console.log(error)
        } finally {
            dispatch(setLoading(false))
        }
    }




    return { handleAddProductVariant, handleRegister, handleLogin, handleGetMe }


}