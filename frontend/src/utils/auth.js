class Auth {
    constructor(options) {
        // тело конструктора
        this._options = options;
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
      }

    sendRegister(registrationData) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": registrationData.password, // Здесь нужно забрать пароль пользователя из формы регистрации
                "email": registrationData.email, // Здесь нужно забрать почту пользователя из формы регистрации
              })
        })
            .then(response => this._checkResponse(response));
    }

    // Пример ответа при отправке данных регистрации
    // {
    //     "data": {
    //         "_id": "5f5204c577488bcaa8b7bdf2",,
    //         "email": "email@yandex.ru"
    //     }
    // } 

//     Коды ошибок:
// 400 - некорректно заполнено одно из полей 

    sendAuthorization(authorizationData) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": authorizationData.password, // Здесь нужно забрать пароль пользователя из формы регистрации
                "email": authorizationData.email, // Здесь нужно забрать почту пользователя из формы регистрации
              })
        })
            .then(response => this._checkResponse(response));
    }


    // Пример ответа при отправке данных авторизации
    // {
    //     "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
    // } 

//     Коды ошибок:
// 400 - не передано одно из полей 
// 401 - пользователь с email не найден 

    getUserData(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                Accept: "application/json", 
                "Content-Type": "application/json", 
                Authorization: `Bearer ${jwt}`
            },
        })
            .then(response => this._checkResponse(response));
    }


// Параметры запроса для проверки валидности токена и получения email для вставки в шапку сайта:
// Пример успешного ответа:
// {
//     "_id":"1f525cf06e02630312f3fed7",
//     "email":"email@email.ru"
// } 
// Коды ошибок:
// # Если токен не передан или передан без Bearer
// 400 — Токен не передан или передан не в том формате

// # Если передан некорректный токен
// 401 — Переданный токен некорректен 




    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        };
    };

}

const auth = new Auth({
    baseUrl: "https://auth.nomoreparties.co",
    headers: {
      'Content-Type': 'application/json'
    }
}
);

export default auth;