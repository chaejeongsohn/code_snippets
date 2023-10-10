import { useState } from "react";
import OddEvenResult from "./OddEvenResult";

// React에서는 
// 1. 컴포넌트의 State가 변경되면 해당 컴포넌트가 re-rendering 된다.
// 2. props가 변경되면 re-rendering 된다.
// 3. 부모가 변경되면 re-rendering 된다.

// props: 부모에서 보낸 매개변수 (initialValue=?)
const Counter =  (props) => {
    const [currentCount, setCount] = useState(0);

    const onIncrease = () => {
        setCount(currentCount + 1);
    }
    const onDecrease = () => {
        setCount(currentCount - 1);
    }

    console.log(props)
    const [propCount, setCount2] = useState(props.initialValue)
    
    return (
        <div>
            <div>
                <button onClick={onIncrease}>+</button>
                <span>{currentCount}</span>
                <button onClick={onDecrease}>-</button>
            </div>
            <div>
                <span>{propCount}</span>
                <OddEvenResult number={propCount}/>
            </div>


        </div>
    );
};

// props가 없는 경우 기본값 설정
Counter.defaultProps = {
    initialValue : 0,
}

export default Counter;