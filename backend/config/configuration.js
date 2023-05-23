const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret';

const DATABASE = 'mongodb://127.0.0.1:27017/mestodb';

module.exports = { PORT, SECRET_KEY, DATABASE };
