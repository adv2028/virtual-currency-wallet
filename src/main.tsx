import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from "@heroui/react";
import './index.css'
import App from './App.tsx'
import { router } from './routes/app-routes.tsx';
import { RouterProvider } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <App />
      <RouterProvider router={router} />
    </HeroUIProvider>
  </StrictMode>,
)
