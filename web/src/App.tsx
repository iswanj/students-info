import React from "react";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./Routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
