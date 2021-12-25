import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({link, name}, selector) {
        super(selector);
        this._link = link;
        this._name = name;
    }

    open(){
        this._popup.querySelector('.popup-image__image').src = this._link;
        this._popup.querySelector('.popup-image__image').alt = this._name;
        this._popup.querySelector('.popup-image__caption').textContent = this._name;
        super.open();
    }
}
