thisIsNotHoisted();
thisIsHoisted();

thisIsAlsoVariable = "hello"; // global 변수(사용 권장안함)

const thisIsAConst = 50;
// thisIsAConst++; // error!

const constObj = {};
constObj.a = "a";

let thisIsALet = 51;
thisIsALet = 50;

// let thisIsALet = 51 // error!

var thisIsAVar = 50;
thisIsAVar = 51;
var thisIsAVar = "new value!";

console.log(thisIsAVar);

// Hoisting 호이스팅: 선언되기 전에 호출되는 불리는 기능
// const나 let인 경우에는 상단에 호이스팅하면, 아예 변수가 존재하지 않음 -> error!
//   ReferenceError: Cannot access 'thisIsNotHoisted' before initialization
// var인 경우에는 상단에 호이스팅 하면, 변수가 존재하지만 정의되지 않음 ->
//   TypeError: thisIsNotHoisted is not a function
function thisIsHoisted() {
  console.log("this is a function declared at the bottom");
}
let thisIsNotHoisted = function () {
  console.log("should this be hoisted?");
};
