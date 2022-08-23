import { useContext, useRef } from "react";
import { useState } from "react";
import getBase64 from "../../../Functions/getBase64";
import BackContext from "../BackContext";

function Create() {
  const { setCreateService} = useContext(BackContext);

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
 
 
  const fileInput = useRef();
  const [servicePhoto, setServicePhoto] = useState(null);
 
  
  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setServicePhoto(photo))
      .catch((_) => {
        // tylim
      });
  };
  const handleCreate = () => {
    const data = {
      title,
      city,
      address,
      photo: servicePhoto,
      
    };
    setCreateService(data);
    setTitle("");
    setCity("");
    setAddress("");
    setServicePhoto(null);
    fileInput.current.value = null;
    
  };

  return (
    <div className="container books-container">
      <div className="row">
        <div className="col-4 ml-1">
          <form className="form">
            <h2>New Service</h2>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Service title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
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
                placeholder="Address"
                className="input"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
           

            

            <div className="form-row">
              <label>
                Upload Cover Picture
              </label>
              <input
                ref={fileInput}
                type="file"
                className="input"
                onChange={doPhoto}
                
              />
            </div>
            {servicePhoto ? (
              <div className="photo-bin">
                <img src={servicePhoto} alt="nice" />
              </div>
            ) : null}
            
            <button type="button" className="btn" onClick={handleCreate}>
              Add new service
            </button>
          </form>
        </div>
       
      </div>
    </div>
  );
}

export default Create;
