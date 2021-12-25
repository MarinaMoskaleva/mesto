export default class UserInfo {
    constructor({nameSelector, descSelector}){
        this._nameSelector = nameSelector;
        this._descSelector = descSelector;
        this._name = document.querySelector(nameSelector).textContent;
        this._desc = document.querySelector(descSelector).textContent;
    }
    
    getUserInfo(){
        this._user = {};
        this._user['name'] = this._name;
        this._user['desc'] = this._desc;
        return this._user;
    }

    setUserInfo({name, desc}){
        this._name = name;
        this._desc = desc;
        document.querySelector(this._nameSelector).textContent = this._name;
        document.querySelector(this._descSelector).textContent = this._desc;
    }
}