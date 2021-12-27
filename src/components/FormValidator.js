export default class FormValidator {
    constructor(data, formSelector) {
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = document.querySelector(formSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this.toggleButtonState = this.toggleButtonState.bind(this);
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
    };
      
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _isValid(inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }
    
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    setButtonStateDisabled(isDisabled){
        this._submitButton.disabled = isDisabled;
        this._submitButton.classList.toggle(this._inactiveButtonClass, isDisabled);
    }
      
    toggleButtonState() {
        const isFormInvalid = this._hasInvalidInput(this._inputList);
        this.setButtonStateDisabled(isFormInvalid);
    }

    _setEventListeners() {
      this.toggleButtonState();
      this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
              this._isValid(inputElement);
              this.toggleButtonState();
            });
        });
    }

    enableValidation(){
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    clearValidationErrors() {
        this._inputList.forEach((inputElement) => {
            if (inputElement.classList.contains(this._inputErrorClass)) {
                this._hideInputError(inputElement);
            }
        });
    }
}