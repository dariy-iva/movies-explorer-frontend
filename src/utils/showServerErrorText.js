import { errorsFormSubmitText } from "./constants/resMessageText";

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
