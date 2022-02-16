import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import { inputConfig } from "../../utils/constants/inputConfig";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile() {
  const currentUser = React.useContext(CurrentUserContext);
  const nameInput = inputConfig.name;
  const emailInput = inputConfig.email;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name || "");
    setEmail(currentUser.email || "");
  }, [currentUser]);

  function handleChangeInputName(e) {
    setName(e.target.value);
  }

  function handleChangeInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Header />
      <main className="profile">
        <h2 className="profile__title">{`Привет, ${name}!`}</h2>
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
                value={name}
                onChange={handleChangeInputName}
              />
              <span className="profile__error"></span>
            </label>
            <label className="profile__field">
              {emailInput.label}
              <input
                type={emailInput.type}
                className="profile__input"
                name={emailInput.name}
                required
                minLength={emailInput.minLength}
                value={email}
                onChange={handleChangeInputEmail}
              />
              <span className="profile__error"></span>
            </label>
          </fieldset>
          <button type="submit" className="profile__submit-button">
            Редактировать
          </button>
        </form>
        <Link className="profile__link-out" to="/" onClick={""}>
          Выйти из аккаунта
        </Link>
      </main>
    </>
  );
}

export default Profile;
