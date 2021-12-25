import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

import {
  initialCards,
  cardListSection,
  validationSettings,
  editButton,
  addButton
} from '../utils/constants.js';

import './index.css';

const user = new UserInfo({nameSelector:'.profile__info-name-current', descSelector:'.profile__info-description'});

const formValidEdit = new FormValidator(validationSettings, '.popup-edit');
formValidEdit.enableValidation();

const popupEdit = new PopupWithForm({selector:'.popup-edit', handleFormSubmit: (popupData) => {
  console.log(popupData['name-input']);
  user.setUserInfo({name:popupData['name-input'], desc:popupData['description-input']});
  popupEdit.close();
}, formReset: () => {
  formValidEdit.clearValidationErrors();
}});

popupEdit.setEventListeners();

function handleCardClick(){
  const popupImg = new PopupWithImage({link:this._link, name:this._name}, '.popup-image');
  popupImg.setEventListeners();
  popupImg.open();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#element-template', handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement, 'append');
    },
  },
  cardListSection
);

const formValidAdd = new FormValidator(validationSettings, '.popup-add');
formValidAdd.enableValidation();

const popupAdd = new PopupWithForm({selector:'.popup-add', handleFormSubmit:(popupData) => {
  const card = new Card({name:popupData['popup-add-name'], link:popupData['popup-add-url']}, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement, 'prepend');
  popupAdd.close();
}, formReset: () => {
  formValidAdd.clearValidationErrors();
}});

popupAdd.setEventListeners();

function openPopupEdit() {
  popupEdit.setInputsInfo(user.getUserInfo());
  formValidEdit.toggleButtonState();
  popupEdit.open();
}

function openPopupAdd() {
  formValidAdd.toggleButtonState();
  popupAdd.open();
}

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

cardList.renderItems();



