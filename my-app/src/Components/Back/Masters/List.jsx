import { useContext } from "react";
import BackContext from "../BackContext";
import Master from "./Master";



function MasterList() {
  const { masters } = useContext(BackContext);

  return (
    <div className="container book-list-container">
      <div className="row">
        <div className="col-12">
          <h2>Master list</h2>
          <div className="book-list-group">
          <ul className="book-list">
            {masters
              ? masters.map((master) => (
                  <Master key={master.id} master={master}></Master>
                ))
              : null}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterList;
