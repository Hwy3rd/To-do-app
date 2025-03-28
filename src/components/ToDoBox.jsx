import "../assets/ToDoBox.css";

const limitCharacters = (text, charLimit) => {
  if (!text) return "";
  if (text.length <= charLimit) {
    return text;
  }
  return text.substring(0, charLimit) + "...";
};

export default function ToDoBox(props) {
  const onDeleteClick = (e) => {
    e.stopPropagation();
    props.handleDelete(props.id);
  };

  const titleLimited = limitCharacters(props.title, 23);
  const descriptionLimited = limitCharacters(props.description, 55);

  return (
    <div className="to-do-box">
      <button id="delete-btn" onClick={onDeleteClick}>
        X
      </button>
      <h3 id="title" className="text">
        {titleLimited}
      </h3>
      <p id="description" className="text">
        {descriptionLimited}
      </p>
      <p id="publishTime" className="text">
        Created: {props.publishTime}
      </p>
    </div>
  );
}
