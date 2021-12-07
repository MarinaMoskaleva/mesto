export class FormValidator {
    constructor(data, formElement) {
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
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
      
    toggleButtonState() {
        const isFormInvalid = this._hasInvalidInput(this._inputList);
        this._submitButton.disabled = isFormInvalid;
        this._submitButton.classList.toggle(this._inactiveButtonClass, isFormInvalid);
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