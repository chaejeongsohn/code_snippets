import { useState } from "react";


const DiaryEditor = () => {
    // 방법 1
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")

    // 방법 2-1
    const [textState, setTextState] = useState({
        author: "",
        content: "",
    })

    // 방법 2-2
    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1,
    })
    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = () => {
        console.log(state)
        alert("저장 성공")
    }

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            {/* 방법 1 */}
            <div>
                <input
                    name="author-input"
                    value={author}
                    onChange={(e)=>{
                        console.log(e.target.name);
                        setAuthor(e.target.value);
                    }} 
                />
            </div>
            <div>
                <textarea 
                    value={content}
                    onChange={(e)=>{
                        setContent(e.target.value);
                    }}
                />
            </div>
            
            {/* 방법 2-1 */}
            <div>
                <input
                    value={textState.author}
                    onChange={(e)=>{
                        setTextState({
                            ...textState,
                            author: e.target.value,
                            // content: textState.content,
                        });
                    }} 
                />
            </div>
            <div>
                <textarea 
                    value={textState.content}
                    onChange={(e)=>{
                        setTextState({
                            ...textState,
                            content: e.target.value,
                        });
                    }}
                />
            </div>

            {/* 방법 2-2 */}
            <div>
                <input
                    name="author"
                    value={state.author}
                    onChange={handleChangeState} 
                />
            </div>
            <div>
                <textarea 
                    name="content"
                    value={state.content}
                    onChange={handleChangeState}
                />
            </div>
            <div>
                <span>오늘의 점수 : </span>
                <select 
                    name="emotion" 
                    value={state.emotion}
                    onChange={handleChangeState}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>save</button>
            </div>
        </div>
    );
};
export default DiaryEditor;