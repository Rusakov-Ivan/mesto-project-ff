export { openPopup, closePopup, handleEscKeyUp };

//---Функция открытия попап окна---\\
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscKeyUp);
}
//---Функция закрытия попап окна---\\
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
}
//---Закрытие попап окна кнопкой esc---\\
const handleEscKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
};
