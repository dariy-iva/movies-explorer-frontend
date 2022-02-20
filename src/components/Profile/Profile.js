import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import useFormWithValidation from "../../utils/FormValidator";
import Header from "../Header/Header";
import { inputConfig } from "../../utils/constants/inputsConfig";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function Profile() {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
  useFormWithValidation();
  const nameInput = inputConfig.name;
  const emailInput = inputConfig.email;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name || "");
    setEmail(currentUser.email || "");
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Header isLoggedIn={true} />
      <main className="profile">
        <h2 className="profile__title">{`Привет, ${currentUser.name || ""}!`}</h2>
        <form
          name="update-profile"
          className="profile__form"
          onSubmit={handleSubmit}
        >
          <fieldset className="profile__fieldset">
            <label className="profile__field">
              {nameInput.label}
              <input
                type={nameInput.type}
                className="profile__input"
                name={nameInput.name}
                required
                minLength={nameInput.minLength}
                maxLength={nameInput.maxLength}
                value={values.name || currentUser.name || ""}
                onChange={handleChange}
              />
              <span className="profile__error">{errors.name || ""}</span>
            </label>
            <label className="profile__field">
              {emailInput.label}
              <input
                type={emailInput.type}
                className="profile__input"
                name={emailInput.name}
                required
                minLength={emailInput.minLength}
                value={values.email || currentUser.email || ""}
                onChange={handleChange}
              />
              <span className="profile__error">{errors.email || ""}</span>
            </label>
          </fieldset>
          <button
            type="submit"
            className="profile__submit-button link-hover"
            disabled={!isValid}
          >
            Редактировать
          </button>
        </form>
        <Link className="profile__link-out link-hover" to="/" onClick={""}>
          Выйти из аккаунта
        </Link>
      </main>
    </>
  );
}
