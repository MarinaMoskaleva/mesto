export default class Section {
    constructor({items, renderer}, selector){
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }
    
    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item))
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