'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { checkSession } from '@/app/api/clientApi';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function validateSession() {
      try {
        const user = await checkSession();
        if (user) setUser(user);
        else clearIsAuthenticated();
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    }
    validateSession();
  }, [setUser, clearIsAuthenticated]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthProvider;
