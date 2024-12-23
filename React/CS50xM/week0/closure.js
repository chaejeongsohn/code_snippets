// closure: 선언된 함수는 선언 시점에서 해당 변수에 엑세스 할 수 있다.

function makeFunctionArray() {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(function () {
      console.log(i);
    });
  }
  //   console.log(i);  i가 let인 경우에 closure가 작동해서 해당 함수 작동안함
  return arr;
}

const functionArr = makeFunctionArray();

functionArr[0]();

///////////////////////////////////////////////////////////

function makeHelloFunction() {
  const message = "Hello!";
  function sayHello() {
    console.log(message);
  }
  return sayHello;
}

const sayHello = makeHelloFunction();

console.log("typeof message: ", typeof message);
console.log(sayHello.toString());

sayHello();
