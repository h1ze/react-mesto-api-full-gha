import { useState } from "react";

function Login({onLogin}) {

    const [loginData, setLoginData] = useState({});

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    
    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onLogin(loginData);
      } 


    return (
        <section className="auth">
            <h2 className="auth__title">{`Вход`}</h2>
            <form className="auth__form" name={`login`} onSubmit={handleSubmit}>
                {/* в форму нужно будет добавить получаемый извне onSubmit={onSubmit} */}
                <input
                    id = "email"
                    className="auth__input"
                    type="email"
                    value={loginData.email || ""}
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
                    value={loginData.password || ""}
                    name="password"
                    tabIndex="2"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="200"
                    required
                    onChange={handleChange}
                />
                <button
                    className={`auth__button login-submit`}
                    type="submit"
                >Войти</button>
            </form>
        </section>
    )
};

export default Login;