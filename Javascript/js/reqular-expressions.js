const initApp = () => {
    const view1 = document.querySelector("#view1");
    const view2 = document.querySelector("#view2");

    view1.style.display = "none";
    view2.style.display = "none";
}

initApp();

document.getElementById("myTextInput").addEventListener("input", (event) => {
    const regex = /^\(?(\d{3})\)?(\d{3})[-. ]?(\d{4})$/g;
    const input = document.getElementById("myTextInput");
    const format = document.querySelector(".phoneFormat");
    const phone = input.value;
    const found = regex.test(phone);
    if (!format && phone.length) {
        input.classList.add("invaild");
        format.classList.add("block");
    } else {
        input.classList.remove("invaild");
        format.classList.remove("block");
    }
}); // not working (css is not setting yet)

