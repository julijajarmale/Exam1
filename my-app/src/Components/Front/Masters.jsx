import { useContext, useState } from "react";
import FrontContext from "./FrontContext";

function Master({ master }) {

  const { setRateNow} = useContext(FrontContext);

  const [rate, setRate] = useState(0);

  const rateIt = (e) => {
    setRate(e.target.value);
    setRateNow({
      rate: parseInt(e.target.value),
      id: master.id,
    });
  };

  return (
    <li className="book-list-item">

      <div className="content">
        <div className="author-pic">
          {master.photo ? (
            <div className="book-cover">
              <img src={master.photo} alt={master.name} />
            </div>
          ) : null}
        </div>
        <b className="book-item">{master.name} {master.surname}</b>
        <span className="book-item">
          {master.spec} 
        </span>
        <b className="book-item"
         style={{color: "#fc894d"}}>
          SERVICE: {master.service}
        </b>
        <span className="book-item">
          {master.city} 
        </span>
        <b
          className="item">
          
            RATE MASTER:
        <select value={rate} onChange={rateIt}>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={10 - i}>
                {10 - i} *
              </option>
            ))}
          </select>
         
          </b>
       
          Your rate:
          {master.rate ? Number(rate).toFixed(2) : '0.00'}
          <div className="item">
        {master.rate_sum
          ? "Total rate: " + (master.rate_sum / master.rate).toFixed(2)
          : "No rates yet"}
      </div>
          
          
      
      </div>

     

             
    
    </li>
  );
}

export default Master;
