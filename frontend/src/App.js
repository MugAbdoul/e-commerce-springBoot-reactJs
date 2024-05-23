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
import ProtectedUserRoute from "./utils/ProtectedUserRoute";
import UserHome from './pages/User/Home';
import CartPage from './pages/User/Cart';
import UserOrders from './pages/User/Orders';
import Address from './pages/User/AddressManagement';
import ProductDetails from './pages/User/ProductDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard/logout" element={<LogoutPage />} />
        <Route
          path="/"
          element={
            <ProtectedUserRoute>
              <UserHome />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedUserRoute>
              <UserOrders />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/address"
          element={
            <ProtectedUserRoute>
              <Address />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedUserRoute>
              <ProductDetails />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedUserRoute>
              <CartPage />
            </ProtectedUserRoute>
          }
        />
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
