const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');

function addCard(card) {
    const elementItem = elementTemplate.querySelector('.element').cloneNode(true);
    elementItem.querySelector('.element__image').src = card.link;
    elementItem.querySelector('.element__image').alt = card.name;
    elementItem.querySelector('.element__subtitle-text').textContent = card.name;
    elementItem.querySelector('.element__subtitle-like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__subtitle-like_active');
    });
    elements.append(elementItem);
}

initialCards.forEach(card => {
    addCard(card);
 });

activateTrashButton();

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__info-edit-button');
const addButton = content.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup-edit');
const editCloseButton = popupEdit.querySelector('.popup-edit__close-button');
const profileName = document.querySelector('.profile__info-name-current');
const description = document.querySelector('.profile__info-description');

let popupEditName = document.querySelector('.popup-edit__field_content_name');
let popupEditDescription = document.querySelector('.popup-edit__field_content_description');

function openFormToEdit() {
    popupEdit.classList.add('popup-edit_opened');
    popupEditName.value = profileName.textContent;
    popupEditDescription.value = description.textContent;
}

function closeFormAfterEdit() {
    popupEdit.classList.remove('popup-edit_opened');
}

editButton.addEventListener('click', openFormToEdit);

editCloseButton.addEventListener('click', closeFormAfterEdit);

const formEditElement = document.querySelector('.popup-edit__fields');

function formEditSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditName.value;
    description.textContent = popupEditDescription.value;
    popupEdit.classList.remove('popup-edit_opened');
}

formEditElement.addEventListener('submit', formEditSubmitHandler);

const popupAdd = document.querySelector('.popup-add');
const addCloseButton = popupAdd.querySelector('.popup-add__close-button');

function openFormToAdd() {
    popupAdd.classList.add('popup-add_opened');
    document.querySelector('.popup-add__field_content_url').value = '';
    document.querySelector('.popup-add__field_content_name').value = '';
}

function closeFormAfterAdd() {
    popupAdd.classList.remove('popup-add_opened');
}

addButton.addEventListener('click', openFormToAdd);

addCloseButton.addEventListener('click', closeFormAfterAdd);

const formAddElement = document.querySelector('.popup-add__fields');



function createCard() {
  const cardItem = elementTemplate.querySelector('.element').cloneNode(true);
  cardItem.querySelector('.element__image').src = document.querySelector('.popup-add__field_content_url').value;
  cardItem.querySelector('.element__image').alt = document.querySelector('.popup-add__field_content_name').value;
  cardItem.querySelector('.element__subtitle-text').textContent = document.querySelector('.popup-add__field_content_name').value;
  cardItem.querySelector('.element__subtitle-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__subtitle-like_active');
  });
  elements.prepend(cardItem);
  activateTrashButton();
}


function formAddSubmitHandler (evt) {
    evt.preventDefault();
    createCard();
    popupAdd.classList.remove('popup-add_opened');
}

formAddElement.addEventListener('submit', formAddSubmitHandler);

function activateTrashButton(){
  const trashButtons = document.querySelectorAll('.element__trash-button');
  trashButtons.forEach(button => button.addEventListener('click', () => {
  const card = button.closest('.element');
  card.remove();
  }));
}

const popupImage = document.querySelector('.popup-image');
const imageCloseButton = popupImage.querySelector('.popup-image__close-button');

function openImage(){
  popupImage.classList.add('popup-image_opened');
}

function closeImage() {
  popupImage.classList.remove('popup-image_opened');
  const image = document.querySelector('.popup-image__image');
  image.remove();
  const caption = document.querySelector('.popup-image__caption');
  caption.remove();
}

imageCloseButton.addEventListener('click', closeImage);

const imageTemplate = document.querySelector('#template-popup-image__image').content;

const popupImageContainer = document.querySelector('.popup-image__container');

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('element__image')) {
    const activateImage = imageTemplate.querySelector('.popup-image__image').cloneNode(true);
    activateImage.src = e.target.src;
    popupImageContainer.append(activateImage);
    const activateCaption = imageTemplate.querySelector('.popup-image__caption').cloneNode(true);
    activateCaption.textContent = e.target.alt;
    popupImageContainer.append(activateCaption);
    openImage();
  }
});