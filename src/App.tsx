import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

type Todo = {
  inputValue: string;
  id: string;
  checked: boolean;
};

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodoTxt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todo.trim() !== "") {
      const newTodo: Todo = {
        inputValue: todo,
        id: uuidv4(),
        checked: false,
      };
      setTodoList([...todoList, newTodo]);
      setTodo("");
    }
  };
  const compTodo = (todoId: string, todoChecked: boolean) => {
    const updateTodo = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, checked: !todoChecked };
      }
      return todo;
    });
    setTodoList(updateTodo);
  };

  const delTodo = (todoId: string) => {
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
            <li key={todo.id} id={todo.id}>
              <span
                style={{
                  textDecoration: todo.checked ? "line-through" : "none",
                }}
              >
                {todo.inputValue}
              </span>
              <input type="checkbox" onClick={() => compTodo(todo.id, todo.checked)} />
              完了
              <input type="button" onClick={() => delTodo(todo.id)} />
              削除
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
