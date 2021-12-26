import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }
    
    open({link, name}){
        this._popup.querySelector('.popup-image__image').src = link;
        this._popup.querySelector('.popup-image__image').alt = name;
        this._popup.querySelector('.popup-image__caption').textContent = name;
        super.open();
    }
}
