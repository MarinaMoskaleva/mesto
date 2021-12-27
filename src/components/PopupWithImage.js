import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._image = this._popup.querySelector('.popup-image__image');
        this._caption = this._popup.querySelector('.popup-image__caption');
    }
    
    open(name, link){
        this._image.src = link;
        this._image.alt = link;
        this._caption.textContent = name;
        super.open();
    }
}
