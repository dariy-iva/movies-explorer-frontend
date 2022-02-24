import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import { inputConfig } from "../../utils/constants/inputsConfig";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function Profile({ onUpdate, handleLogout }) {
  const currentUser = React.useContext(CurrentUserContext);
  const nameInput = inputConfig.name;
  const emailInput = inputConfig.email;

  const [dataUser, setDataUser] = React.useState({ name: "", email: "" });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleChange(e) {
    const { name, value, validationMessage } = e.target;
    setDataUser({ ...dataUser, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  }

  React.useEffect(() => {
    setDataUser({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  React.useEffect(() => {
    if (
      dataUser.name !== currentUser.name ||
      dataUser.email !== currentUser.email
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [dataUser, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(dataUser);
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
                value={dataUser.name}
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
                value={dataUser.email}
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
