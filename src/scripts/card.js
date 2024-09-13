export { createElementCard, deleteElementCard, switchingLike};

//---Функция создания карточки---\\
function createElementCard(cardData, onDeleteCard, onLikeCard, openImagePopup, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const deleteCardButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const quantityLikes = cardItem.querySelector(".quantity__likes");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", () => {
    openImagePopup(cardData);
  })

   if(cardData.owner._id !== userId) {
     deleteCardButton.style.display = 'none'
   }else {
     deleteCardButton.addEventListener("click", () => {
          onDeleteCard(cardItem, cardData._id);
     });
   }

   updateLike(likeButton, quantityLikes, cardData.likes)

  likeButton.addEventListener("click", () => {
    onLikeCard(cardItem, cardData._id)
  });

  return cardItem;
}

//---Функция удаления карточки---\\
function deleteElementCard(evt) {   
  evt.remove(); 
}; 



//---Функция обновление лайка---\\
function updateLike(likeButton, quantityLikes, likes) {
quantityLikes.textContent = likes.length
if (likes.some(like => like._id === window.userId)) {
  likeButton.classList.add("card__like-button_is-active");
} else {
  likeButton.classList.remove("card__like-button_is-active");
}
} 

//---Функция переключения лайка---\\
 function switchingLike(cardItem, likes) {
  const likeButton = cardItem.querySelector(".card__like-button");
  const quantityLikes = cardItem.querySelector(".quantity__likes");
  updateLike(likeButton, quantityLikes, likes);
}