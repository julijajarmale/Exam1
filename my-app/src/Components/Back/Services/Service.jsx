import { useContext } from "react";
import BackContext from "../BackContext";


function Service({ service }) {
  const { setDeleteService, setModalService } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteService(service);
  };

  const handleEdit = () => {
    setModalService(service);
  };

  return (
    <li className="book-list-item">
      <div className="content">
        <div className="book-item">
          {service.photo ? (
            <div className="book-cover">
              <img src={service.photo} alt={service.title} />
            </div>
          ) : null}
        </div>
        <b className="book-item">{service.title}</b>
        <span className="book-item">
          {service.city}
        </span>
        <span className="book-item">
          {service.address}
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

export default Service;
