////////////////////////////////////////////
// JavaScript Event Listeners

// const view3 = document.querySelector("#view3");
// const div = view3.querySelector("div");
// const h2 = div.querySelector("h2");

// const view4 = document.querySelector("#view4")
// view1.style.display = "none"
// view2.style.display = "none"
// view3.style.display = "flex"
// view4.style.display = "flex"

// Syntax: addEventListener(event, function, useCapture)
/*
const doSomething = () => {
    alert("doing something")
}

h2.addEventListener("click", doSomething, false);
h2.removeEventListener("click", doSomething);

function newEvent(evt){
    console.log(evt.target);
    evt.target.textContent = "Clicked"
}

h2.addEventListener("click", newEvent)
*/

/*
document.addEventListener("readystatechange", readyEvent);

function readyEvent(event){
    if (event.target.readyState === "complete") {
        console.log("readyState: complete");
        initApp();
    }
}

function clickEvent(target, color){
    target.style.backgroundColor = color;
};

function clickTextEvent(target, text){
    target.textContent = text;
};

function initApp(){
    const initapp_view = document.querySelector("#view3");
    const initapp_div = initapp_view.querySelector("div");
    const initapp_h2 = initapp_div.querySelector("h2");

    initapp_view.addEventListener("click", clickEvent(initapp_view, "lightblue"), true)
    initapp_div.addEventListener("click", clickEvent(initapp_div, "blue"), true)
    initapp_h2.addEventListener("click", clickTextEvent(initapp_h2, "t_Clicked"), true)

}
*/



document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("readyState: complete");
        initApp();
    }
});

const initApp = () => {
    const initapp_view = document.querySelector("#view2");
    const initapp_div = initapp_view.querySelector("div");
    const initapp_h2 = initapp_div.querySelector("h2");

    initapp_view.style.display = "flex"

    initapp_view.addEventListener(
        "click",
        (event) => {
            // initapp_view.style.backgroundColor = "lightblue"
            initapp_view.classList.toggle("purple");
            initapp_view.classList.toggle("darkblue");
        },
        false
    ); 
    initapp_div.addEventListener(
        "click",
        (event) => {
            // event.stopPropagation();
            // initapp_div.style.backgroundColor = "blue"
            initapp_div.classList.toggle("blue");
            initapp_div.classList.toggle("black");
        },
        false
    ); 
    initapp_h2.addEventListener(
        "click",
        (event) => {
            // event.stopPropagation();
            // initapp_h2.target.textContent = "Clicked"
            const init_myText = event.target.textContent;
            init_myText == "My 3nd View"
                ? (event.target.textContent = "Clicked")
                : (event.target.textContent = "My 3nd View");
        },
        false
    ); 

    const nav = document.querySelector("nav");
    nav.addEventListener("mouseover", (event) => {
        event.target.classList.add("height100");
    });
    nav.addEventListener("mouseout", (event) => {
        event.target.classList.remove("height100")
    });
};

