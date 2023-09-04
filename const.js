const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const MONGO_URL_DEV = 'mongodb://127.0.0.1:27017/moviedb';

const codesError = {
  INCORRECT_DATA: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND_DATA: 404,
  CONFLICT: 409,
  DEFAULT: 500,
};

const errorMessages = {
  INCORRECT_DATA: 'Некорректные данные',
  UNAUTHORIZED: 'Необходима авторизация',
  FORBIDDEN: 'Доступ запрещен',
  NOT_FOUND_DATA: 'Данные не найдены',
  WRONG_PATH: 'Передан некорректный путь',
  CONFLICT: 'Указанные данные уже существуют',
  DEFAULT: 'На сервере произошла ошибка',
  UNAUTHORIZED_AUTH: 'Неправильная почта или пароль',
  INVALID_EMAIL: 'Некорректный адрес почты',
  INVALID_URL: 'Некорректная ссылка',
};

module.exports = { urlPattern, codesError, errorMessages, MONGO_URL_DEV };
