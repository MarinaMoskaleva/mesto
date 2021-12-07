import {popupImage} from './popups.js';

export class Card {
    constructor(data, cardSelector, openPrewPic) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
        this._popupImage = popupImage;
        this._openPrewPic = function (popup) {
            openPrewPic(popup);
        }
    }
    
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
    
        return cardElement;
      }

    _handleTrashButtonClick(){
        this._element.remove();
        this._element = null;
    }

    _handleLikeButtonClick(){
        this._element
        .querySelector('.element__subtitle-like')
        .classList
        .toggle('element__subtitle-like_active');
    }

    _handlePreviewPicture(){
        this._popupImage.querySelector('.popup-image__image').src = this._link;
        this._popupImage.querySelector('.popup-image__image').alt = this._name;
        this._popupImage.querySelector('.popup-image__caption').textContent = this._name;

        this._openPrewPic(this._popupImage);
    }

    _setEventListeners() {
        this._element.querySelector('.element__trash-button').addEventListener('click', () => {
            this._handleTrashButtonClick();
        });

        this._element.querySelector('.element__subtitle-like').addEventListener('click', () => {
            this._handleLikeButtonClick();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handlePreviewPicture();
        });
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__subtitle-text').textContent = this._name;
    
        return this._element;
    }
}