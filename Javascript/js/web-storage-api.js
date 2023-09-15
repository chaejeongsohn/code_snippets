// Web Storage API

// Not part of the DOM - refers to the Window API
// Available to JS via the global variable: Window

// We do not have to type window. It is implied:

// console.log(window.location)
// console.log("ok!")

const myObject = {
    name: "Dave",
    logName: function() {
        console.log(this.name);
    }
};

const myArray = ["eat", "sleep", "code"];

sessionStorage.setItem("mySessionStore", myArray);
const mySessionDate = sessionStorage.getItem("mySessionStore");
console.log(mySessionDate)
console.log(typeof mySessionDate)


sessionStorage.setItem("mySession2", JSON.stringify(myArray));
const mySessionDate2 = JSON.parse(sessionStorage.getItem("mySession2"));
console.log(mySessionDate2);


localStorage.setItem("myLocalStore", JSON.stringify(myArray));
const key = localStorage.key(0);
const storeLength = localStorage.length;
const myLocalDate = JSON.parse(localStorage.getItem("myLocalStore"));

console.log(key);
console.log(storeLength);
console.log(myLocalDate)

