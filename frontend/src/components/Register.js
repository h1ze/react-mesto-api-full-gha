import { useState } from "react";
import { Link } from "react-router-dom";

function Register({onRegister}) {
    const [registerData, setRegisterData] = useState({});

    const handleChange = (e) => {
    // установите нужное состояние
    // используйте e.target.name и e.target.value
 
    setRegisterData({
        ...registerData,
        [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onRegister(registerData);
    };

    return (
        <section className="auth">
            <h2 className="auth__title">{`Регистрация`}</h2>
            <form className="auth__form" name={`register`} onSubmit={handleSubmit}>
                {/* в форму нужно будет добавить получаемый извне onSubmit={handleSubmit} */}
                <input
                    id = "email"
                    className="auth__input"
                    type="email"
                    value={registerData.email || ""}
                    name="email"
                    tabIndex="1"
                    placeholder="Email"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handleChange}
                />
                {/* <span className="auth__error"></span> */}
                <input
                    id = "password"
                    className="auth__input"
                    type="password"
                    value={registerData.password || ""}
                    name="password"
                    tabIndex="2"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="200"
                    required
                    onChange={handleChange}
                />
                <button
                    className={`auth__button register-submit`}
                    type="submit"
                >Зарегистрироваться</button>
                <Link className="auth__link-to-login" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </form>
        </section>
    )
};

export default Register;