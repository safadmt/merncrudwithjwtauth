import React, { useState } from 'react'
import './App.css'
import {RouterProvider} from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import RootUser from './pages/Layout/RootUser'
import Home from './pages/user/home/Home'
import RootAdmin from './pages/Layout/RootAdmin'
import AdminLogin from './pages/admin/AdminLogin'
import {  GlobalStateProvider } from './context&reducer/context'
import axios from 'axios'
import AddProduct from './pages/admin/AddProduct'
import Products from './pages/admin/Products'
axios.defaults.baseURL = 'http://localhost:5000/'
axios.defaults.withCredentials = true
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Shop from './pages/user/shop/Shop'
import User from './pages/admin/User'
import EditProduct from './pages/admin/EditProduct'
const router = createBrowserRouter([
    {
      path: "/",
      element: <RootUser/>,
      children : [
        {
            path: '/',
            element : <Home/>
        },
        {
          path: '/shop',
          element : <Shop/>
        }
      ]
    },
    {
      path:'/admin',
      element: <RootAdmin/>,
      children: [
        {
          path: '/admin',
          element: <AddProduct/>
        },
        {
          path: '/admin/products',
          element: <Products/>
        },
        {
          path: '/admin/users',
          element: <User/>
        },
        {
          path: '/admin/product/edit/:productId',
          element: <EditProduct/>
        }
        
      ]
    },
    {
      path:'/auth/admin-login',
      element: <AdminLogin/>
    }
  ]);
  
function App() {
  return (
    <div>
      <ToastContainer
      position='top-right'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      />
      <GlobalStateProvider>
        <RouterProvider router={router}/>
      </GlobalStateProvider>
    </div>
  )
}

export default App
