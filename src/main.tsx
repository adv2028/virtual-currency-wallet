import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { router } from './routes/app-routes.tsx';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
      <RouterProvider router={router} />
      <Toaster richColors position="top-left" />
  </StrictMode>,
)
