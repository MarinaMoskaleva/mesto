//-------------------------------------------Переменные
const elementTemplate = document.querySelector('#element-template').content;
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
const popupImageImage = popupImage.querySelector('.popup-image__image');
const popupImageCaption = popupImage.querySelector('.popup-image__caption');
const imageCloseButton = popupImage.querySelector('.popup-image__close-button');

const validationSettings = {
  formSelector: '.popup__form',
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

function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
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

function handlePreviewPicture(data){
  popupImageImage.src = data.link;
  popupImageImage.alt = data.name;
  popupImageCaption.textContent = data.name;
  openPopup(popupImage);
}

const createCard = (card) => {
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);

  const cardImage = cardElement.querySelector('.element__image');
  const cardSubtitle = cardElement.querySelector('.element__subtitle-text');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardSubtitle.textContent = card.name;

  const trashButton = cardElement.querySelector('.element__trash-button');
  trashButton.addEventListener('click', () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector('.element__subtitle-like');
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__subtitle-like_active');
  });

  cardImage.addEventListener('click', () => handlePreviewPicture(card));

  return cardElement;
}

const renderElement = (data, container, option) => {
  switch (option) {
    case 'append':
      container.append(createCard(data));
      break;
    case 'prepend':
      container.prepend(createCard(data));
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
initialCards.forEach(card => {
  renderElement(card,elements,'append');
});

enableValidation(validationSettings);