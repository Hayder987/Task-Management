import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router/router.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./provider/AuthProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
     <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
