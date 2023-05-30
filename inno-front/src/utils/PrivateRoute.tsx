import { Outlet, Navigate } from 'react-router-dom';
import { existsSessionToken } from './localStorage';

const PrivateRoutes: React.FC = () => {
  const sessionTokenExists = existsSessionToken();
  return sessionTokenExists ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoutes;
