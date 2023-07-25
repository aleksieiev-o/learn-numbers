import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Content from './views/Content';
import Settings from './views/Settings';
import Authorization from './views/Authorization';

export enum EnumRouter {
  MAIN = '/',
  SETTINGS = '/settings',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
}

export const router = createBrowserRouter([
  { path: EnumRouter.MAIN, element: <Content/> },
  { path: EnumRouter.SETTINGS, element: <Settings/> },
  { path: EnumRouter.SIGN_IN, element: <Authorization/> },
  { path: EnumRouter.SIGN_UP, element: <Authorization/> },
]);
