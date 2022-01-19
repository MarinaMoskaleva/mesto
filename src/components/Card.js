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
        if (this._likes.length){
            this._likes.forEach((item) => {
                if (this._myId === item._id) {
                    this._isLikedByMe = true;
                    this._likeButton.classList.add('element__subtitle-like-button_active');
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
        this._confirmDeletion(this);
    }

    _handleLikeButtonClick(){
        if (this._isLikedByMe){
            this._delLike(this);
            this._isLikedByMe = false;
        }
        else {
            this._putLike(this);
            this._isLikedByMe = true;
        }
    }
    
    _setEventListeners() {
        if (this._myId === this._owner._id) {
            this._deleteButton.addEventListener('click', () => {
                this._handleTrashButtonClick();
            });
        }
        else {
            this._deleteButton.remove();
        }
        

        this._likeButton.addEventListener('click', () => {
            this._handleLikeButtonClick();
        });

        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
    
    generateCard() {
        this._element = this._getTemplate();
        this._titleElement = this._element.querySelector('.element__subtitle-text');
        this._imageElement =this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__subtitle-like-button');
        this._deleteButton = this._element.querySelector('.element__trash-button');
        this._likeCountElement = this._element.querySelector('.element__subtitle-like-count');

        this._setEventListeners();
    
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._titleElement.textContent = this._name;
        this._likeCountElement.textContent = this._likes.length;
        
        this._checkLike();
        return this._element;
    }

    deleteCard(){
        this._element.remove();
        this._element = null;
    }

    changeLikeState(isActive){
        this._likeButton
            .classList
            .toggle('element__subtitle-like-button_active', isActive);
    }
    
    setLikeCount(data){
        this._likeCountElement.textContent = data.likes.length;
    }
}