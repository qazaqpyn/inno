import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Modal } from '../ui/modal/Modal';
import { Login } from '../../pages/Auth/login';
import { Register } from '../../pages/Auth/register';
import useResizeNavbar from '../../../hooks/useResizeNavbar';
import useAuthLogic from '../../../hooks/useAuthLogic';
import './Navbar.scss';

export const Navbar = () => {
  const { menuOpen, size, menuToggleHandler, closeMenuHandlerIfClicked } = useResizeNavbar();
  const {
    handleProfileLinkClick,
    handleLogoutClick,
    handleLoginClick,
    isOpenLogin,
    setIsOpenLogin,
    isOpenRegister,
    setIsOpenRegister,
    sessionTokenExists
  } = useAuthLogic({ closeMenuHandlerIfClicked });

  return (
    <header className='header'>
      <div className='header__content'>
        <Link to='/' reloadDocument className='header__content__logo'>
          NEWS
        </Link>
        <nav
          className={`${'header__content__nav'} 
          ${menuOpen && size.width < 768 ? `${'isMenu'}` : ''} 
          }`}>
          <ul>
            <li>
              <Link to='/' onClick={closeMenuHandlerIfClicked}>
                News
              </Link>
            </li>
            <li>
              <Link to='/profile' onClick={handleProfileLinkClick}>
                Profile
              </Link>
            </li>
            {!sessionTokenExists ? (
              <button className='btn btn__login' onClick={handleLoginClick}>
                Login
              </button>
            ) : (
              <button className='btn btn__logout' onClick={handleLogoutClick}>
                Logout
              </button>
            )}
          </ul>
        </nav>
        <div className='header__content__toggle'>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
      {isOpenLogin && (
        <Modal setIsOpen={setIsOpenLogin} title='Login'>
          <Login setIsOpen={setIsOpenLogin} setIsOpenRegister={setIsOpenRegister} />
        </Modal>
      )}
      {isOpenRegister && (
        <Modal setIsOpen={setIsOpenRegister} title='Register'>
          <Register setIsOpen={setIsOpenRegister} />
        </Modal>
      )}
    </header>
  );
};
