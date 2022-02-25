class AuthApi {
  constructor(objConfig) {
    this._adress = objConfig.adress;
  }

  _verifyResolve(res) {
    return res.ok 
      ? res.json() 
      : Promise.reject(res.json());
  }

  register(name, email, password) {
    return fetch(`${this._adress}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then(this._verifyResolve)
  };
  
  login(email, password) {
    return fetch(`${this._adress}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(this._verifyResolve)
  };
  
  logout() {
    return fetch(`${this._adress}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(this._verifyResolve)
  }
  
  checkToken() {
    return fetch(`${this._adress}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(this._verifyResolve)
  }

  returnResMessage() {
    return this.res;
  }

}

const apiConfig = {
  adress: "https://api.movies.dariy-iva.nomoredomains.work",
};

export const authApi = new AuthApi(apiConfig);