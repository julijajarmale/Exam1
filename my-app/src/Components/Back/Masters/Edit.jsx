import { useRef } from "react";
import { useEffect, useState, useContext } from "react";
import getBase64 from "../../../Functions/getBase64";
import BackContext from "../BackContext";

function Edit() {
  const { modalMaster, setEditMaster, setModalMaster, services } =
    useContext(BackContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [spec, setSpec] = useState("");
  const [city, setCity] = useState('');
  const [service, setService] = useState('');
 
  const fileInput = useRef();
  const [masterPhoto, setMasterPhoto] = useState(null);
  

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setMasterPhoto(photo))
      .catch((_) => {
       
      });
  };

  useEffect(() => {
    if (null === modalMaster) {
      return;
    }

    setName(modalMaster.name);
    setSurname(modalMaster.surname);
    setCity(modalMaster.city);
    setSpec(modalMaster.spec);
    setService(modalMaster.service);
    
  }, [modalMaster]);

  const handleEdit = () => {
  

    const data = {
      name,
      surname,
      id: modalMaster.id,
      city,
      spec,
      photo: masterPhoto,
      service: parseInt(service),
      
    };
console.log('data', data)
    setEditMaster(data);
    setModalMaster(null);
  };

  if (null === modalMaster) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-header">
        <h2 className="modal-title">Edit Master information</h2>
        <button
          type="button"
          className="close"
          onClick={() => setModalMaster(null)}
        >x</button>
      </div>
      <div className="form modal-body">
        <div className="form-row">
          <label>Name:</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="form-row">
          <label>Surname:</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
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
          <label>Specialization:</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setSpec(e.target.value)}
            value={spec}
          />
        </div>
        
        <div className="form-row">
          <label>Select Municipality</label>
          <select
            className="input"
            onChange={(e) => setService(e.target.value)}
            value={service}
          >
            <option value="0">Select Author</option>
            {services
              ? services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title} 
                  </option>
                ))
              : null}
          </select>
        </div>
      <div className="form-row">
        <label>Master profile picture</label>
        <input
          ref={fileInput}
          type="file"
          className="input"
          onChange={doPhoto}
        />
      </div>
      <div>
        {masterPhoto ? (
          <div className="book-cover">
            <img src={masterPhoto} alt="nice" />
          </div>
        ) : null}
      </div>
      

      <div className="buttons">
        <button
          type="button"
          className="btn btn2"
          onClick={() => setModalMaster(null)}
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
