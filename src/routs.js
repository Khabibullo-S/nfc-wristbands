import React from "react";
import {
  ADMIN_ROUTE,

  EDIT_ALL_USER,
  GET_ORDERS,
  HOME_ROUTE,
  LOGIN_ROUTE,
  ORDER_USER,
  ORDERS_MANAGER,
  PROFILE_ADMIN,
  PROFILE_COMPANY,
  PROFILE_USER,
  REGISTRATION_ROUTE,
  STATISTIC,
  USER_LIST,
  NEW_HOME_ROUTE, THEME_USER, THEME_COMPANY, // new home
} from "./utils/consts";
import Admin from "./pages/admin/admin";
import Home from "./pages/home";
import Login from "./pages/login";
import Registration from "./pages/registration";
import UserProfile from "./pages/admin/user/userProfile";
import UserOrder from "./pages/admin/user/userOrder";
import CompanyOrders from "./pages/admin/company/companyOrders";
import CompanyProfile from "./pages/admin/company/companyProfile";
import CompanyUserList from "./pages/admin/company/companyUserList";
import AdminProfile from "./pages/admin/admin/adminProfile";
import EditAllUser from "./pages/admin/admin/editAllUser";
import Statistics from "./pages/admin/admin/statistics";
import PolyGetAll from "./pages/admin/polygraph/polyGetAll";
import NewHome from "./pages/newHome";
import UserTheme from "./pages/admin/user/userTheme";
import CompanyTheme from "./pages/admin/company/companyTheme";

export const publicRoute = [
  {
    path: HOME_ROUTE,
    Component: <Home />,
  },

  {
    path: LOGIN_ROUTE,
    Component: <Login />,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Registration />,
  },
  { path: NEW_HOME_ROUTE, Component: <NewHome /> },
];

export const adminDash = [
  {
    path: ADMIN_ROUTE,
    Component: <Admin />,
  },
];

export const userRoute = [
  {
    path: PROFILE_USER,
    Component: <UserProfile />,
  },
  {
    path: ORDER_USER,
    Component: <UserOrder />,
  },
  {
    path: THEME_USER,
    Component: <UserTheme />,
  },
];

export const companyRoute = [
  {
    path: ORDERS_MANAGER,
    Component: <CompanyOrders />,
  },
  {
    path: PROFILE_COMPANY,
    Component: <CompanyProfile />,
  },
  {
    path: USER_LIST,
    Component: <CompanyUserList />,
  },
  {
    path: THEME_COMPANY,
    Component: <CompanyTheme />,
  },
];

export const adminRoute = [
  {
    path: PROFILE_ADMIN,
    Component: <AdminProfile />,
  },
  {
    path: EDIT_ALL_USER,
    Component: <EditAllUser />,
  },
  {
    path: STATISTIC,
    Component: <Statistics />,
  },
];

export const polyRoute = [
  {
    path: GET_ORDERS,
    Component: <PolyGetAll />,
  },
];

/* type :
 *        -Regular - oddiy user,
 *        -Admin - Admin ,
 *        -Company - Mananger Company
 *        -Polygraphy - polygraphiya
 * */
