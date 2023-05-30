import React, { MouseEventHandler } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
  buttonHandler?: MouseEventHandler;
  text: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  text,
  buttonHandler,
  type = 'button',
  ...props
}) => {
  return (
    <button className={styles.btn} onClick={buttonHandler} type={type} {...props}>
      {text}
    </button>
  );
};
