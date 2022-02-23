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

  addMovie(data) {
    return fetch(`${this._adress}/movies`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then(this._verifyResolve);
  }

  // getPosts() {
  //   return fetch(`${this._adress}/cards`, {
  //     credentials: 'include',
  //   })
  //   .then(this._verifyResolve);
  // }

  // setUserInfo(data) {
  //   return fetch(`${this._adress}/users/me`, {
  //     method: "PATCH",
  //     credentials: 'include',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: data.name,
  //       about: data.about,
  //     }),
  //   })
  //   .then(this._verifyResolve);
  // }

  // setUserAvatar(data) {
  //   return fetch(`${this._adress}/users/me/avatar`, {
  //     method: "PATCH",
  //     credentials: 'include',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       avatar: data.avatar,
  //     }),
  //   })
  //   .then(this._verifyResolve);
  // }

  // deletePost(postId) {
  //   return fetch(`${this._adress}/cards/${postId}`, {
  //     method: "DELETE",
  //     credentials: 'include',
  //   })
  //   .then(this._verifyResolve);
  // }

  // changeLikePostStatus(postId, isLiked) {
  //   return fetch(`${this._adress}/cards/${postId}/likes`, {
  //     method: isLiked ? "DELETE" : "PUT",
  //     credentials: 'include',
  //   })
  //   .then(this._verifyResolve);
  // }
}

const apiConfig = {
  adress: "https://api.movies.dariy-iva.nomoredomains.work",
};

export const mainApi = new MainApi(apiConfig);
