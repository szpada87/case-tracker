import './App.css'
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import ErrorPage from './pages/Error/ErrorPage';
import './index.css'
import RequiredAuth from './utils/RequiredAuth';
import Layout from './components/Layout/Layout';
import CaseListPage from './pages/CaseListPage/CaseListPage';
import CaseAddPage from './pages/CaseAddPage/CaseAddPage';
import Authorize from './utils/Authorize';
import Loader from './components/Loader/Loader';

const UserRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: "/home",
      element:
        <Layout>
          <Outlet />
        </Layout>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "cases",
          element: (<RequiredAuth>
            <Authorize roles={['admin', 'user']}>
              <React.Suspense fallback={<div className='mt-16'><Loader /></div>}>
                <CaseListPage />
              </React.Suspense>
            </Authorize>
          </RequiredAuth>)
        },
        {
          path: "add",
          element: (<RequiredAuth>
            <Authorize roles={['admin']}>
              <CaseAddPage />
            </Authorize>
          </RequiredAuth>)
        },
      ]
    },
    {
      path: "/",
      element: <Layout>
        <Outlet />
      </Layout>,
      errorElement: <ErrorPage />,
    },
  ]);


  return (
    <RouterProvider router={router} />
  );
}

function App() {
  return <UserRouterProvider />
}

export default App
