import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import { inputConfig } from "../../utils/constants/inputsConfig";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import useFormValidator from "../../hooks/useFormValidator";

export default function Profile({ onUpdate, handleLogout }) {
  const currentUser = React.useContext(CurrentUserContext);
  const nameInput = inputConfig.name;
  const emailInput = inputConfig.email;
  const { values, handleChange, errors, isValid } =
    useFormValidator({
      name: currentUser.name,
      email: currentUser.email,
    });

  const [isValidProfile, setIsValidProfile] = React.useState(false);

  React.useEffect(() => {
    if (
      (values.name !== currentUser.name ||
        values.email !== currentUser.email) &&
      isValid
    ) {
      setIsValidProfile(true);
    } else {
      setIsValidProfile(false);
    }
  }, [values, currentUser, isValid]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(values);
  }

  return (
    <>
      <Header isLoggedIn={true} />
      <main className="profile">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
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
                pattern="^[a-zA-Zа-яёА-ЯЁ\-\s]+$"
                value={values.name || ""}
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
                pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
                value={values.email || ""}
                onChange={handleChange}
              />
              <span className="profile__error">{errors.email || ""}</span>
            </label>
          </fieldset>
          <button
            type="submit"
            className="profile__submit-button link-hover"
            disabled={!isValidProfile}
          >
            Редактировать
          </button>
        </form>
        <Link
          className="profile__link-out link-hover"
          to="/"
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </Link>
      </main>
    </>
  );
}
