import { useEffect, useState } from "react";

interface IUseResizeNavbarReturn {
    menuOpen: boolean;
    size: {
        width: number;
        height: number;
    };
    menuToggleHandler: () => void;
    closeMenuHandlerIfClicked: () => void;
}

const useResizeNavbar = ():IUseResizeNavbarReturn => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
        const handleResize = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
        setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => {
        setMenuOpen((p) => !p);
    };

    const closeMenuHandlerIfClicked = () => {
        if (size.width < 768 && menuOpen) {
            setMenuOpen(false);
        }
    };
    

    return {menuOpen, size, menuToggleHandler, closeMenuHandlerIfClicked};
}

export default useResizeNavbar;
