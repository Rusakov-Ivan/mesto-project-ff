import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createElementCard, deleteElementCard, putLike } from "./card.js";
import { openPopup, closePopup, handleEscKeyUp } from "./modal.js";

const cardList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//---Форма редактирования профиля---\\
const formEdit = popupEditProfile.querySelector(".popup__form");
const jobInput = formEdit.querySelector(".popup__input_type_description");
const nameInput = formEdit.querySelector(".popup__input_type_name");

//---Форма добавления карточки---\\
const formAddCard = popupAddNewCard.querySelector(".popup__form");
const inputCardName = formAddCard.querySelector(".popup__input_type_card-name");
const inputCardLink = formAddCard.querySelector(".popup__input_type_url");

//---Открытая карточка---\\\
const imageElement = popupImage.querySelector(".popup__image");
const imageCaption = popupImage.querySelector(".popup__caption");

//---Функция изменения профиля---\\
function handleEditFormSubmit(evt) {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);

  evt.preventDefault();
}

formEdit.addEventListener("submit", handleEditFormSubmit);

//---Функция добавления новой карточки---\\
function handleCardFormSubmit(evt) {
  const name = inputCardName.value;
  const link = inputCardLink.value;
  const newCard = createElementCard
  ({ name: name,
     link: link,
     alt: name
   }, deleteElementCard, putLike, openImagePopup);

  addCard(newCard);
  formAddCard.reset();
  closePopup(popupAddNewCard);

  evt.preventDefault();
}

function addCard(card) {
  cardList.prepend(card);
}

formAddCard.addEventListener("submit", handleCardFormSubmit);

//---Открытие попап окна редактирования профиля---\\
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
});

//---Открытие попап окна добавления карточки---\\
profileAddButton.addEventListener("click", () => {
  openPopup(popupAddNewCard);
});

//---Открытие попап окна картинки---\\
 function openImagePopup(cardData) {
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  imageCaption.textContent = cardData.name;
  openPopup(popupImage);
}

//---Функция закрытия попап окна редактирования---\\
function setListenersPopupEditing(popupElement) {
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popupEditProfile);
  });

  popupElement.addEventListener("mousedown", (evt) => {
    if (evt.target === popupEditProfile) {
      closePopup(popupEditProfile);
    }
  });
}
//---Функция закрытия попап окна добавления карточки---\\
function setListenersPopupAdd(popupElement) {
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popupAddNewCard);
  });

  popupElement.addEventListener("mousedown", (evt) => {
    if (evt.target === popupAddNewCard) {
      closePopup(popupAddNewCard);
    }
  });
}

//---Функция закрытия попап окна картинки---\\
function setListenersPopupImage(popupElement) {
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popupImage);
  });

  popupElement.addEventListener("mousedown", (evt) => {
    if (evt.target === popupImage) {
      closePopup(popupImage);
    }
  });
}
//---Вывод карточек на страницу---\\
initialCards.forEach((data) => {
  const newCard = createElementCard(data, deleteElementCard, putLike, openImagePopup);
  cardList.append(newCard);
});

setListenersPopupEditing(popupEditProfile);
setListenersPopupAdd(popupAddNewCard);
setListenersPopupImage(popupImage);
