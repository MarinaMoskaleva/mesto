import {
    currentUserName,
    currentUserDesc
} from '../utils/constants.js';

export default class UserInfo {
    constructor(){
        
    }
    
    getUserInfo(){
        this._user = {};
        this._user['name'] = currentUserName.textContent;
        this._user['desc'] = currentUserDesc.textContent;
        return this._user;
    }

    setUserInfo({name, desc}){
        currentUserName.textContent = name;
        currentUserDesc.textContent = desc;
    }
}