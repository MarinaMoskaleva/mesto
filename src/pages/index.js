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
  addButton,
  userName,
  userDesc
} from '../utils/constants.js';

import './index.css';

const user = new UserInfo();

const formValidEdit = new FormValidator(validationSettings, '.popup-edit');
formValidEdit.enableValidation();

const popupEdit = new PopupWithForm({selector:'.popup-edit', handleFormSubmit: (popupData) => {
  user.setUserInfo({name:popupData['name-input'], desc:popupData['description-input']});
  popupEdit.close();
}, formReset: () => {
  formValidEdit.clearValidationErrors();
}});

popupEdit.setEventListeners();

const popupImg = new PopupWithImage( '.popup-image');
popupImg.setEventListeners();

function handleCardClick(){
  popupImg.open({link:this._link, name:this._name});
}

function createCard(data) {
  const card = new Card(data, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement, 'append');
    },
  },
  cardListSection
);

const formValidAdd = new FormValidator(validationSettings, '.popup-add');
formValidAdd.enableValidation();

const popupAdd = new PopupWithForm({selector:'.popup-add', handleFormSubmit:(popupData) => {
  const cardElement = createCard({name:popupData['popup-add-name'], link:popupData['popup-add-url']});
  cardList.addItem(cardElement, 'prepend');
  popupAdd.close();
}, formReset: () => {
  formValidAdd.clearValidationErrors();
}});

popupAdd.setEventListeners();

function openPopupEdit() {
  ({name: userName.value, desc: userDesc.value} = user.getUserInfo());
  formValidEdit.setButtonStateDisabled(true);
  popupEdit.open();
}

function openPopupAdd() {
  formValidAdd.setButtonStateDisabled(true);
  popupAdd.open();
}

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

cardList.renderItems();



