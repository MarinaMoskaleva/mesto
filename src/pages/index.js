import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

import {
  cardListSection,
  validationSettings,
  editButton,
  addButton,
  userName,
  userDesc,
  editAvatar,
  baseUrl,
  token
} from '../utils/constants.js';

import './index.css';

const user = new UserInfo();

const formValidEdit = new FormValidator(validationSettings, '.popup-edit');
formValidEdit.enableValidation();

const formValidAdd = new FormValidator(validationSettings, '.popup-add');
formValidAdd.enableValidation();

const formValidAvatar = new FormValidator(validationSettings, '.popup-edit-avatar');
formValidAvatar.enableValidation();

const popupImg = new PopupWithImage( '.popup-image');
popupImg.setEventListeners();

function handleCardClick(){
  popupImg.open(this._name, this._link);
}

const popupDelete = new PopupWithConfirmation({selector:'.popup-delete', handleFormSubmit:(cardId) => {
  api.deleteCard(cardId)
  .catch((err) => {
    console.log(err);
  });
  popupDelete.close();
}
});
popupDelete.setEventListeners();

function confirmDelCard(cardIs, cardElement){
  popupDelete.open(cardIs, cardElement);
}

function putCardLike(cardIs, cardElement){
  api.putLike(cardIs)
  .then((result) => {
    cardElement
    .querySelector('.element__subtitle-like-count')
    .textContent = result.likes.length;

    cardElement
    .querySelector('.element__subtitle-like-button')
    .classList
    .add('element__subtitle-like-button_active');
  })
  .catch((err) => {
    console.log(err);
  });
}

function delCardLike(cardIs, cardElement){
  api.deleteLike(cardIs)
  .then((result) => {
    cardElement
    .querySelector('.element__subtitle-like-count')
    .textContent = result.likes.length;

    cardElement
    .querySelector('.element__subtitle-like-button')
    .classList
    .remove('element__subtitle-like-button_active');
  })
  .catch((err) => {
    console.log(err);
  });
}

function createCard(data, userId) {
  const card = new Card(data, userId, '#element-template', handleCardClick, confirmDelCard, putCardLike, delCardLike);
  const cardElement = card.generateCard();
  return cardElement;
}

const api = new Api(baseUrl, token);
api.getUser()
.then((result) => {
  user.setUserInfo(result);
  api.getInitialCards()
  .then((data) => {
    const cardList = new Section({
      items: data,
      renderer: (item) => {
        const cardElement = createCard(item, result._id);
        cardList.addItem(cardElement, 'append');
        },
      },
      cardListSection
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  }); 
})
.catch((err) => {
  console.log(err);
});

function renderLoading(isLoading, button, initValue){
  if (isLoading){
    button.textContent = 'Сохранение...'
  }
  else{
    button.textContent = initValue;
  }
}

const popupEdit = new PopupWithForm({selector:'.popup-edit', handleFormSubmit: (popupData) => {
  const button = document.querySelector('.popup-edit').querySelector('.popup__button');
  const initVal = button.textContent;
  renderLoading(true, button, initVal);
  api.patchUserData({name:popupData['name-input'], about:popupData['description-input']})
  .then((result) => {
    user.setUserInfo(result);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(renderLoading(false, button, initVal));
  popupEdit.close();
}, formReset: () => {
  formValidEdit.clearValidationErrors();
}});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({selector:'.popup-add', handleFormSubmit:(popupData) => {
  const button = document.querySelector('.popup-add').querySelector('.popup__button');
  const initVal = button.textContent;
  renderLoading(true, button, initVal);
  api.postNewCard({name:popupData['popup-add-name'], link:popupData['popup-add-url']})
  .then((result) => {
    const cardElement = createCard(result, result.owner._id);
    document.querySelector(cardListSection).prepend(cardElement);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(renderLoading(false, button, initVal));
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

const popupEditAvatar = new PopupWithForm({selector:'.popup-edit-avatar', handleFormSubmit:(newAvatarLink) => {
  const button = document.querySelector('.popup-edit-avatar').querySelector('.popup__button');
  const initVal = button.textContent;
  renderLoading(true, button, initVal);
  api.patchAvatar(newAvatarLink['popup-avatar-url'])
  .then((result) => {
    user.setUserInfo(result);
    popupEditAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(renderLoading(false, button, initVal));
}, formReset: () => {
  formValidAvatar.clearValidationErrors();
}
});
popupEditAvatar.setEventListeners();

function openPopupEditAvatar() {
  formValidAvatar.setButtonStateDisabled(true);
  popupEditAvatar.open();
}

editAvatar.addEventListener('click', openPopupEditAvatar);

