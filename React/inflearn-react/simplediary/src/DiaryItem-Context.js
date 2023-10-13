import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App-useReducer,Context";

// Context 2단계. Context사용
// const DiaryItem = ({onEdit, onRemove, id, author, content, emotion, created_date}) => {    // 기존 코드
const DiaryItem = ({id, author, content, emotion, created_date}) => {    // 변경 코드
    const {onEdit, onRemove} = useContext(DiaryDispatchContext);
    // Context) DiaryDispatchContext는 객체로 값이 전달되기 때문에,
    //          {onEdit}처럼 비구조화 할당으로 값을 받아야한다.

    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit)
    const [localContent, setLocalContent] = useState(content)
    const localContentInput = useRef();

    useEffect(() => {
        console.log(`${id}번째 아이템 렌더링`)
    })

    const handleRemove = () => {
        if (window.confirm(`${id}번 일기를 정말 삭제하겠습니까?`)){
            onRemove(id)
        }
    }

    const handelQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }

    const handleEdit = ()=>{
        if(localContent.length < 5){
            localContentInput.current.focus();
            return;
        }
        if(window.confirm(`${id}번 일기를 수정하시겠습니까?`)){
            onEdit(id, localContent);
            toggleIsEdit();
        }
        
    }

    return (
        <div className="DiaryItem">
            <div className="info">
                <span>작성자 : {author} | 오늘의 점수 :  {emotion}</span>
                <br></br>
                <span className="date">{new Date(created_date).toLocaleString()}</span>
            </div>
            <div className="content">
                {isEdit ? (
                <>
                    <textarea
                        ref={localContentInput}
                        value={localContent}
                        onChange={(e)=>setLocalContent(e.target.value)}
                        />
                </>
                ) : (
                    <>{content}</>
                )}
            </div>

            {isEdit ? (
                <>
                    <button onClick={handelQuitEdit}>수정 취소</button>
                    <button onClick={handleEdit}>수정 완료</button>               
                </>
            ):(
                <>
                    <button onClick={handleRemove}>삭제하기</button>
                    <button onClick={toggleIsEdit}>수정하기</button>
                </>
            )}

        </div>
    );
};

export default React.memo(DiaryItem);