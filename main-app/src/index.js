import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import {
  MainPage,
  SearchSide,
  StationListSide,
  StationInfoSide,
  LoginPage,
  RegisterPage,
  UserPage,
  KakaoLogin,
  AdminPage,
  UserInfo,
  AboutPage,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <MainPage />,
        children: [
          {
            path: '',
            element: <SearchSide />,
          },
          {
            path: 'stationlist',
            element: <StationListSide />,
          },
          {
            path: 'staioninfo',
            element: <StationInfoSide />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/kakaologin',
        element: <KakaoLogin />,
      },

      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/user',
        element: <UserPage />,
      },
      {
        path: '/admin',
        element: <AdminPage />,
      },
      {
        path: '/user',
        element: <UserPage />,
        children: [
          {
            path: 'userinfo',
            element: <UserInfo />,
          },
        ],
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
