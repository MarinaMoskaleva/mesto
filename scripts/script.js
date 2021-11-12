//-------------------------------------------Переменные
const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');
const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__info-edit-button');
const addButton = content.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup-edit');
const editCloseButton = popupEdit.querySelector('.popup-edit__close-button');
const profileName = document.querySelector('.profile__info-name-current');
const description = document.querySelector('.profile__info-description');

const popupEditName = document.querySelector('.popup-edit__field_content_name');
const popupEditDescription = document.querySelector('.popup-edit__field_content_description');
const formEditElement = document.querySelector('.popup-edit__fields');
const popupAdd = document.querySelector('.popup-add');
const addCloseButton = popupAdd.querySelector('.popup-add__close-button');
const formAddElement = document.querySelector('.popup-add__fields');
const popupImage = document.querySelector('.popup-image');

const imageTemplate = document.querySelector('#template-popup-image__image').content;
const popupImageContainer = document.querySelector('.popup-image__container');
const fullSizeImage = imageTemplate.querySelector('.popup-image__image').cloneNode(true);
const fullSizeCaption = imageTemplate.querySelector('.popup-image__caption').cloneNode(true);

//---------------------------------------------Функции
function openPopup(popup){
  popup.classList.add(popup.className+'_opened');
}

function closePopup(popup){
  const popupClassName = popup.classList.item(1);
  if (popupClassName.includes('_opened')){
    popup.classList.remove(popup.classList.item(1));
  }
}

function openPopupEdit(){
  openPopup(popupEdit);
  popupEditName.value = profileName.textContent;
  popupEditDescription.value = description.textContent;
}

function closePopupEdit(){
  closePopup(popupEdit);
}

function openPopupAdd(){
  openPopup(popupAdd);
}

function closePopupAdd(){
  closePopup(popupAdd);
}

function openPopupImage(){
  openPopup(popupImage);
  formAddElement.reset();
}

function closePopupImage(){
  closePopup(popupImage);
  fullSizeImage.remove();
  fullSizeCaption.remove();
}

function handlePreviewPicture(data){
  openPopupImage();
  const imageCloseButton = popupImage.querySelector('.popup-image__close-button');
  imageCloseButton.addEventListener('click', closePopupImage);
  
  fullSizeImage.src = data.link;
  fullSizeImage.alt = data.name;
  popupImageContainer.append(fullSizeImage);
  fullSizeCaption.textContent = data.name;
  popupImageContainer.append(fullSizeCaption);
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

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditName.value;
  description.textContent = popupEditDescription.value;
  closePopupEdit();
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = evt.target;
  const newCardLink = newCard.querySelector('.popup-add__field_content_url').value;
  const newCardName = newCard.querySelector('.popup-add__field_content_name').value;
  renderElement({name: newCardName, link: newCardLink},elements,'prepend');
  closePopupAdd();
}

//---------------------------------------Обработчики

editButton.addEventListener('click', openPopupEdit);
editCloseButton.addEventListener('click', closePopupEdit);

addButton.addEventListener('click', openPopupAdd);
addCloseButton.addEventListener('click', closePopupAdd);

formEditElement.addEventListener('submit', formEditSubmitHandler);

formAddElement.addEventListener('submit', formAddSubmitHandler);

//----------------------------------------Начальные данные
initialCards.forEach(card => {
  renderElement(card,elements,'append');
});