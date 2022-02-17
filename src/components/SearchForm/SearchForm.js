import React from "react";
import "./SearchForm.css";

export default function SearchForm() {
  const [movie, setmovie] = React.useState("");
  const [shortMovie, setShortMovie] = React.useState(true);

  React.useEffect(() => {
    setmovie("");
    setShortMovie(true);
  }, []);

  function handleChangeInputMovie(e) {
    setmovie(e.target.value);
  }

  function handleChangeInputDuration(e) {
    setShortMovie(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setmovie("");
  }

  return (
    <section className="search">
      <form name="search" className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search__text-input"
          placeholder="Фильм"
          name="movie"
          required
          maxLength="20"
          value={movie}
          onChange={handleChangeInputMovie}
        />
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
        <button type="submit" className="search__submit-button">
          Найти
        </button>
      </form>
    </section>
  );
}
