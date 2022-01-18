export default class UserInfo {
    constructor(name, desc, avatar){
        this._id = '0';
        this._name = name;
        this._desc = desc;
        this._avatar = avatar;
    }
    
    getUserInfo(){
        this._user = {};
        this._user['name'] = this._name.textContent;
        this._user['desc'] = this._desc.textContent;
        this._user['avatar'] = this._avatar.src;
        return this._user;
    }

    setUserInfo({name, about, avatar, _id}){
        this._name.textContent = name;
        this._desc.textContent = about;
        this._avatar.src = avatar;
        this._id = _id;
    }
}