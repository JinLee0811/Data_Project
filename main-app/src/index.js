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
  UserInfo
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
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/user',
        element: <UserPage />,
      },
      {
        path: '/userinfo',
        element: <UserInfo />,
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
