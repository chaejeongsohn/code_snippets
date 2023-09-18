// Fetch API requires a discussion of...
// Callbacks, Promises, Thenables, and Async/Await

// Callbacks
function firstFunction(parameters, callback){
    callback()
}
function secondFunction(parameters, callback){
    callback()
}
function thirdFunction(parameters, callback){
    callback()
}

// a.k.a "callback hell"
let param = "p"
firstFunction (param, function(){
    //do something
    secondFunction(param, function(){
        thirdFunction(param, function(){
            //...
        })
    })
})


// Promise
// 3 states: Pending, Fulfilled, Rejected
const myPromise = new Promise((resolve, reject) => {
    const error = true;
    if(error) {
        resolve("Yes! resolved the promise!");
    } else {
        reject("No! rejected the promise.");
    }
});
console.log(myPromise);

myPromise
.then(value => {
    return "Thenables: " + value + " (first then)";
})
.then(newValue => {
    console.log("newValue: "+ newValue);
})
.catch(err => {
    console.error(err)
})

const mySecondPromise = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve("mySecondPromise resolved");
    }, 3000);  // 3초 지연
})

mySecondPromise
.then(value => {
    console.log(value)
})

//pending
const users = fetch("https://jsonplaceholder.typicode.com/users");
console.log(users);

const usersSecond = fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => {
        return res.json();
    })
    .then(data => {
        data.forEach(user => {
            console.log("userSecond: " + user);
        })
    });


// Async/Await
const myUsers = {
    userList: []
}

const firstAsyncFunction = async () => {
    const response = await fetch ("https://jsonplaceholder.typicode.com/users");
    const jsonUserData = await response.json();
    return jsonUserData;
}

const secondAsyncFunction = async () => {
    const data = await firstAsyncFunction();
    myUsers.userList = data;
    console.log("secondAsyncFunction: " + myUsers.userList);
}

secondAsyncFunction();
console.log("not async: " + myUsers.userList);

// workflow function
const getAllUserEmails = async () => {
    const response = await fetch ("https://jsonplaceholder.typicode.com/users");
    const jsonUserData = await response.json();

    const userEmailArray = jsonUserData.map(user => {
        return user.email;
    });

    printToConsole(userEmailArray);
} 
const printToConsole = (data) => {
    console.log(data);
}
getAllUserEmails();

// 2nd parameter of Fetch is a object
const getDadJoke = async () => {
    const response = await fetch ("https://icanhazdadjoke.com/", {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });
    const jsonJokeData = await response.json();
    console.log("getDadJoke: "+jsonJokeData.joke);
}
getDadJoke();

const jokeObject = {
    id: 'm3182oz5TCd',
    joke: 'Someone asked me to name two structures that hold water. I said "Well dam"'
}
const postDadJoke = async (jokeObject) => {
    const response = await fetch ("https://httpbin.org/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeObject)
    });
    const jsonResponse = await response.json();
    console.log("postDadJoke: "+jsonResponse.headers);
}
postDadJoke(jokeObject)

const requestJoke = async (someoneName) => {
    const response = await fetch (`https://api.chucknorris.io/jokes/random?name=${someoneName}`);
    const jsonResponse = await response.json();
    console.log(jsonResponse.value)
}
requestJoke("Bruce");


// abstract into functions 함수 추상화
const getDataFromForm = () => {
    const requestObj = {
        myName: "SohnChaeJeong",
        categories: ["dev"]
    };
    return requestObj;
}
const buildRequestUrl = (requestData) => {
    return `https://api.chucknorris.io/jokes
        /random?name=${requestData.someoneName}&category=${requestData.categories}`;
}
const requstJokeByURL = async (url) => {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const joke = jsonResponse.value;
    printToConsole(joke);
}

// Procedural "workflow" function (절차적 함수)
const processJokeRequest = async () => {
    const requestData = getDataFromForm();
    const requestURL = buildRequestUrl(requestData);
    await requestJoke(requestURL);
    console.log("processJokeRequest finished!")
}
processJokeRequest();
