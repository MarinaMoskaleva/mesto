let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__info-edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__info-name-current');
let description = document.querySelector('.profile__info-description');
let root = document.querySelector('.root');


let popupName = document.querySelector('.popup__field_content_name');
let popupDescription = document.querySelector('.popup__field_content_description');

function openFormToEdit () {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupDescription.value = description.textContent;
}

function closeFormAfterEdit () {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openFormToEdit);

closeButton.addEventListener('click', closeFormAfterEdit);

let formElement = document.querySelector('.popup__fields');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    description.textContent = popupDescription.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 
