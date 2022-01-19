export function renderLoading(isLoading, popup, initText){
    const button = popup.querySelector('.popup__button');
    if (isLoading){
        button.textContent = 'Сохранение...'
    }
    else{
        button.textContent = initText;
    }
}

export function getInitTextButton(popup){
    return popup.querySelector('.popup__button').textContent;
}