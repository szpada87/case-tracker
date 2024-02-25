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
import CaseAddPage from './pages/CaseAddPage/CaseAddPage';
import Authorize from './utils/Authorize';
import Loader from './components/Loader/Loader';
import CaseSearchPage from './pages/CaseSearchPage/CaseSearchPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import CaseDetailsPage from './pages/CaseDetailsPage/CaseDetailsPage';
import { AxiosError } from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, error) => {
        console.log(error);
        if (error instanceof (AxiosError) && error.response?.status === 404) {
          return false;
        }
        return count < 3;
      }
    }
  }
})

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
                <CaseSearchPage />
              </React.Suspense>
            </Authorize>
          </RequiredAuth>)
        },
        {
          path: "cases/:id",
          element: (<RequiredAuth>
            <Authorize roles={['admin', 'user']}>
              <React.Suspense fallback={<div className='mt-16'><Loader /></div>}>
                <CaseDetailsPage />
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
  return (<QueryClientProvider client={queryClient}>
    <UserRouterProvider />
  </QueryClientProvider>)
}

export default App
