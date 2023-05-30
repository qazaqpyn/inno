import { Input } from '../../../components/form/input';
import styles from '../Auth.module.scss';
import useRegister from '../../../../hooks/useRegister';

interface RegisterProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Register: React.FC<RegisterProps> = ({ setIsOpen }) => {
  const { name, setName, email, setEmail, password, setPassword, error, loading, handleRegister } =
    useRegister({ setIsOpen });

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={handleRegister} className={styles.form__div}>
        <Input type='text' placeholder='Name' value={name} inputHandler={setName} />
        <Input type='email' placeholder='Email' value={email} inputHandler={setEmail} />
        <Input type='password' placeholder='Password' value={password} inputHandler={setPassword} />
        <button type='submit' disabled={loading}>
          Register
        </button>
      </form>
    </div>
  );
};
