import React, { Suspense } from 'react';
import { Spinner } from '@nextui-org/react';
import constantPaths from './constantPaths';
import path from 'path';

const Home = React.lazy(() => import("../pages/home/Home"));

const routes = [
  {
    path: constantPaths.HOME,
    element: (
      <Suspense fallback={<div className="w-full min-h-screen flex justify-center items-center"> <Spinner color="warning" /></div>}>
        <div className='px-8'>
          <Home />
        </div>
      </Suspense>
    ),
  },
  {
    path: '*',
    element: <Home />
  }
];


export default routes;
