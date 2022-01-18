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
            this._handleFormSubmit(this._card);
        });
    }

    open(card){
        this._card = card;
        super.open();
    }
}