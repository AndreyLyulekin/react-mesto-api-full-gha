export class Api {
  constructor({ baseUrl, token }) {
    this._url = baseUrl;
    this._token = token;
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
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  post(endpoint, body) {
    this._checkEndpoint(endpoint);

    return fetch(`${this._url}${endpoint}`, {
      method: "POST",
      headers: {
        authorization: this._token,
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
        authorization: this._token,
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
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }
  delete(endpoint) {
    this._checkEndpoint(endpoint);

    return fetch(`${this._url}${endpoint}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }
}
