import { useContext } from "react";
import FrontContext from "./FrontContext";
import Master from "./Masters";




function MastersList() {
  const { masters } = useContext(FrontContext);

  return (
   
        <div className="col-12 ">
  
          <h2>FIND YOUR BEST MASTER</h2>
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
     
  );
}

export default MastersList;
