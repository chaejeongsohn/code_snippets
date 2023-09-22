import logo from './logo.svg';
import React from 'react'
import './App.css';
import MyHeader from './MyHeader.js'
import MyFooter from './MyFooter';
import Counter from './Counter';

function App() {

  let name = "zn"

  const customStyle = {
    App: {
      backgroundColor: "gray",
    },
    h2: {
      color: "blue",
    },
    bold_text: {
      color: "yellow",
    },
  };

  const targetNum = 5;

  const counterProps = {
    c: 3,
    d: 4,
    e: 5,
    initialValue: 100,
  };

  return (
    // <React.Fragment>
    //   <MyHeader/>
    //   <header className="App-header">
    //     <h2>hello {name}</h2>
    //   </header>
    //   <MyFooter />
    // </React.Fragment>

    // CSS 파일로 스타일 지정하기
    // <div className='App'>
    //   <MyHeader/>
    //   <header className="App-header">
    //     <h2>hello {name}</h2>
    //   </header>
    //   <MyFooter />
    // </div>

    // CSS 지정하기
    // <div style={customStyle.App}>
    //   <MyHeader/>
    //   <header style={customStyle.h2}>
    //     <h2>hello {name} </h2>
    //     <b style={customStyle.bold_text}>
    //       {targetNum}은 : {targetNum % 2 === 0 ? "짝수": "홀수"}
    //     </b>
    //   </header>
    //   <MyFooter />
    // </div>

    // State 알기
    // <div className='App'>
    //   <MyHeader/>
    //   <header className="App-header">
    //     <h2>hello {name}</h2>
    //     <Counter />
    //   </header>
    //   <MyFooter />
    // </div>

    // Props 알기
    <div className='App'>
      <MyHeader/>
      <header className="App-header">
        <h2>hello {name}</h2>
        <Counter a={1} b={33} initialValue = {5}/>
        <Counter {...counterProps} />  
      </header>
      <MyFooter />
    </div>
  );
}

export default App;
