//-------------------------------------------Переменные
import {initialCards} from './initialCards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const elements = document.querySelector('.elements');
const editButton = document.querySelector('.profile__info-edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__info-name-current');
const description = document.querySelector('.profile__info-description');

const popupEdit = document.querySelector('.popup-edit');
const editCloseButton = popupEdit.querySelector('.popup-edit__close-button');
const popupEditName = popupEdit.querySelector('.popup__input_type_name');
const popupEditDescription = popupEdit.querySelector('.popup__input_type_description');
const formEditElement = popupEdit.querySelector('.popup__form');
const popupEditButton = popupEdit.querySelector('.popup__button');

const popupAdd = document.querySelector('.popup-add');
const popupAddImageTitle = popupAdd.querySelector('.popup__input_type_title');
const popupAddImageUrl = popupAdd.querySelector('.popup__input_type_url');
const addCloseButton = popupAdd.querySelector('.popup-add__close-button');
const formAddElement = popupAdd.querySelector('.popup__form');
const popupAddButton = popupAdd.querySelector('.popup__button');

const popupImage = document.querySelector('.popup-image');

const imageCloseButton = popupImage.querySelector('.popup-image__close-button');

const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//---------------------------------------------Функции
function clearValidationErrors() {
  const ErrorSpans = document.querySelectorAll('.popup__error_visible');
  ErrorSpans.forEach((span)=>{
    span.classList.remove('popup__error_visible');
  })
  const ErrorInputs = document.querySelectorAll('.popup__input_type_error');
  ErrorInputs.forEach((input)=>{
    input.classList.remove('popup__input_type_error');
  })

}

function closeByEscape(evt){
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  clearValidationErrors();
}

function openPopupEdit(){
  popupEditName.value = profileName.textContent;
  popupEditDescription.value = description.textContent;
  popupEditButton.classList.remove('popup__button_disabled');
  openPopup(popupEdit);
}

function openPopupAdd(){
  formAddElement.reset();
  popupAddButton.classList.add('popup__button_disabled');
  openPopup(popupAdd);
}

const renderElement = (data, container, option) => {
  const card = new Card(data, '#element-template');
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

document.onclick = function(e){
  if ( e.target.classList.contains('popup')) {
    const popup = e.target;
    closePopup(popup);
  }
};

//----------------------------------------Начальные данные

initialCards.forEach((item) => {
  renderElement(item,elements,'append');
});

const formValidAdd = new FormValidator(validationSettings, popupAdd);
formValidAdd.enableValidation();

const formValidEdit = new FormValidator(validationSettings, popupEdit);
formValidEdit.enableValidation();