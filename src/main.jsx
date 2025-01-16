import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        removeDelay: 1000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 3000,
          iconTheme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  </StrictMode>
);
