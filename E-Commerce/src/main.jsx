import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation.jsx";

// إنشاء الراوتر
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route element={<Navigation />} /> {/* هذا يظهر داخل Outlet */}
    </Route>
  )
);

// عرض التطبيق داخل RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);