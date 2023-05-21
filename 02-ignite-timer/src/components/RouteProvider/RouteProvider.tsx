import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import useRoutes from 'routes';
import Layout from '../Layout';

const RouteProvider: React.FC = () => {
  const { routes } = useRoutes();

  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Layout />}>
          {routes.map(({ path, element: Element }) => {
            return <Route key={path} path={path} element={<Element />} />;
          })}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RouteProvider;
