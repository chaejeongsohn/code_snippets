// 학습목표
// 1. 복잡한 상태관리 로직 분리하기 = useReducer(reducer, initialArg, init?)
// 2. 컴포넌트 트리에 데이터 공급하기 = Context
//     https://react.dev/learn/passing-data-deeply-with-context
// 참고) 이전 학습의 주석은 삭제하고 useReducer, 만 담음
import {
  createContext,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor-Context";
import DiaryList from "./DiaryList-Context";

// useReducer) 따로 reducer를 설정해야함
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state]; // 원본 배열(state)에 새로운 값 추가
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

function App() {
  // useState대신 useReducer을 썼다.
  // const [data, setData] = useState([]);  // 기존 코드
  const [data, dispatch] = useReducer(reducer, []); // 변경 코드
  const dataId = useRef(0); // 렌더링 되지 않기때문에 초기값 지정할 때 쓴다.

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

    // setData(initData);  // 기존 코드
    dispatch({ type: "INIT", data: initData }); // 변경 코드
    // useReducer) dispatch를 일으켜서 reducer가 새로운 값을 가질 수 있게함
  };

  useEffect(() => {
    console.log(`getData!!!!!!!!!`);
    getData();
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data]);
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  // useCallback) 특정 함수를 만들지 않고 재사용 하고 싶을 때
  const onCreate = useCallback((author, content, emotion) => {
    console.log(`onCreate 실행`);

    // const created_date = new Date().getTime();    // 기존 코드
    // const newItem = {
    //   author, content, emotion, created_date, id: dataId.current
    // }
    // setData((data) => [newItem, ...data]);
    dispatch({
      // 변경 코드
      type: "CREATE",
      data: {
        author,
        content,
        emotion,
        id: dataId.current,
      },
    });

    dataId.current += 1;
  }, []);
  const onEdit = useCallback((targetId, newContent) => {
    console.log(`onEdit 실행`);

    // setData(     // 기존 코드
    //   (data) =>
    //   data.map((it)=>
    //     it.id === targetId ? {...it, content: newContent } : it)
    // )
    dispatch({ type: "EDIT", targetId, newContent }); // 변경 코드
  }, []);
  const onRemove = useCallback((targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);

    // setData((data) => data.filter((it) => it.id !== targetId));    // 기존 코드
    dispatch({ type: "REMOVE", targetId }); // 변경 코드
  }, []);

  // Context) DiaryDispatchContext의 value 생성
  //    onCreate, onRemove, onEdit가 재생성 되더라도
  //    useMemo를 이용해서 해당 memorizedDispatches컴포넌트는 재생성되지 않도록 한다.
  // useMemo: 특정 결과값을 재사용 할 때 사용함
  const memorizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []); // 재생성되는 일이 없도록 빈 배열로 전달해줌

  return (
    // Context 2단계. Context사용
    // Provider라는 컴포넌트를 사용한다.
    // 컴포넌트이므로 매개변수가 변경되면 다시 랜더링 되기때문에 기능에 따라 분리해줘야 한다.
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memorizedDispatches}>
        <div className="App">
          {/* <DiaryEditor onCreate={onCreate}/>     // 기존 코드*/}
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>점수 높은 일기 개수 : {goodCount}</div>
          <div>점수 낮은 일기 개수 : {badCount}</div>
          <div>점수 높은 일기 비율 : {goodRatio}</div>
          {/* <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>     // 기존 코드*/}
          <DiaryList />
          {/*     // 변경 코드 */}
          {/* Context) DiaryStateContext를 import하고 있으므로, data를 넘겨줄 필요가 없음 */}
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

// Context 1단계. Context 만들기
// 먼저 컨텍스트를 만들어야 합니다. 구성 요소에서 사용할 수 있도록 파일에서 내보내야 합니다
export const DiaryStateContext = createContext();

export const DiaryDispatchContext = createContext();

export default App;
