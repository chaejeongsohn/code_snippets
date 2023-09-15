////////////////////////////////////////////
// JavaScript Event Listeners

// Syntax: addEventListener(event, function, useCapture)

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("readyState: complete");
        initApp();
    }
});

const initApp = () => {
    const view3 = document.querySelector("#view3");
    const myForm = view3.querySelector("#myForm");
    
    view3.style.display = "flex"

    myForm.addEventListener("submit", (event) => {
        event.preventDefault();  //이벤트 내용이 새로고침되지 않음
        console.log("submit event")
    })
};

