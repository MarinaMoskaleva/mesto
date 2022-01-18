export default class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    _getResponseData(res) {
      if (res.ok) {
       return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    getUser(){
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._token
        }
      })
      .then(res => this._getResponseData(res));
    }
  
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then(res => this._getResponseData(res));
    }

    patchUserData(newData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: newData.name,
              about: newData.about
            })
          })
          .then(res => this._getResponseData(res));
    }

    postNewCard(data){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: data.name,
              link: data.link
            })
          })
          .then(res => this._getResponseData(res));
    }

    deleteCard(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      })
      .then(res => this._getResponseData(res));
    }

    putLike(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      })
      .then(res => this._getResponseData(res));
    }

    deleteLike(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      })
      .then(res => this._getResponseData(res));
    }

    patchAvatar(data){
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: data
        })
      })
      .then(res => this._getResponseData(res));
    }
}