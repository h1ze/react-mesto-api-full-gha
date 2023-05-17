import { Route, Routes, Link } from "react-router-dom";


function NavBar({email, onSignOut}) {
    return(
        <nav className="header__nav">
            <Routes>
                <Route
                    path="/sign-up"
                    element={
                    <Link className="header__link" to="/sign-in">
                        Войти
                    </Link>
                    }   
                />
                <Route
                    path="/sign-in"
                    element={
                    <Link className="header__link" to="/sign-up">
                        Регистрация
                    </Link>
                    }
                />
                <Route
                    path="/"
                    element={
                        <>
                            <p className="header__email">{email}</p>
                            <Link className="header__link header__link_type_signout"  to="/sign-in" onClick={onSignOut}>
                                Выйти
                            </Link>
                        </>
                    }
                />
            </Routes>
        </nav>
    )
};

export default NavBar;