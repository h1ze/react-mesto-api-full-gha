import logo from '../images/logo.svg';
import NavBar from './NavBar';

function Header({email, onSignOut}) {
    return (
        <header className="header">
            <img
                src={logo}
                alt="Логотип проекта"
                className="header__logo"
            />
            <NavBar email={email} onSignOut={onSignOut} />
        </header>
    )
};

export default Header;