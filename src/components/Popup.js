export default class Popup {
    constructor(selector){
        this._popup = document.querySelector(selector);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    _handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    setEventListeners() {
        this._popup.querySelector('.popup__close-button').addEventListener('click', this.close);
        document.addEventListener('click', this._handleOverlayClose);
    }

}