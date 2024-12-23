import { useMemo, useEffect, useRef, useState, useCallback } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import OptimizeTest from './OptimizeTest';
// import LifeCycle from './Lifecycle';

// https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  // api 호출하기
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    console.log(`getData!!!!!!!!!`);
    getData();
  }, []);

  // 최적화 - useMemo(calculateValue, dependencies)
  // React Hook / 함수 호출 결과를 캐시함
  // 매번 렌더링될 필요가 없는 함수는 useMemo로 관리
  // - calculateValue : 캐시하려는 값을 계산 하는 함수
  // - dependencies : 반응값의 목록
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data]);
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  // 최적화 - useCallback(fn, dependencies)
  // React Hook / 함수 자체를 캐시함
  // 불필요한 여러번의 랜더링 방지, 콜백의 의존성이 변경되었을때만 변경됨
  // - fn : 캐시하려는 함수
  // - dependencies : 반응값의 목록 / 해당 값이 변하면 fn이 실행된다
  const onCreate = useCallback((author, content, emotion) => {
    console.log(`onCreate 실행`);
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
    // useCallback) state에 함수를 전달 (= 함수형 업데이트)
    // data는 계속 갱신되고, fn은 갱신시킬 필요가 없기 때문에
    // dependencies는 빈 배열이지만, fn 내부의 setData를 함수형 업데이트로 변환함
  }, []);
  const onEdit = useCallback((targetId, newContent) => {
    console.log(`onEdit 실행`);
    // setData(
    //   data.map((it)=>
    //     it.id === targetId ? {...it, content: newContent } : it)
    //)

    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
    // useCallback) state에 함수를 전달 (= 함수형 업데이트)
  }, []);
  const onRemove = useCallback((targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    // const newDiaryList = data.filter((it) => it.id !== targetId); // targetId만 빼고 새로운 list 생성
    // setData(newDiaryList);

    setData((data) => data.filter((it) => it.id !== targetId));
    // useCallback) state에 함수를 전달 (= 함수형 업데이트)
  }, []);

  return (
    <div className="App">
      {/* 최적화 - React.memo */} {/* <OptimizeTest></OptimizeTest> */}
      {/* useEffect 사용 */} {/* <LifeCycle /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>점수 높은 일기 개수 : {goodCount}</div>
      <div>점수 낮은 일기 개수 : {badCount}</div>
      <div>점수 높은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
