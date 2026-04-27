import { createBrowserRouter } from "react-router-dom";
import ProductDetail from "../features/products/pages/ProductDetail"; 
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/products/pages/createProduct";
import Dashboard from "../features/products/pages/Dashboard";
import Protected from "../features/auth/component/Protected";
import Home from "../features/products/pages/Home";
import SellerProductDetail from "../features/products/pages/SellerProductDetail";
import OrderSuccessFull from "../features/cart/pages/OrderSuccessFull";
import Cart from "../features/cart/pages/Cart";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/login",
    element: <Login />,
  },
{
  path:"/product/:productId",
  element:<ProductDetail /> 
},
{
  path:"/cart",
  element:<Protected>
     <Cart />  
  </Protected>  
},
{
  path:"/order-success",
  element:<Protected>
     <OrderSuccessFull />  
  </Protected>  
},
  
  {
    path: "/seller",
    children: [
      {
        path: "products/create", // ✅ no /seller again
        element:  <Protected role="seller"><CreateProduct /></Protected>,
      },
      {
        path: "dashboard",
        element: <Protected role="seller"><Dashboard /></Protected>,
      },
      {
        path :"product/:productId",
        element : <Protected role="seller"><SellerProductDetail /></Protected>
      }
    ],
  },
]);

export default routes;