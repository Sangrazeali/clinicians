import React, { Suspense } from 'react';
import constantPaths from './constantPaths';
import ForgetPassword from '../pages/auth/ForgetPassword';
import NewPassword from '../pages/auth/NewPassword';
import PrivateRoute from './PrivateRoute';
import { Spinner } from '@nextui-org/react';

const Home = React.lazy(() => import("../pages/home/Home"));
const Signin = React.lazy(() => import("../pages/auth/Signin"));
const SendOtp = React.lazy(() => import("../pages/auth/SendOtp"));
const EmailSent = React.lazy(() => import("../pages/auth/EmailSent"));

const routes = [
  {
    path: constantPaths.HOME,
    element: (
      <Suspense fallback={<div className="w-full min-h-screen flex justify-center items-center"> <Spinner color="warning" /></div>
      } >
          <PrivateRoute>
              <Home />
            </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: constantPaths.SIGN_IN,
    element: (
      <Suspense fallback={<div className="w-full min-h-screen flex justify-center items-center"> <Spinner color="warning" /></div>
      } >
        <Signin />
      </Suspense>
    ),
  },
  {
    path: constantPaths.FORGET_PASSWORD,
    element: (
      <Suspense fallback={<div className="w-full min-h-screen flex justify-center items-center"> <Spinner color="warning" /></div>
      } >
        <ForgetPassword />
      </Suspense>
    ),
  },
  {
    path: constantPaths.SEND_OTP,
    element: (
      <Suspense fallback={<div className="w-full min-h-screen flex justify-center items-center"> <Spinner color="warning" /></div>
      } >
        <SendOtp />
      </Suspense>
    ),
  },
  {
    path: constantPaths.NEW_PASSWORD,
    element: (
      <Suspense fallback={<div className="w-full min-h-screen flex justify-center items-center"> <Spinner color="warning" /></div>
      } >
        <NewPassword />
      </Suspense>
    ),
  },
  {
    path: constantPaths.EMAIL_SENT,
    element: (
      <Suspense fallback={<div className="w-full min-h-screen flex justify-center items-center"> <Spinner color="warning" /></div>
      } >
        <EmailSent />
      </Suspense>
    ),
  },
];

export default routes;
