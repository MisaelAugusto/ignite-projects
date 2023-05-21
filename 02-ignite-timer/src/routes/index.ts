import { lazy } from 'react';

const Home = lazy(async () => await import('screens/Home'));
const History = lazy(async () => await import('screens/History'));

interface Route {
  path: string;
  element: React.FC;
}

const routes: Route[] = [
  {
    path: '/',
    element: Home
  },
  {
    path: '/history',
    element: History
  }
];

const useRoutes = () => {
  return { routes };
};

export default useRoutes;
