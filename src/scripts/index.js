import "../pages/index.css";
import { createElementCard, deleteElementCard, switchingLike } from "./card.js";
import { openPopup, closePopup, handleEscKeyUp } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  getUserInfo,
  updateUsers,
  addNewCard,
  deleteCard,
  putLikeCard,
  removeLikeCard,
  updateAvatar,
} from "./api.js";

const cardList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileUpdateAvatar = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_avatar");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//---Форма обновления аватара---\\
const formAvatar = popupAvatar.querySelector(".popup__form");
const inputAvatar = formAvatar.querySelector(".popup__input_avatar_url");

//---Форма редактирования профиля---\\
const formEdit = popupEditProfile.querySelector(".popup__form");
const jobInput = formEdit.querySelector(".popup__input_type_description");
const nameInput = formEdit.querySelector(".popup__input_type_name");

//---Форма добавления карточки---\\
const formAddCard = popupAddNewCard.querySelector(".popup__form");
const inputCardName = formAddCard.querySelector(".popup__input_type_card-name");
const inputCardLink = formAddCard.querySelector(".popup__input_type_url");

//---Открытая карточка---\\
const imageElement = popupImage.querySelector(".popup__image");
const imageCaption = popupImage.querySelector(".popup__caption");

//---Функция лоадера кнопки отправления---\\
const loadingData = (
  button,
  loading,
  loadingText = "Сохранение...",
  defaultText = "Сохранить"
) => {
  if (loading) {
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = defaultText;
    button.disabled = false;
  }
};
//---Функция изменение аватарки профиля---\\
const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  loadingData(submitButton, true);

  const newAvatar = inputAvatar.value;
  updateAvatar(newAvatar)
    .then((updatedAvatar) => {
      profileUpdateAvatar.style.backgroundImage = `url(${updatedAvatar.avatar})`;
      closePopup(popupAvatar);
      evt.target.reset();
    })

    .finally(() => loadingData(submitButton, false))
    .catch((error) =>
      console.log("Ошибка при обновление аватарки профиля:", error)
    );
};
formAvatar.addEventListener("submit", handleAvatarFormSubmit);

//---Функция изменения профиля---\\
const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  loadingData(submitButton, true);

  const newName = nameInput.value;
  const newJob = jobInput.value;

  updateUsers(newName, newJob)
    .then((updatedUser) => {
      updateUserProfile(updatedUser);
      closePopup(popupEditProfile);
    })

    .catch((error) => console.log("Ошибка при обновлении профиля:", error))
    .finally(() => loadingData(submitButton, false));
};

formEdit.addEventListener("submit", handleEditFormSubmit);

//---Функция добавления новой карточки---\\
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  loadingData(submitButton, true, "Создание...", "Создать");

  const name = inputCardName.value;
  const link = inputCardLink.value;

  addNewCard(name, link)
    .then((createCard) => {
      const newCard = createElementCard(
        createCard,
        handleDeleteCard,
        handleJobLike,
        openImagePopup,
        window.userId
      );
      cardList.prepend(newCard);
      closePopup(popupAddNewCard);
      evt.target.reset();
    })
    .catch((error) =>
      console.log("Ошибка при добавление новой карточки:", error)
    )
    .finally(() => loadingData(submitButton, false, "Создание...", "Создать"));
};

formAddCard.addEventListener("submit", handleCardFormSubmit);

//---Функция удаления своей карточки с сервера---\\
const handleDeleteCard = (cardItem, cardId) => {
  deleteCard(cardId).then(() => {
    deleteElementCard(cardItem);
  })
  .catch((error) => console.log("Неудалось удалить карточку:", error))
};

//---Функцтя работы лайка---\\
const handleJobLike = (cardItem, cardId) => {
  const likeButton = cardItem.querySelector(".card__like-button");
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const likeAction = isLiked ? removeLikeCard : putLikeCard;

  likeAction(cardId)
    .then((updatedCard) => {
      switchingLike(cardItem, updatedCard.likes);
    })
    .catch((error) => console.log("Ошибка при обновлении лайка:", error));
};

//---Функция показать карточку---\\
const showCard = (cards) => {
  cards.forEach((cardData) => {
    const card = createElementCard(
      cardData,
      handleDeleteCard,
      handleJobLike,
      openImagePopup,
      window.userId
    );
    cardList.append(card);
  });
};

//---Открытие попап окна аватарки---\\
profileUpdateAvatar.addEventListener("click", () => {
  openPopup(popupAvatar);
  clearValidation(formAvatar, validationConfig);
});

//---Открытие попап окна редактирования профиля---\\
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
  clearValidation(formEdit, validationConfig);
});

//---Открытие попап окна добавления карточки---\\
profileAddButton.addEventListener("click", () => {
  openPopup(popupAddNewCard);
  clearValidation(formAddCard, validationConfig);
});

//---Открытие попап окна картинки---\\
const openImagePopup = (cardData) => {
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  imageCaption.textContent = cardData.name;
  openPopup(popupImage);
};

//---Функция закрытия попап окна аватарки профиля---\\
const setListenersPopupAvatar = (popupElement) => {
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popupAvatar);
  });

  popupElement.addEventListener("mousedown", (evt) => {
    if (evt.target === popupAvatar) {
      closePopup(popupAvatar);
    }
  });
};

//---Функция закрытия попап окна редактирования---\\
const setListenersPopupEditing = (popupElement) => {
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popupEditProfile);
  });

  popupElement.addEventListener("mousedown", (evt) => {
    if (evt.target === popupEditProfile) {
      closePopup(popupEditProfile);
    }
  });
};
//---Функция закрытия попап окна добавления карточки---\\
const setListenersPopupAdd = (popupElement) => {
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popupAddNewCard);
  });

  popupElement.addEventListener("mousedown", (evt) => {
    if (evt.target === popupAddNewCard) {
      closePopup(popupAddNewCard);
    }
  });
};

//---Функция закрытия попап окна картинки---\\
const setListenersPopupImage = (popupElement) => {
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popupImage);
  });

  popupElement.addEventListener("mousedown", (evt) => {
    if (evt.target === popupImage) {
      closePopup(popupImage);
    }
  });
};

//---Функция обновление профиля---\\
const updateUserProfile = (userData) => {
  profileName.textContent = userData.name;
  profileJob.textContent = userData.about;
  profileUpdateAvatar.style.backgroundImage = `url(${userData.avatar})`;
};

//---Функция сохранения новых данных---\\
const initData = () => {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      window.userId = userData._id;
      updateUserProfile(userData);
      showCard(cards);
    })
    .catch((error) => {
      console.log("Ошибка при загрузке начальных данных:", error);
    });
};

initData();

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClassActive: "popup__input-error_active",
};

enableValidation(validationConfig);

setListenersPopupAvatar(popupAvatar);
setListenersPopupEditing(popupEditProfile);
setListenersPopupAdd(popupAddNewCard);
setListenersPopupImage(popupImage);
