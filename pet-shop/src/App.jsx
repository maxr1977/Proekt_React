import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import MainPage from './pages/MainPage/MainPage'
import CategoriesPage from './pages/CategoriesPage/CategoriesPage'
import ProductsPage from './pages/ProductsPage/ProductsPage';
import AllProductsPage from './pages/AllProductsPage/AllProductsPage';
import AllSalesPage from './pages/AllSalesPage/AllSalesPage'
import SingleProductPage from './pages/SingleProductPage/SingleProductPage';
import CartPage from './pages/CartPage/CartPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,

    children: [
      {
        path: '/',
        element: <MainPage />,
      },

      {
        path: '/categories',
        element: <CategoriesPage />,
      },

      {
        path: '/categories/:id',
        element: <ProductsPage />
      },

      {
        path: '/products',
        element: <AllProductsPage />
      },

      {
        path: '/sales',
        element: <AllSalesPage />
      },

      {
        path: '/products/:id',
        element: <SingleProductPage />
      },

      {
        path: '/cart',
        element: <CartPage />
      },

      {
    path: '*',
    element: <NotFoundPage />
  }
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
