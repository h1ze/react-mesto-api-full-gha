// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

// const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

function handlerSimpleReq(req, res) {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
}

function handlerPreflightReq(req, res) {
  const requestHeaders = req.headers['access-control-request-headers']; // сохраняем список заголовков исходного запроса
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'; // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)

  res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS); // разрешаем кросс-доменные запросы любых типов (по умолчанию)
  res.header('Access-Control-Allow-Headers', requestHeaders); // разрешаем кросс-доменные запросы с этими заголовками
  return res.end(); // завершаем обработку запроса и возвращаем результат клиенту
}

function handlerCors(req, res, next) {
  handlerSimpleReq(req, res);

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  if (method === 'OPTIONS') { // Если это предварительный запрос, вызываем обработчик предварительных запросов
    handlerPreflightReq(req, res);
  }
  next();
}
module.exports = handlerCors;
