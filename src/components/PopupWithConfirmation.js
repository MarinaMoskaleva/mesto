import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor({selector, handleFormSubmit}) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__container').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._cardId);
            this._cardToDel.remove();
            this._cardToDel = null;
        });
    }

    open(cardId, cardToDel){
        this._cardToDel = cardToDel;
        this._cardId = cardId;
        super.open();
    }
}