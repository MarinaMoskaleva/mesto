let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__info-editButton');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__closeButton');
let profileName = document.querySelector('.profile__info-name-current');
let description = document.querySelector('.profile__info-description');
let root = document.querySelector('.root');


let popup_name = document.querySelector('#popup_name');
let popup_description = document.querySelector('#popup_description');

editButton.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    popup_name.value = profileName.textContent;
    popup_description.value = description.textContent;
  });

closeButton.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});

let formElement = document.querySelector('.popup__fields');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popup_name.value;
    description.textContent = popup_description.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 
document.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        formSubmitHandler(event);
      }
  });