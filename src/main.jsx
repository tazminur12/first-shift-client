import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Aos from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';

// Initialize AOS animations
Aos.init({
  duration: 1000,
  once: true,
  mirror: false,
});

// Initialize React Query Client
const queryClient = new QueryClient();

// Render application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
