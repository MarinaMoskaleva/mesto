import {
    currentUserName,
    currentUserDesc,
    currentUserAvatar
} from '../utils/constants.js';

export default class UserInfo {
    constructor(){
        this._id = '0';
    }
    
    getUserInfo(){
        this._user = {};
        this._user['name'] = currentUserName.textContent;
        this._user['desc'] = currentUserDesc.textContent;
        this._user['avatar'] = currentUserAvatar.src;
        return this._user;
    }

    setUserInfo({name, about, avatar, _id}){
        currentUserName.textContent = name;
        currentUserDesc.textContent = about;
        currentUserAvatar.src = avatar;
        this._id = _id;
    }
}