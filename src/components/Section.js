export default class Section {
    constructor(renderer, selector){
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }
    
    renderItems(user, items) {
        items.forEach(item => this._renderer(user, item))
    }
    
    addItem(element, option) {
        switch (option) {
            case 'append':
                this._container.append(element);
                break;
            case 'prepend':
                this._container.prepend(element);
                break;
            default:
                console.log(`нет такой опции: ${option}`);
          }
    }

}