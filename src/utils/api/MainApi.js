class MainApi {
  constructor(objConfig) {
    this._adress = objConfig.adress;
  }

  _verifyResolve(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._adress}/users/me`, {
      credentials: 'include',
    })
    .then(this._verifyResolve);
  }

  setUserInfo(data) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    })
    .then(this._verifyResolve);
  }

  getMovies() {
    return fetch(`${this._adress}/movies`, {
      credentials: 'include',
    })
    .then(this._verifyResolve);
  }

  addMovie(data) {
    return fetch(`${this._adress}/movies`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: data.country || " ",
        director: data.director || " ",
        duration: data.duration || 0,
        year: data.year || " ",
        description: data.description || " ",
        image: `https://api.nomoreparties.co/${data.image.url}`,
        trailer: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${data.image.url}`,
        movieId: `${data.id}`,
        nameRU: data.nameRU || " ",
        nameEN: data.nameEN || " ",
      }),
    }).then(this._verifyResolve);
  }

  deleteMovie(movieId) {
    return fetch(`${this._adress}/movies/${movieId}`, {
      method: "DELETE",
      credentials: 'include',
    })
    .then(this._verifyResolve);
  }
}

const apiConfig = {
  adress: "https://api.movies.dariy-iva.nomoredomains.work",
};

export const mainApi = new MainApi(apiConfig);
