import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);

  // 연습 1: 작업을 추가하는 코드를 생성하고 구현합니다.
  /***
   * handlerSubmit 핸들러는 일반적으로 양식에서 수행되는 기본 작업을 방지하고
   * 입력 필드에 있는 최신 값을 사용하여 새 작업을 추가합니다.
   * 입력이 비어 있지 않고 앞뒤 공백이 없는지 확인하기 위해 사용자 입력의 유효성을 검사합니다.
   */
  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById("todoAdd").value;
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
    } else {
      alert("Enter Valid Task");
    }
    document.getElementById("todoAdd").value = "";
  }

  // 연습 2: 목록에서 완료된 작업을 삭제합니다.
  /***
   * 이제 ID를 기준으로 삭제할 작업을 필터링하고
   * 나머지 작업을 반환하는 필터 메서드를 사용하여 코드를 작성하겠습니다.
   * 할 일 삭제 기능을 추가해야 하는 App.js 파일에 자리 표시자가 추가되었습니다.
   */
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  // 연습 3: 체크박스 및 토글 기능 추가.
  /***
   * 이제 작업 완료를 표시하는 확인란을 추가합니다.
   * map 메서드를 사용하여 작업을 반복하고
   * App.js 내에서 완료로 표시하는 새 함수 인 ToggleComplete 함수를 만듭니다.
   */
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  // 연습 4: 추가된 Todo 작업을 편집하고 제출합니다.
  /***
   * 편집 기능을 구현하려면 다른 상태가 필요합니다.
   * map 기능을 사용하여 할 일 목록의 작업 편집을 제출하는 데 도움이 되는 submitEdit 기능을 App.js에 추가하세요.
   */
  const [todoEditing, setTodoEditing] = useState(null);
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  // 연습 5: useEffect 후크 추가.
  /**
   * useEffect 후크를 애플리케이션에 추가합니다.
   * 이 useEffect 후크는 새 할 일을 로컬 저장소에 저장하는 역할을 합니다.
   * 로컬 저장소에 JSON으로 저장할 수 있는 코드를 추가하세요.
   */
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);

  return (
    <div id="todo-list">
      <h1>To-do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="todoAdd" />
        <button type="submit">Add Todo</button>
      </form>
      {/* 연습 1: 작업을 추가 */}
      {todos.map((todo) => (
        <div className="todo" key={todo.id}>
          <div className="todo-text">
            {/* 연습 3: 체크박스 및 토글 기능 추가) Add checkbox for toggle complete */}
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />

            {/* 연습 4: 추가된 Todo 작업을 편집하고 제출) if it is edit mode, display input box, else display text */}
            {todo.id === todoEditing ? (
              <input type="text" id={todo.id} defaultValue={todo.text} />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>

          <div className="todo-actions">
            {/* 연습 4: 추가된 Todo 작업을 편집하고 제출) if it is edit mode, allow submit edit, else allow edit */}
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}

            {/* 연습 2: 목록에서 완료된 작업을 삭제) insert delete button below this line */}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default App;
