import { useContext,  useState } from "react";
import setDateFormat from "../../../Functions/setDateFormat";
import BackContext from "../BackContext";

function User({ user }) {
  const { setDeleteUser, setApproveUser,} = useContext(BackContext);

  

  const handleDelete = () => {
    setDeleteUser(user);
  };

  const handleApprove = () => {
    const data = { ...user, approved: 1 };
    setApproveUser(data);
  };

  const handleDissaprove = () => {
    const data = { ...user, approved: 0 };
    setApproveUser(data);
  };

  

  return (
    <li className="admin-list-item">
      <div className="content">
        <b className="admin-item">{user.name}</b>
        <i className="admin-item">{user.email}</i>
        
      
        <span
          className="item"
          style={{ color: user.approved ? "green" : "red" }}
        >
          {user.approved ? "Approved" : "Not approved"}
        </span>
      </div>

      <div className="buttons">
        <button type="button" className="button btn5" onClick={handleApprove}>
          APPROVE
        </button>
        <button
          type="button"
          className="button btn2"
          onClick={handleDissaprove}
        >
          DISAPPROVE 
        </button>
    
        <button type="button" className="button btn3" onClick={handleDelete}>
          DELETE
        </button>
      </div>
    </li>
  );
}

export default User;