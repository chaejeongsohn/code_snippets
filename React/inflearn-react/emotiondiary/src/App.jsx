import { useState } from 'react'
import './App.css'
import {BrowserRouter, createBrowerRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

function App() {

  return (
    <BrowserRouter>
    <div className='App'>
      <h2>App.js</h2>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
