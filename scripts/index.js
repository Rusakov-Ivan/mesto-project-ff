
const cardList = document.querySelector(".places__list");

function createCard(data, delButton) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const cardDelete = cardItem.querySelector(".card__delete-button");
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardDelete.addEventListener("click", delButton);
  return cardItem;
}

function delButton(event) {
  const card = event.target.closest(".card");
  card.remove();
}

initialCards.forEach((data) => {
  cardList.append(createCard(data, delButton));
});
