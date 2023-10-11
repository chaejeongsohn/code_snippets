import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import LifeCycle from './Lifecycle';

// const dummyList = [
//   {
//     id:1,
//     author:"dd",
//     content:"hello!",
//     emotion:5,
//     created_date: new Date().getTime()
//   },
//   {
//     id:2,
//     author:"dfa",
//     content:"nooooo!",
//     emotion:1,
//     created_date: new Date().getTime()
//   },
//   {
//     id:3,
//     author:"ttt",
//     content:"good!",
//     emotion:3,
//     created_date: new Date().getTime()
//   },
//   {
//     id:4,
//     author:"he",
//     content:"game!",
//     emotion:4,
//     created_date: new Date().getTime()
//   },
// ]

function App() {

  const [data, setData] = useState([]);
  const dataId = useRef(0)

  const onCreate = (author, content, emotion)=>{
    const created_date = new Date().getTime();
    const newItem = {
      author, content, emotion, created_date, id: dataId.current
    }
    dataId.current+=1;
    setData([newItem, ...data])
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it)=>
        it.id === targetId ? {...it, content: newContent } : it)
    )
  }

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    // 변경된 데이터로 새로고침하기
    // targetId만 빼고 새로운 list 생성
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  return (
    <div className='App'>
        <LifeCycle />
        <DiaryEditor onCreate={onCreate}/>
        <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
    </div>
  );
}

export default App;
