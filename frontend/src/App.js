import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryPage from "./pages/Categories/Category";
import ProductPage from "./pages/Products/Product";
import OrderPage from "./pages/Orders/Order";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";
import LogoutPage from "./pages/Auth/LogoutPage";
import NotFound from "./pages/NotFound";
import ProductUpdatePage from "./pages/Products/ProductUpdatePage"
import AccessDenied from "./pages/AccessDenied";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard/logout" element={<LogoutPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoute>
              <CategoryPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/dashboard/categories"
          element={
            <ProtectedAdminRoute>
              <CategoryPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/dashboard/products"
          element={
            <ProtectedAdminRoute>
              <ProductPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/dashboard/product/:id"
          element={
            <ProtectedAdminRoute>
              <ProductUpdatePage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedAdminRoute>
              <OrderPage />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
