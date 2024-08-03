export { createElementCard };
import { openImagePopup } from "./index.js";

//---Функция создания карточки---\\
function createElementCard(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardImage.addEventListener("click", () => {
    openImagePopup(data);
  });

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", putLike);

  return cardItem;
}

//---Функция удаления карточки---\\
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

//---Функция лайка---\\
function putLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
