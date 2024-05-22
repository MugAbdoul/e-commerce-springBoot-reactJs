import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isUser } from './authUser';

const ProtectedUserRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [isRoleAdmin, setIsRoleAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        const roleIsAdmin = await isUser();
        setIsRoleAdmin(roleIsAdmin);
      }
      setIsAuth(isAuthenticated());
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (!isRoleAdmin) {
    return <Navigate to="/access-denied" />;
  }

  return children;
};

export default ProtectedUserRoute;
