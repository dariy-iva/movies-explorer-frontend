import React from "react";
import "./SearchForm.css";
import useFormValidator from "../../hooks/useFormValidator";

export default function SearchForm(props) {
  const { onSubmit, keyWordSearch, isShortMovieSearch } = props;
  const { values, handleChange, isValid } = useFormValidator({
    movie: keyWordSearch,
  });

  const defaultShotMovieChecked =
    isShortMovieSearch !== undefined ? isShortMovieSearch : true;
  const [isShortMovie, setIsShortMovie] = React.useState(
    defaultShotMovieChecked
  );
  const [isValidForm, setIsValidForm] = React.useState(true);

  React.useEffect(() => {
    if (isValid) {
      setIsValidForm(true);
    }
  }, [isValid]);

  function handleChangeInputDuration(e) {
    setIsShortMovie(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid && !values.movie) {
      setIsValidForm(false);
    } else {
      const dataSearch = { movie: values.movie, isShortMovie: isShortMovie };
      onSubmit(dataSearch);
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
            checked={isShortMovie}
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
