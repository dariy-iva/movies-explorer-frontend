import React from "react";
import "./SearchForm.css";
import useFormWithValidation from "../../utils/FormValidator";

export default function SearchForm({ onSubmit }) {
  const { values, handleChange, isValid, resetForm } = useFormWithValidation();

  const [shortMovie, setShortMovie] = React.useState(true);
  const [isValidForm, setIsValidForm] = React.useState(true);

  React.useEffect(() => {
    if (isValid) {
      setIsValidForm(true);
    }
  }, [isValid]);

  function handleChangeInputDuration(e) {
    setShortMovie(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      setIsValidForm(false);
    } else {
      onSubmit(values.movie);
      resetForm();
      setShortMovie(true);
    }
  }

  return (
    <section className="search">
      <form name="search" className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search__text-input"
          placeholder="Фильм"
          name="movie"
          minLength="1"
          maxLength="20"
          value={values.movie || ""}
          onChange={handleChange}
        />
        <span
          className={`search__error ${!isValidForm && "search__error_visible"}`}
        >
          {!isValidForm && "Нужно ввести ключевое слово"}
        </span>
        <label className="search__duration">
          <input
            type="checkbox"
            className="search__check-input"
            name="duration"
            checked={shortMovie}
            value="shortMovie"
            onChange={handleChangeInputDuration}
          />
          Короткометражки
        </label>
        <button type="submit" className="search__submit-button link-hover">
          Найти
        </button>
      </form>
    </section>
  );
}
