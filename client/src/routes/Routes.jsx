import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Shop = lazy(() => import('./pages/user/shop/Shop'));
const User = lazy(() => import('./pages/admin/User'));
const EditProduct = lazy(() => import('./pages/admin/EditProduct'));
const EditUser = lazy(() => import('./pages/admin/EditUser'));
const AdminHome = lazy(() => import('./pages/admin/AdminHome'));
const AddProduct = lazy(() => import('./pages/admin/AddProduct'));
const Products = lazy(() => import('./pages/admin/Products'));
const RootUser = lazy(() => import('./Layout/RootUser'));
const Home = lazy(() => import('./pages/user/home/Home'));
const RootAdmin = lazy(() => import('./Layout/RootAdmin'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RootUser />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'shop',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Shop />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RootAdmin />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminHome />
          </Suspense>
        ),
      },
      {
        path: 'add-product',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddProduct />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <User />
          </Suspense>
        ),
      },
      {
        path: 'product/edit/:productId',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EditProduct />
          </Suspense>
        ),
      },
      {
        path: 'user/edit/:userId',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EditUser />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/auth/admin-login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLogin />
      </Suspense>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
export { router };
