class MoviesApi {
  constructor(objConfig) {
    this._adress = objConfig.adress;
  }

  _verifyResolve(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getMovies() {
    return fetch(this._adress)
    .then(this._verifyResolve)
    .then(data => {
      localStorage.setItem('movies', data);
      return data;
    });
  }
}

const apiConfig = {
  adress: "https://api.nomoreparties.co/beatfilm-movies",
};

export const moviesApi = new MoviesApi(apiConfig);