import { Outlet } from 'react-router-dom';

import Header from '../Header';
import { LayoutContainer } from './styles';

const Layout: React.FC = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
};

export default Layout;
