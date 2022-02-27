export const errorsFormSubmitText = {
  conflict: "Пользователь с таким email уже существует",
  unauthorized: 'Некорректно введены почта или пароль',
  validation: 'Переданы некорректные данные',
  default: 'При отправке запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Попробуйте повторить запрос позже.',
};

export function showServerErrorText(errorStatus) {
  let errText;
  switch (errorStatus) {
    case 409:
      errText = errorsFormSubmitText.conflict;
      break;
      case 401:
      errText = errorsFormSubmitText.unauthorized;
      break;
      case 400:
      errText = errorsFormSubmitText.validation;
      break;
    default:
      errText = errorsFormSubmitText.default;
  }
  return errText;
}
