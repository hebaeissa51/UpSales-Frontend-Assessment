import { Route, Routes } from "react-router-dom";
import {
    Login,
    NotFound,
    Home,
} from "./index";

import { HelmetProvider } from "react-helmet-async";
import ProtectedRoute from "./ProtectedRoute";
import { Layout } from "../layout/Layout";
import { AuthProvider } from "../context/AuthProvider";

const Router = () => {
    return (
        <AuthProvider>
        <HelmetProvider>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route element={<Layout><ProtectedRoute /></Layout>}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </HelmetProvider>
        </AuthProvider>
    )
}

export default Router
