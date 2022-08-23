

import FrontContext from "./FrontContext";
import FrontNav from "./Nav";
import axios from "axios";
import { useEffect, useState } from "react"
import MastersList from "./List";




function Front() {

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [masters, setMasters] = useState(null);

//READ Masters
useEffect(() => {
  axios.get('http://localhost:3003/masters')
      .then(res => setMasters(res.data));
}, [lastUpdate]);

  return (
    <FrontContext.Provider
      value={{
        masters,
       
       

      }}
    >
      
                    
                    <FrontNav />
      <div className="container">
      <div className="row">
        <MastersList/>
         
        </div>
        <div className="row">
          
        </div>
      </div>
                    
                   
            
                   
      
    </FrontContext.Provider>
  );
}

export default Front;

