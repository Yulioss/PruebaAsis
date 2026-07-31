import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../../features/auth/pages/Login";
//import ProductList from "../../features/products/pages/ProductList";
//import ProductDetail from "../../features/products/pages/ProductDetail";
//import CreateProduct from "../../features/products/pages/CreateProduct";
//import EditProduct from "../../features/products/pages/EditProduct";

import PrivateRoute from "../../features/auth/components/PrivateRoute";

export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />

            <Route element={<PrivateRoute />}>

                <Route element={<MainLayout />}>
                {/*
                    <Route path="/" element={<Navigate to="/products" />} />

                    <Route path="/products" element={<ProductList />} />

                    <Route path="/products/new" element={<CreateProduct />} />

                    <Route path="/products/:id" element={<ProductDetail />} />

                    <Route path="/products/edit/:id" element={<EditProduct />} />
                */}
                </Route>

            </Route>

        </Routes>
    );
}