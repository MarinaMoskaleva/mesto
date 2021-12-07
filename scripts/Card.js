export class Card {
    constructor(data, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
    }
    
    _getTemplate() {
        const cardElement = document
        .querySelector('#element-template')
        .content
        .querySelector('.element')
        .cloneNode(true);
    
        return cardElement;
      }

    _handleTrashButtonClick(){
        this._element.remove();
    }

    _handleLikeButtonClick(){
        this._element
        .querySelector('.element__subtitle-like')
        .classList
        .toggle('element__subtitle-like_active');
    }

    _handlePreviewPicture(){
        const prewPic = document
        .querySelector('.popup-image');
        
        prewPic.querySelector('.popup-image__image').src = this._link;
        prewPic.querySelector('.popup-image__image').alt = this._name;
        prewPic.querySelector('.popup-image__caption').textContent = this._name;

        prewPic.classList.add('popup_opened');
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