import { useContext } from "react";
import BackContext from "../BackContext";
import Service from "./Service";


function ServiceList() {
  const { services } = useContext(BackContext);

  return (
    <div className="container book-list-container">
      <div className="row">
        <div className="col-12">
          <h2>Service list</h2>
          <div className="book-list-group">
          <ul className="book-list">
            {services
              ? services.map((service) => (
                  <Service key={service.id} service={service}></Service>
                ))
              : null}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceList;
