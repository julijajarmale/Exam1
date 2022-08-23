import { useContext, useState } from "react";
import FrontContext from "./FrontContext";

function Master({ master }) {

  

  return (
    <li className="book-list-item">
      <div className="content">
        <div className="book-item">
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
      </div>

     

             
    
    </li>
  );
}

export default Master;
