import { useRef } from "react";
import { useEffect, useState, useContext } from "react";
import getBase64 from "../../../Functions/getBase64";
import BackContext from "../BackContext";

function Edit() {
  const { modalService, setEditService, setModalService } =
    useContext(BackContext);

  const [title, setTitle] = useState("");
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
 
  const fileInput = useRef();
  const [servicePhoto, setServicePhoto] = useState(null);
  

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setServicePhoto(photo))
      .catch((_) => {
       
      });
  };

  useEffect(() => {
    if (null === modalService) {
      return;
    }

    setTitle(modalService.title);
    setCity(modalService.city);
    setAddress(modalService.address);
    
  }, [modalService]);

  const handleEdit = () => {
  

    const data = {
      title,
      id: modalService.id,
      city,
      address,
      photo: servicePhoto
      
    };
console.log('data', data)
    setEditService(data);
    setModalService(null);
  };

  if (null === modalService) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-header">
        <h2 className="modal-title">Redaguoti knygos informaciją</h2>
        <button
          type="button"
          className="close"
          onClick={() => setModalService(null)}
        >x</button>
      </div>
      <div className="form modal-body">
        <div className="form-row">
          <label>Title:</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
       
        </div>
        <div className="form-row">
          <label>City:</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>
        <div className="form-row">
          <label>Address:</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        
      
      <div className="form-row">
        <label>Service Logo</label>
        <input
          ref={fileInput}
          type="file"
          className="input"
          onChange={doPhoto}
        />
      </div>
      <div>
        {servicePhoto ? (
          <div className="book-cover">
            <img src={servicePhoto} alt="nice" />
          </div>
        ) : null}
      </div>
      

      <div className="buttons">
        <button
          type="button"
          className="btn btn2"
          onClick={() => setModalService(null)}
        >
          Close
        </button>
        <button type="button" className="btn btn3" onClick={handleEdit}>
          Save changes
        </button>
      </div>
    </div>
    
    
  );
}

export default Edit;
