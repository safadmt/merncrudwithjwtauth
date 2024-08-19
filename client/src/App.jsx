import React, { useState } from 'react'
import './App.css'
import {RouterProvider} from 'react-router-dom'

import { createBrowserRouter } from 'react-router-dom'
import RootUser from './pages/Layout/RootUser'
import Home from './pages/user/home/Home'
import ViewProduct from './pages/user/viewproduct/ViewProduct'
import RootAdmin from './pages/Layout/RootAdmin'
import AdminLogin from './pages/admin/AdminLogin'
import { AuthContext, SidebarShow } from './context/userContext'
import axios from 'axios'
import AddProduct from './pages/admin/AddProduct'
import Products from './pages/admin/Products'
axios.defaults.baseURL = 'http://localhost:5000/'

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
          path: '/view-product',
          element : <ViewProduct/>
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
        }
        
      ]
    },
    {
      path:'/auth/admin-login',
      element: <AdminLogin/>
    }
  ]);
  
function App() {
  const [loginorregister, setLoginorregister] = useState(true)
  const [isAuthSidebarShow, setIsAuthSidebarShow] = useState(false)
  return (
    <div>
      <SidebarShow.Provider value={{isAuthSidebarShow,setIsAuthSidebarShow}} >
      <AuthContext.Provider value={{loginorregister, setLoginorregister}}>
        <RouterProvider router={router}/>
        </AuthContext.Provider>
        </SidebarShow.Provider>
    </div>
  )
}

export default App
