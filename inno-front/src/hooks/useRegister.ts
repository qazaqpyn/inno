import { useState } from "react";
import { useUser } from "../context/Context";

interface IUseRegisterProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUseRegisterReturn {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    error: string;
    loading: boolean;
    handleRegister: (event: React.FormEvent<HTMLFormElement>) => void;
}

const useRegister = ({ setIsOpen }: IUseRegisterProps): IUseRegisterReturn => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { state, registerUser } = useUser();
    const { loading } = state;

    const validateForm = () => {
        if (!email || !password || !name) {
        setError('Please enter all fields');
        return false;
        }

        setError('');
        return true;
    };

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
        return;
        }

        setEmail('');
        setPassword('');
        setName('');

        setIsOpen(false);

        registerUser({ name, email, password });
    };

    return { name, setName, email, setEmail, password, setPassword, error, loading, handleRegister };
};

export default useRegister;