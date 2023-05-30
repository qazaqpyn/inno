import react from 'react';
import styles from './Input.module.scss';

export interface InputProps {
  value?: string;
  inputHandler: (value: string) => void;
  type?: string;
  placeholder?: string;
  min?: string;
  checked?: boolean;
}

export const Input: react.FC<InputProps> = ({ inputHandler, value, type = 'text', ...props }) => {
  return (
    <input
      className={styles.input}
      value={value}
      type={type}
      onChange={(e) => {
        console.log(e.target.value);
        e.preventDefault();
        inputHandler(e.target.value);
      }}
      onDragOver={(e) => e.preventDefault()}
      {...props}
    />
  );
};
