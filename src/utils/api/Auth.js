const base_url = "https://api.movies.dariy-iva.nomoredomains.work";

function verifyResolve(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

export const register = (name, email, password) => {
  return fetch(`${base_url}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then(verifyResolve)
};

export const login = (email, password) => {
  return fetch(`${base_url}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(verifyResolve)
};

export const logout = () => {
  return fetch(`${base_url}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(verifyResolve)
}

export const checkToken = () => {
  return fetch(`${base_url}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(verifyResolve)
}
