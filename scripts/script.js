//-------------------------------------------Переменные
const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');
const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__info-edit-button');
const addButton = content.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__info-name-current');
const description = document.querySelector('.profile__info-description');

const popupEdit = document.querySelector('.popup-edit');
const editCloseButton = popupEdit.querySelector('.popup-edit__close-button');
const popupEditName = popupEdit.querySelector('.popup-edit__field_content_name');
const popupEditDescription = popupEdit.querySelector('.popup-edit__field_content_description');
const formEditElement = popupEdit.querySelector('.popup-edit__fields');

const popupAdd = document.querySelector('.popup-add');
const popupAddImageName = popupAdd.querySelector('.popup-add__field_content_name');
const popupAddImageUrl = popupAdd.querySelector('.popup-add__field_content_url');
const addCloseButton = popupAdd.querySelector('.popup-add__close-button');
const formAddElement = popupAdd.querySelector('.popup-add__fields');

const popupImage = document.querySelector('.popup-image');
const popupImageImage = popupImage.querySelector('.popup-image__image');
const popupImageCaption = popupImage.querySelector('.popup-image__caption');
const imageCloseButton = popupImage.querySelector('.popup-image__close-button');


//---------------------------------------------Функции
function openPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function openPopupEdit(){
  popupEditName.value = profileName.textContent;
  popupEditDescription.value = description.textContent;
  openPopup(popupEdit);
}

function openPopupAdd(){
  formAddElement.reset();
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

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditName.value;
  description.textContent = popupEditDescription.value;
  closePopup(popupEdit);
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const newCardLink = popupAddImageUrl.value;
  const newCardName = popupAddImageName.value;
  renderElement({name: newCardName, link: newCardLink},elements,'prepend');
  closePopup(popupAdd);
}

//---------------------------------------Обработчики
editButton.addEventListener('click', openPopupEdit);
editCloseButton.addEventListener('click', () => closePopup(popupEdit));

addButton.addEventListener('click', openPopupAdd);
addCloseButton.addEventListener('click', () => closePopup(popupAdd));

imageCloseButton.addEventListener('click', () => closePopup(popupImage));

formEditElement.addEventListener('submit', formEditSubmitHandler);

formAddElement.addEventListener('submit', formAddSubmitHandler);

//----------------------------------------Начальные данные
initialCards.forEach(card => {
  renderElement(card,elements,'append');
});