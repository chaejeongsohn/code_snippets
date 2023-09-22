import React,{useState} from "react";

// Props: 부모 컴포넌트에서 준 매개변수 사용하기
const Counter = (props) => {

    console.log(props);  // Props: props는 객체로 전달받는다
    const [myCount, setCount] = useState(props.initialValue); 

// Props: {}로 비구조화해서 보낼수도 있다
// const Counter = ({initialValue}) => {
//     const [myCount, setCount] = useState(initialValue); 

    // 컴포넌트의 동적 상태는 useState 이용
    // const [myCount, setCount] = useState(0);  //초기값을 0으로 설정

    const onIncrease = () => {
        setCount(myCount + 1);
    };

    const onDecrease = () => {
        setCount(myCount - 1);
    };
 
    return (
        <div>
            <h2>{myCount}</h2>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
        </div>
    );

};

// Props: 매개변수가 없을 경우, 사용할 기본값 설정
Counter.defaultProps = {
    initialValue: 0
}

export default Counter;