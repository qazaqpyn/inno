import { useState } from "react";
import { useUser } from "../context/Context";

interface IUseLoginParams {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUseLoginReturn {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    error: string;
    loading: boolean;
    handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
    handleRegister: () => void;
}

const useLogin = ({ setIsOpen, setIsOpenRegister }: IUseLoginParams): IUseLoginReturn => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { state, loginUser } = useUser();
    const { loading } = state;

    const validateForm = () => {
        if (!email || !password) {
        setError('Please enter both email and password');
        return false;
        }

        setError('');
        return true;
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
        return;
        }

        setEmail('');
        setPassword('');

        setIsOpen(false);

        loginUser({ email, password });
    };

    const handleRegister = () => {
        setIsOpen(false);
        setIsOpenRegister(true);
    };

    return { email, setEmail, password, setPassword, error, loading, handleLogin, handleRegister };
};

export default useLogin;
