import { useNavigate } from "react-router-dom";
import { useUser } from "../context/Context";
import { existsSessionToken } from "../utils/localStorage";
import { useState } from "react";

interface IUseAuthLogicParams {
    closeMenuHandlerIfClicked : () => void;
}

interface IUseAuthLogicReturn {
    handleProfileLinkClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    handleLogoutClick: () => void;
    handleLoginClick: () => void;
    isOpenLogin: boolean;
    setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
    isOpenRegister: boolean;
    setIsOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
    sessionTokenExists: boolean;
}

const useAuthLogic = ({closeMenuHandlerIfClicked}: IUseAuthLogicParams): IUseAuthLogicReturn => {
    const navigate = useNavigate();
    const { logoutUser } = useUser();
    const sessionTokenExists = existsSessionToken();

    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenRegister, setIsOpenRegister] = useState(false);

    const handleProfileLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
    
        if (sessionTokenExists) {
          navigate('/profile');
        } else {
          setIsOpenLogin(true);
        }
    
        closeMenuHandlerIfClicked();
    };
    
    const handleLogoutClick = () => {
        logoutUser();
        navigate('/');

        closeMenuHandlerIfClicked();
    };

    const handleLoginClick = () => {
        setIsOpenLogin(true);

        closeMenuHandlerIfClicked();
    };

    return {handleProfileLinkClick, handleLogoutClick, handleLoginClick, isOpenLogin, setIsOpenLogin, isOpenRegister, setIsOpenRegister, sessionTokenExists};
}

export default useAuthLogic;
