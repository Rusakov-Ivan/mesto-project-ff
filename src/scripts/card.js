export { createElementCard, deleteElementCard, putLike};

//---Функция создания карточки---\\
function createElementCard(cardData, onDeleteCard, onLikeCard, openImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const deleteCardButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => {
    openImagePopup(cardData);
  })

  deleteCardButton.addEventListener("click", onDeleteCard);

  likeButton.addEventListener("click", onLikeCard);

  return cardItem;
}

//---Функция удаления карточки---\\
function deleteElementCard(evt) {   
  evt.target.closest(".card").remove(); 
}; 

//---Функция лайка---\\
function putLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}
