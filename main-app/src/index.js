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
  UserEdit,
  KakaoLogin,
  AdminPage,
  MyPage,
  AboutPage,
  UserManage,
  ReviewManage,
  Withdrawl,
  NickChange,
  WishList,
  Review,
  StationInfoReview,
  StationInfoGeneral,
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
            path: 'stationinfo/:station_id',
            element: <StationInfoSide />,
            children: [
              {
                path: 'general',
                element: <StationInfoGeneral />,
              },
              {
                path: 'review',
                element: <StationInfoReview />,
              },
            ],
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
        children: [
          {
            path: 'user',
            element: <UserManage />,
          },
          {
            path: 'review',
            element: <ReviewManage />,
          },
        ],
      },
      {
        path: '/user',
        element: <UserPage />,
        children: [
          {
            path: '',
            element: <MyPage />,
          },
          {
            path: 'useredit',
            element: <UserEdit />,
          },
          {
            path: 'withdrawl',
            element: <Withdrawl />,
          },
          {
            path: 'nickchange',
            element: <NickChange />,
          },
          {
            path: 'review',
            element: <Review />,
          },
          {
            path: 'wishlist',
            element: <WishList />,
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
