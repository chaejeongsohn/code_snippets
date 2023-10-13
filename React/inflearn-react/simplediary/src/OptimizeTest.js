import React,{useEffect, useState} from "react";

// 최적화 - React.memo
// 1. 해당 매개변수가 변할때만 re-rendering함
const TextView = React.memo(({text}) => {
    useEffect(() => {
        console.log(`update :: text : ${text}`);
    });
    return <div>{text}</div>;
});

const CountView = React.memo(({count}) => {
    useEffect(() => {
        console.log(`update :: count : ${count}`);
    });
    return <div>{count}</div>;
});


// 2. object를 비교할때는 메모리 주소를 비교하기때문에 
// compareCount2 처럼 따로 함수를 만들어서 비교해야한다.
const CounterObj = ({obj}) => {
    useEffect(() => {
        console.log(`Counter Obj update :: obj.myCount : ${obj.myCount}`);
    });
    return <div>count: {obj.myCount}</div>;
};

// object는 별도의 비교함수로 변수값 비교해야한다.
const compareCount2 = (prevProps, nextProps) => {
    return prevProps.obj.count2 === nextProps.obj.count2; // 참이면 실행 
};
const MemorizedCounterB = React.memo(CounterObj, compareCount2);


const OptimizeTest = () => {

    const [count, setCount] = useState(1);
    const [text, setText] = useState("");

    const [obj, setObj] = useState({
        myCount: 1,
    });

    return (
        <div style={{padding:50}}>
            <div>
                <h2>count</h2>
                
                <CountView count={count}/>
                <button onClick={() => setCount((count + 1))}>+</button>
            </div>
            <div>
                <h2>text</h2>
                <TextView text={text}/>
                <input value={text} onChange={(e) => setText(e.target.value)}></input>
            </div>
            <hr/>
            <div>
                <h2>Counter Obj</h2>
                <MemorizedCounterB obj={obj}/>
                <button onClick={()=>setObj({
                    myCount: obj.myCount ,
                })}>check no re-rendering</button>
            </div>
        </div>
    )
}

export default OptimizeTest;