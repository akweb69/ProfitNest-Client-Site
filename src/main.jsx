import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/router.jsx';
import ContextProvider from './Context/ContextProvider.jsx';

// Import Toaster from react-hot-toast
import { Toaster } from 'react-hot-toast';

// TanStack Query setup
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
