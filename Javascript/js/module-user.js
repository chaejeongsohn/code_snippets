export default class User {
    constructor(email, name) {
        this._id = email;  //_ 넣는이유: private 속성으로 사용하기 위해서 
        this._name = name;
    }

    greeting() {
        return `Hi, my name is ${this._name}.`;
    }
}