import React from 'react';
import Button from './components/global-components/Button';
import Header from './components/Header';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import routes from "./routes/Index"
import Layout from "./layout/index"
function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <div>404</div>,
      children: routes
    },
  ])

  return (
    <RouterProvider router={router} />
    
  )
}

export default App;
