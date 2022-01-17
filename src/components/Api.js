export default class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    getUser(){
        return fetch(this._baseUrl + '/users/me', {
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
  
    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    patchUserData(newData) {
        //debugger;
        return fetch(this._baseUrl + '/users/me', {
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
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          });
    }

    postNewCard(data){
        return fetch(this._baseUrl + '/cards', {
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
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          });
    }

    deleteCard(cardId){
      return fetch(this._baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

    putLike(cardId){
      return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

    deleteLike(cardId){
      return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

    patchAvatar(data){
      return fetch(this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: data
        })
      })
      .then(res => {
        if (res.ok) {
          console.log(res);
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
}