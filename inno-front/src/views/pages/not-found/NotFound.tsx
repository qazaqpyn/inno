import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }, []);

  return (
    <div className={styles.not__found__main}>
      <h1>404</h1>
      <p>Page not found</p>
      <p>Redirecting to home page...</p>
    </div>
  );
};
