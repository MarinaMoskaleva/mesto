//-------------------------------------------Переменные
import {initialCards} from './initialCards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {popupEdit, popupAdd, popupImage} from './popups.js';

const elements = document.querySelector('.elements');
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__info-name-current');
const description = document.querySelector('.profile__info-description');

const editCloseButton = popupEdit.querySelector('.popup-edit__close-button');
const popupEditName = popupEdit.querySelector('.popup__input_type_name');
const popupEditDescription = popupEdit.querySelector('.popup__input_type_description');
const formEditElement = popupEdit.querySelector('.popup__form');

const popupAddImageTitle = popupAdd.querySelector('.popup__input_type_title');
const popupAddImageUrl = popupAdd.querySelector('.popup__input_type_url');
const addCloseButton = popupAdd.querySelector('.popup-add__close-button');
const formAddElement = popupAdd.querySelector('.popup__form');

const imageCloseButton = popupImage.querySelector('.popup-image__close-button');

const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};



//---------------------------------------------Функции

function closeByEscape(evt){
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closeByOverlayClick(evt){
  if (evt.target.classList.contains('popup')) {
    const popup = evt.target;
    closePopup(popup);
  }
}

function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('click', closeByOverlayClick);
}

const formValidAdd = new FormValidator(validationSettings, popupAdd);
formValidAdd.enableValidation();

const formValidEdit = new FormValidator(validationSettings, popupEdit);
formValidEdit.enableValidation();

function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  document.removeEventListener('click', closeByOverlayClick);
}

function openPopupEdit(){
  popupEditName.value = profileName.textContent;
  popupEditDescription.value = description.textContent;
  formValidEdit.toggleButtonState();
  formValidEdit.clearValidationErrors();
  openPopup(popupEdit);
}

function openPopupAdd(){
  formAddElement.reset();
  formValidAdd.toggleButtonState();
  formValidAdd.clearValidationErrors();
  openPopup(popupAdd);
}

const renderElement = (data, container, option) => {
  const card = new Card(data, '#element-template', openPopup);
  const cardElement = card.generateCard();
  switch (option) {
    case 'append':
      container.append(cardElement);
      break;
    case 'prepend':
      container.prepend(cardElement);
      break;
    default:
      console.log(`нет такой опции: ${option}`);
  } 
};

function submitEditFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditName.value;
  description.textContent = popupEditDescription.value;
  closePopup(popupEdit);
}

function submitAddFormHandler(evt) {
  evt.preventDefault();
  const newCardLink = popupAddImageUrl.value;
  const newCardName = popupAddImageTitle.value;
  renderElement({name: newCardName, link: newCardLink},elements,'prepend');
  closePopup(popupAdd);
}

//---------------------------------------Обработчики
editButton.addEventListener('click', openPopupEdit);
editCloseButton.addEventListener('click', () => closePopup(popupEdit));

addButton.addEventListener('click', openPopupAdd);
addCloseButton.addEventListener('click', () => closePopup(popupAdd));

imageCloseButton.addEventListener('click', () => closePopup(popupImage));

formEditElement.addEventListener('submit', submitEditFormHandler);

formAddElement.addEventListener('submit', submitAddFormHandler);

//----------------------------------------Начальные данные

initialCards.forEach((item) => {
  renderElement(item,elements,'append');
});

