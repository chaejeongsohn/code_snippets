const firstName = "Jordan";
const lastName = "Hayashi";

const val = 42;

const arr = [
  "string",
  42,
  function () {
    console.log("hi");
  },
];

arr[2]();

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// Coercion: Explicit(명시적) vs Implicit(암시적)
const x = 42;
const explicit = String(x);
const implicit = x + "";

//Types
const y = 42;
console.log(typeof x); //number
console.log(typeof null); //object

// == 보단 === 을 사용하기
// false 값: undefined, null, false, +0, -0, NaN, ==
// true 값: {}, [], 그외 모든 값
