export {getInitialCards, getUserInfo, updateUsers, addNewCard, deleteCard, putLikeCard, removeLikeCard, updateAvatar}

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
    headers: {
      authorization: '60450470-9087-4202-b22e-bc7984e2ac28',
      'Content-Type': 'application/json'
    }
  }
  const showResponse = (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
  } 

  const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    }).then(showResponse)
     
  }

  const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then(showResponse)
  }

  const updateUsers = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({ name, about }),
    }).then(showResponse);
  };
  

  const addNewCard = (name, link) =>{
return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({name, link})
}).then(showResponse);
  }

  const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    }).then(showResponse)
  }

  const putLikeCard = (cardId) => {
     return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers,
     }).then(showResponse)
  }

  const removeLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
    }).then(showResponse)
  }

  const updateAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({avatar: avatarUrl}),
    }).then(showResponse)
  }