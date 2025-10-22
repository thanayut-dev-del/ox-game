import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './layout';
import LoginPage from 'pages/login/ui/Page';
import GamePage from 'pages/game/ui/Page';
import AdminPage from 'pages/admin/ui/Page';
import { RequireAuth } from 'processes/auth-guard/ui/RequireAuth';
import './styles.css';
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <RequireAuth>
            <GamePage />
          </RequireAuth>
        ),
      },
      { path: 'login', element: <LoginPage /> },
      {
        path: 'admin',
        element: (
          <RequireAuth adminOnly>
            <AdminPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
