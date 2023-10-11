const OddEvenResult =  ({number}) => {

    return (
        <p>propCount는 {number% 2 === 0? "짝수" : "홀수"}</p>
    )
};

export default OddEvenResult;