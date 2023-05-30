import { Routes, Route } from 'react-router-dom';
import { Articles } from './views/pages/articles';
import { Profile } from './views/pages/profile';
import { Navbar } from './views/components/navbar';
import { NotFound } from './views/pages/not-found';
import styles from './global.module.scss';
import PrivateRoutes from './utils/PrivateRoute';

function App() {
  return (
    <div className={styles.main}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Articles />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
