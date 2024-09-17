import React, { lazy,Suspense} from 'react'
import './App.css'
import {RouterProvider} from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
const RootUser = lazy(()=> import('./Layout/RootUser'))
const LandingPage = lazy(()=> import('./pages/user/landingpage/LandingPage'))
const RootAdmin = lazy(()=> import('./Layout/RootAdmin'))
const  AdminLogin = lazy(()=> import('./pages/admin/AdminLogin'))
const ViewProduct = lazy(()=> import('./pages/user/viewproduct/ViewProduct'))
import {  GlobalStateProvider } from './context&reducer/context'
import axios from 'axios'
const AddProduct = lazy(()=> import('./pages/admin/AddProduct'))
const  Products = lazy(()=> import('./pages/admin/Products')) 
axios.defaults.baseURL = 'http://localhost:5000/'
axios.defaults.withCredentials = true
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
  import LoadingSkeleton from './components/skeleton/LoadingSkeleton'
const Shop = lazy(()=> import('./pages/user/shop/Shop'))
const User = lazy(()=> import('./pages/admin/User'))
const EditProduct = lazy(()=> import('./pages/admin/EditProduct'))
const EditUser = lazy(()=> import('./pages/admin/EditUser'))
const AdminHome = lazy(()=> import('./pages/admin/AdminHome'))
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSkeleton/>}>
        <RootUser />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingSkeleton/>}>
            <LandingPage/>
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback={<LoadingSkeleton/>}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path:"/product/:productid",
        element : (
          <Suspense fallback={<LoadingSkeleton/>}>
            <ViewProduct/>
          </Suspense>
        )
      }
    ],
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<LoadingSkeleton/>}>
        <RootAdmin />
      </Suspense>
    ),
    children: [
      {
        path: '/admin',
        element: (
          <Suspense fallback={<LoadingSkeleton/>}>
            <AdminHome />
          </Suspense>
        ),
      },
      {
        path: 'add-product',
        element: (
          <Suspense fallback={<LoadingSkeleton/>}>
            <AddProduct />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<LoadingSkeleton/>}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense fallback={<LoadingSkeleton/>}>
            <User />
          </Suspense>
        ),
      },
      {
        path: 'product/edit/:productId',
        element: (
          <Suspense fallback={<LoadingSkeleton/>}>
            <EditProduct />
          </Suspense>
        ),
      },
      {
        path: 'user/edit/:userId',
        element: (
          <Suspense fallback={<LoadingSkeleton/>}>
            <EditUser />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/auth/admin-login',
    element: (
      <Suspense fallback={<LoadingSkeleton/>}>
        <AdminLogin />
      </Suspense>
    ),
  },
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
