import { Input } from '../../../components/form/input';
import useLogin from '../../../../hooks/useLogin';
import styles from '../Auth.module.scss';

interface LoginProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login: React.FC<LoginProps> = ({ setIsOpen, setIsOpenRegister }) => {
  const { email, setEmail, password, setPassword, error, loading, handleLogin, handleRegister } =
    useLogin({ setIsOpen, setIsOpenRegister });

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={handleLogin} className={styles.form__div}>
        <Input type='email' placeholder='Email' value={email} inputHandler={setEmail} />
        <Input type='password' placeholder='Password' value={password} inputHandler={setPassword} />
        <button type='button' onClick={handleRegister}>
          Register
        </button>
        <button type='submit' disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};
