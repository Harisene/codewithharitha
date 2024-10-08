import React, { useEffect } from 'react'
import { router, Slot } from 'expo-router'
import AuthProvider, { useAuth } from '@/providers/authProvider';

export default function _layout() {

  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  )
}

const RootLayout = () => {

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated === undefined) return;

    if (isAuthenticated) {
      router.replace('/app/home');
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated]);

  return (
    <Slot />
  )
}