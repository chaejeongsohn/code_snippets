import React from "react"
import './App.css';
import MyHeader from "./MyHeader.js"
import MyFooter from './MyFooter';
import Counter from "./Counter";
import Container from "./Container";

function App() {
  const style = {
    bold_text : {
      color: "green",
    },
  };

  const func = () => {
    return "this is func"
  }

  const mynumber = 5;

  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  }

  return (
    // 최상위태그
    // <div className="App"> </div> 또는
    // <></> 또는
    // <React.Fragment> </React.Fragment> 이용해도 됨
    <Container>
      <div className="App"> 
        <MyHeader />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p style={style.bold_text}>안녕 리액트</p>
          <p>{func()}</p>
          <p>{mynumber}는 : {mynumber % 2 === 0? "짝수" : "홀수"}</p>
          <Counter initialValue={10} {...counterProps}/>
        <MyFooter />
      </div>
    </Container>

  );
}

export default App;
