import { useContext } from "react";
import BackContext from "../BackContext";


function Master({ master }) {
  const { setDeleteMaster, setModalMaster } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteMaster(master);
  };

  const handleEdit = () => {
    setModalMaster(master);
  };

  return (
    <li className="book-list-item">
      <div className="content">
        <div className="book-item">
          {master.photo ? (
            <div className="master-cover">
              <img src={master.photo} alt={master.title} />
            </div>
          ) : null}
        </div>
        <b className="book-item">{master.name} {master.surname}  </b>
        <span className="book-item">
          {master.city}
        </span>
        <span className="book-item">
          {master.spec}
        </span>
        <span className="book-item">
          {master.service}
        </span>
    
      </div>

      <div className="buttons">
        <button type="button" className="buttons btn2" onClick={handleEdit}>
          Edit
        </button>
        <button type="button" className="buttons btn3" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default Master;
