import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import uuid from "react-uuid";
import NewItem from "../../components/NewItem";
import TodoItem from "../../components/TodoItem";
import { useDebounce } from "../../hooks";
import { ITodo, IUserInfo } from "../../types";

import "./index.scss";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [searchedTodos, setSearchedTodos] = useState<ITodo[]>([]);
  const [isCreatable, setIsCreatable] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");
  const [userInfo, setUserInfo] = useState<IUserInfo>();

  const data = localStorage.getItem("todos");
  const user = localStorage.getItem("info");

  useEffect(() => {
    (() => {
      if (data) {
        setTodos(() => JSON.parse(data));
        const info = user && JSON.parse(user);
        const { user_username, user_email, user_profile_image, ...rest } = info;
        setUserInfo(() => ({
          name: user_username,
          email: user_email,
          imgUrl: user_profile_image,
        }));
      }
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewItem = () => {
    setIsCreatable((state) => !state);
  };

  const handleAddItem = (todo: string) => {
    if (todo) {
      setIsCreatable(false);
      setTodos((state) => [
        { id: uuid(), content: todo, editable: false },
        ...state,
      ]);
    }
  };

  const handleTodoDelete = (id: string) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(() => filteredTodos);
  };

  const handleTodoEdit = (id: string) => {
    setIsCreatable(false);
    const data = todos.map((todo) =>
      todo.id === id ? { ...todo, editable: true } : todo
    );

    setTodos(() => data);
  };

  const handleEditItem = (todo: string, id: string) => {
    const data = todos.map((t) =>
      t.id === id ? { ...t, content: todo, editable: false } : t
    );
    setTodos(() => data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchString(value);
  };

  const debouncedSearchString = useDebounce(searchString, 500);

  useEffect(() => {
    if (!!debouncedSearchString) {
      setSearchedTodos(
        todos.filter((todo) => todo.content.includes(debouncedSearchString))
      );
    } else {
      setSearchedTodos(todos);
    }
  }, [debouncedSearchString, todos]);

  let navigate = useNavigate();
  const hanldeLogout = () => {
    localStorage.removeItem("info");
    navigate("/login");
  };

  return (
    <div className="home--container">
      <div className="home--container__logout">
        <button onClick={hanldeLogout}>Logout</button>
      </div>
      <div className="home--container__main">
        <h1 className="home--container__main__title">
          <img
            src={userInfo?.imgUrl}
            alt={userInfo?.name}
            className="user--avatar"
          />
          My To-Do List
        </h1>
        <div className="home--container__main__todos">
          <div className="home--container__main__todos__header">
            <div className="search--form">
              <span className="slens">
                <img
                  src='data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"%3E%3Cpath fill="currentColor" fill-rule="evenodd" d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426ZM10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"%2F%3E%3C%2Fsvg%3E'
                  alt="search"
                />
              </span>
              <input id="search" type="text" onChange={handleSearch} />
              <span className="sclose">
                <img
                  src='data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"%3E%3Cpath fill="currentColor" d="M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"%2F%3E%3C%2Fsvg%3E'
                  alt="close"
                />
              </span>
            </div>
            <button onClick={handleNewItem} className="new">
              {!isCreatable ? "New" : "Cancel"}
            </button>
          </div>
          <div className="home--container__main__todos__content">
            {isCreatable && <NewItem onAdd={handleAddItem} />}
            {searchedTodos.map((todo) => (
              <div
                key={todo.id}
                className="home--container__main__todos__content__item"
              >
                {!todo.editable ? (
                  <TodoItem
                    id={todo.id}
                    todo={todo.content}
                    onDelete={handleTodoDelete}
                    onEdit={handleTodoEdit}
                  />
                ) : (
                  <NewItem
                    todo={todo.content}
                    id={todo.id}
                    onAdd={handleEditItem}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
