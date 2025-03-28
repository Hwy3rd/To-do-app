import "../assets/ToDoBox.css";

export default function ToDoBox(props) {
  const onDeleteClick = (e) => {
    e.stopPropagation();
    props.handleDelete(props.id);
  };

  return (
    <div className="to-do-box">
      <button id="delete-btn" onClick={onDeleteClick}>
        X
      </button>
      <h3 id="title" className="text">
        {props.title}
      </h3>
      <p id="description" className="text">
        {props.description}
      </p>
      <p id="publishTime" className="text">
        Created: {props.publishTime}
      </p>
    </div>
  );
}
