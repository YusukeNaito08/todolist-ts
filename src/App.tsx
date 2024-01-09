import React, { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const addTodoTxt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todo.trim() !== "") {
      const newTodo: Todo = {
        inputValue: todo,
        id: Date.now(),
        checked: false,
      };
      setTodoList([...todoList, newTodo]);
      setTodo("");
    }
  };
  const compTodo = (todoId: number, todoChecked: boolean) => {
    const updateTodo = todoList.map((todo) => {
      if (todo.id === todoId) {
        todo.checked = !todoChecked;
      }
      return todo;
    });
    setTodoList(updateTodo);
  };

  const delTodo = (todoId: number) => {
    const deleteTodo = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(deleteTodo);
  };

  return (
    <div className="App">
      <h2>TodoList -TS</h2>
      <form onSubmit={(e) => addTodoTxt(e)}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} />
        <input type="submit" value="作成" />
      </form>
      <ul>
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.checked ? "line-through" : "none",
                }}
              >
                {todo.inputValue}
              </span>
              <input type="checkbox" onClick={() => compTodo(todo.id, todo.checked)} />
              完了
              <input type="checkbox" onClick={() => delTodo(todo.id)} />
              削除
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
