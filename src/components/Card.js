export default class Card {
    constructor({ link, name, likes, _id, owner}, myId, cardSelector, handleCardClick, confirmDeletion, putLike, delLike) {
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._id = _id;
        this._owner = owner;
        this._myId = myId;
        this._isLikedByMe = false;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._confirmDeletion = confirmDeletion;
        this._putLike = putLike;
        this._delLike = delLike;
    }

    _checkLike(){
        if (this._likes.length != 0){
            this._likes.forEach((item) => {
                if (this._myId === item._id) {
                    this._isLikedByMe = true;
                    this._element
                    .querySelector('.element__subtitle-like-button')
                    .classList
                    .add('element__subtitle-like-button_active');
                }
            })
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
        this._confirmDeletion(this._id, this._element);
    }

    _handleLikeButtonClick(){
        if (this._isLikedByMe){
            this._delLike(this._id, this._element);
            this._isLikedByMe = false;
        }
        else {
            this._putLike(this._id, this._element);
            this._isLikedByMe = true;
        }
    }
    
    _setEventListeners() {
        if (this._myId === this._owner._id) {
            this._element.querySelector('.element__trash-button').addEventListener('click', () => {
                this._handleTrashButtonClick();
            });
        }
        else {
            this._element.querySelector('.element__trash-button').remove();
        }
        

        this._element.querySelector('.element__subtitle-like-button').addEventListener('click', () => {
            this._handleLikeButtonClick();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__subtitle-text').textContent = this._name;
        this._element.querySelector('.element__subtitle-like-count').textContent = this._likes.length;
        this._checkLike();
        return this._element;
    }

    
}