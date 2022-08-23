import { useContext, useRef } from "react";
import { useState } from "react";
import getBase64 from "../../../Functions/getBase64";
import BackContext from "../BackContext";

function Create() {
  const { setCreateMaster, services} = useContext(BackContext);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [spec, setSpec] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
 
 
  const fileInput = useRef();
  const [masterPhoto, setMasterPhoto] = useState(null);
 
  
  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setMasterPhoto(photo))
      .catch((_) => {
        // tylim
      });
  };
  const handleCreate = () => {
    const data = {
      name,
      surname,
      spec,
      city,
      service: parseInt(service),
      photo: masterPhoto,
      
    };
    setCreateMaster(data);
    setName("");
    setSurname("");
    setCity("");
    setSpec("");
    
    setMasterPhoto(null);
    fileInput.current.value = null;
    
  };

  return (
    <div className="container books-container">
      <div className="row">
        <div className="col-4 ml-1">
          <form className="form">
            <h2>New Master</h2>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Master Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Master Surname"
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="City"
                className="input"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder="Specialization"
                className="input"
                onChange={(e) => setSpec(e.target.value)}
                value={spec}
              />
            </div>
           
            <div className="form-row">
              <label>Select Service</label>
              <select
                className="input"
                onChange={(e) => setService(e.target.value)}
                value={service}
              >
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
              <label>
                Upload Profile Picture
              </label>
              <input
                ref={fileInput}
                type="file"
                className="input"
                onChange={doPhoto}
                
              />
            </div>
            {masterPhoto ? (
              <div className="book-cover">
                <img src={masterPhoto} alt="nice" />
              </div>
            ) : null}
            
            <button type="button" className="btn" onClick={handleCreate}>
              Add new Master
            </button>
          </form>
        </div>
       
      </div>
    </div>
  );
}

export default Create;
