

import FrontContext from "./FrontContext";
import FrontNav from "./Nav";
import axios from "axios";
import { useEffect, useState } from "react"
import MastersList from "./List";
import SortFilter from "./Sort";




function Front() {

  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [masters, setMasters] = useState(null);

  const [rateNow, setRateNow] = useState(null);


//READ Masters
useEffect(() => {
  axios.get('http://localhost:3003/masters')
      .then(res => setMasters(res.data));
}, [lastUpdate]);

 // Rate Create
  useEffect(() => {
    if (null === rateNow) return;
    axios
      .put("http://localhost:3003/masters/" + rateNow.id, rateNow)
      .then((_) => {
        setLastUpdate(Date.now());
      });
  }, [rateNow]);

  return (
    <FrontContext.Provider
      value={{
        masters,
        setRateNow,
        setMasters
       
       

      }}
    >
      
                    
                    <FrontNav />
      <div className="container">
        
      <div className="row">
      <SortFilter/>
        <MastersList/>
         
        </div>
        <div className="row">
          
        </div>
      </div>
                    
                   
            
                   
      
    </FrontContext.Provider>
  );
}

export default Front;

