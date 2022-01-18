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
  token, 
  popupEditElement, 
  popupAddElement,
  popupEditAvatarElement,
  renderLoading,
  getInitTextButton,
  currentUserName,
  currentUserDesc,
  currentUserAvatar
} from '../utils/constants.js';

import './index.css';

const user = new UserInfo(currentUserName, currentUserDesc, currentUserAvatar);

const formValidEdit = new FormValidator(validationSettings, '.popup-edit');
formValidEdit.enableValidation();

const formValidAdd = new FormValidator(validationSettings, '.popup-add');
formValidAdd.enableValidation();

const formValidAvatar = new FormValidator(validationSettings, '.popup-edit-avatar');
formValidAvatar.enableValidation();

const popupImg = new PopupWithImage( '.popup-image');
popupImg.setEventListeners();

function handleCardClick(name, link){
  popupImg.open(name, link);
}

const popupDelete = new PopupWithConfirmation({selector:'.popup-delete', handleFormSubmit:(card) => {
  api.deleteCard(card._id)
  .then(()=>{
    card.deleteCard();
    popupDelete.close();
  })
  .catch((err) => {
    console.log(err);
  });
}
});
popupDelete.setEventListeners();

function confirmDelCard(card){
  popupDelete.open(card);
}

function putCardLike(card){
  api.putLike(card._id)
  .then((result) => {
    card.changeLikeState(true);
    card.setLikeCount(result.likes.length);
  })
  .catch((err) => {
    console.log(err);
  });
}

function delCardLike(card){
  api.deleteLike(card._id)
  .then((result) => {
    card.changeLikeState(false);
    card.setLikeCount(result.likes.length);
  })
  .catch((err) => {
    console.log(err);
  });
}

function createCard(userId, data) {
  const card = new Card(data, userId, '#element-template', handleCardClick, confirmDelCard, putCardLike, delCardLike);
  const cardElement = card.generateCard();
  return cardElement;
}
const cardList = new Section(renderItem, cardListSection);

function renderItem(userId, item){
  const cardElement = createCard(userId, item);
  cardList.addItem(cardElement, 'append');
}

const api = new Api(baseUrl, token);

Promise.all([
  api.getUser(),
  api.getInitialCards()
])
  .then(([userData, cards])=>{
    user.setUserInfo(userData);
    cardList.renderItems(userData._id, cards);
  })
  .catch((err)=>{
    console.log(err);
  });

const popupEdit = new PopupWithForm({selector:'.popup-edit', handleFormSubmit: (popupData) => {
  const initVal = getInitTextButton(popupEditElement);
  renderLoading(true, popupEditElement, initVal);
  api.patchUserData({name:popupData['name-input'], about:popupData['description-input']})
  .then((result) => {
    user.setUserInfo(result);
    popupEdit.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {renderLoading(false, popupEditElement, initVal);});
}
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm({selector:'.popup-add', handleFormSubmit:(popupData) => {
  const initVal = getInitTextButton(popupAddElement);
  renderLoading(true, popupAddElement, initVal);
  api.postNewCard({name:popupData['popup-add-name'], link:popupData['popup-add-url']})
  .then((result) => {
    const cardElement = createCard(result.owner._id,result);
    cardList.addItem(cardElement, 'prepend');
    popupAdd.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {renderLoading(false, popupAddElement, initVal);});
  
}
});
popupAdd.setEventListeners();


function openPopupEdit() {
  ({name: userName.value, desc: userDesc.value} = user.getUserInfo());
  formValidEdit.clearValidationErrors();
  popupEdit.open();
}

function openPopupAdd() {
  formValidAdd.clearValidationErrors();
  popupAdd.open();
}

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

const popupEditAvatar = new PopupWithForm({selector:'.popup-edit-avatar', handleFormSubmit:(newAvatarLink) => {
  const initVal = getInitTextButton(popupEditAvatarElement);
  renderLoading(true, popupEditAvatarElement, initVal);
  api.patchAvatar(newAvatarLink['popup-avatar-url'])
  .then((result) => {
    user.setUserInfo(result);
    popupEditAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {renderLoading(false, popupEditAvatarElement, initVal);});
}
});
popupEditAvatar.setEventListeners();

function openPopupEditAvatar() {
  formValidAvatar.clearValidationErrors()
  popupEditAvatar.open();
}

editAvatar.addEventListener('click', openPopupEditAvatar);

