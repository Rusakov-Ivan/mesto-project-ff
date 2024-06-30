
const cardList = document.querySelector(".places__list");

function createElementCard(data, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const deleteButton = cardItem.querySelector(".card__delete-button");
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  deleteButton.addEventListener("click", () => deleteCard(cardItem)); 
  return cardItem;
}

function deleteElementCard(cardElement) {  
  cardElement.remove(); 
}; 

initialCards.forEach((data) => {
  cardList.append(createElementCard(data, deleteElementCard));
});
