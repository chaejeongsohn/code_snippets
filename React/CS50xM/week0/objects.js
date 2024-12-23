const o = new Object();
o.firstName = "Jordan";
o.lastName = "Hayashi";
o.isTeaching = true;
o.greet = function () {
  console.log("hi!");
};

const o2 = {};
o.firstName = "Jordan";
o["lastName"] = "Hayashi";
const key = "isTeaching";
o[key] = true;
o["greet"] = function () {
  console.log("hi!");
};

const o3 = {
  firstName: "Jordan",
  lastName: "Hayashi",
  isTeaching: true,
  greet: function () {
    console.log("hi!");
  },
  address: {
    street: "Main St.",
    number: 123,
  },
};

// object Mutation
const o4 = {
  a: "a",
  b: "b",
  obj: {
    key: "i am key",
  },
};

// o5는 값을 가지는 것이 아님, o4의 포인터임
const o5 = o4;
console.log(o5.a); // a

o4.a = "new value";
console.log(o5.a); // new value

// shallow copy(얕은 복사)
// o5가 포인터가 아니게 하는 방법: assign()으로 개체 할당하기
const o6 = Object.assign({}, o4);
console.log("o6.b: ", o6.b); // b
console.log("o4.obj.key: ", o4.obj.key); // i am key
console.log("o6.obj.key: ", o6.obj.key); // i am key

o6.obj.key = "am i key?";
console.log("o4.obj.key: ", o4.obj.key); // am i key?
console.log("o6.obj.key: ", o6.obj.key); // am i key?

// deep copy
function deepCopy(obj) {
  const keys = Object.keys(obj);
  const newObject = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (typeof obj[key] === "object") {
      newObject[key] = deepCopy(obj[key]);
    } else {
      newObject[key] = obj[key];
    }
  }
  return newObject;
}

const o7 = deepCopy(o4);
console.log("deepCopy: o4.obj.key: ", o4.obj.key);
console.log("deepCopy: o7.obj.key: ", o7.obj.key);

o4.obj.key = "new key!";
console.log("deepCopy: o4.obj.key: ", o4.obj.key);
console.log("deepCopy: o7.obj.key: ", o7.obj.key);

// prototype
// 42.toString() // Errors
const num = 42;

num.toString(); //"42"
num.__proto__; // [Number: 0]
num instanceof Number; // false

Number.prototype.toString = function () {
  return "100";
};
console.log(num.toString());
num.toString(); //100
console.log(num);
num; //42
