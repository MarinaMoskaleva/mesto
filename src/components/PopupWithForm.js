import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({selector, handleFormSubmit}) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    _getInputValues(){
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._popupValues = {};
        this._inputList.forEach(input => this._popupValues[input.name] = input.value);
        return this._popupValues;
    }

    close(){
        super.close();
        this._popupForm.reset();
    }
}