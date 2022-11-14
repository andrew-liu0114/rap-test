import "./index.scss";

const TodoItem = ({
  todo,
  id,
  onDelete,
  onEdit,
}: {
  todo: string;
  id: string;
  onDelete: any;
  onEdit: any;
}) => {
  return (
    <div className="todo--item">
      <p className="todo--item__title">{todo}</p>
      <div className="todo--tiem__btn--wrapper">
        <button onClick={() => onEdit(id)} className="todo--item__button">
          <img
            src='data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"%3E%3Cpath fill="teal" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83z"%2F%3E%3C%2Fsvg%3E'
            alt="edit"
          />
        </button>
        <button onClick={() => onDelete(id)} className="todo--item__button">
          <img
            src='data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"%3E%3Cpath fill="%23ff4e47" d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"%2F%3E%3C%2Fsvg%3E'
            alt="delete"
          />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
