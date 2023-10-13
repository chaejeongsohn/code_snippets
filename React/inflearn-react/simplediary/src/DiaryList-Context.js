import { useContext } from "react"
import DiaryItem from "./DiaryItem-Context"
import { DiaryStateContext } from "./App-useReducer,Context"

// Context 2단계. Context사용
// const DiaryList = ({onEdit, onRemove, diaryList}) => {   // 기존 코드
const DiaryList = () => {   // 변경 코드
    const diaryList = useContext(DiaryStateContext)

    return(
        <div className="DiaryList">
            <h2>일기 목록</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it, idx)=>(
                    <DiaryItem key={it.id} {...it}
                    // onEdit={onEdit}      // 기존 코드
                    // onRemove= {onRemove}
                    // Context) Context사용하니까 이렇게 값 전달 안해도 됨
                    />
                ))}
            </div>
        </div>
    )
}
DiaryList.defaultProps = {
    diaryList : []
}

export default DiaryList