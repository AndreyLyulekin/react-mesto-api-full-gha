export class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  };

  _checkEndpoint(endpoint) {
    if (!/^\//.test(endpoint)) {
      throw new Error('Endpoint must start with "/"');
    }
  }

  get(endpoint) {
    this._checkEndpoint(endpoint);

    return fetch(`${this._url}${endpoint}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._handleResponse);
  }

  post(endpoint, body) {
    this._checkEndpoint(endpoint);

    return fetch(`${this._url}${endpoint}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    }).then(this._handleResponse);
  }

  patch(endpoint, body) {
    this._checkEndpoint(endpoint);

    return fetch(`${this._url}${endpoint}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: body && JSON.stringify(body),
    }).then(this._handleResponse);
  }

  put(endpoint) {
    this._checkEndpoint(endpoint);

    return fetch(`${this._url}${endpoint}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._handleResponse);
  }
  delete(endpoint) {
    this._checkEndpoint(endpoint);

    return fetch(`${this._url}${endpoint}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._handleResponse);
  }
}
