import { useContext } from "react";
import BackContext from "../BackContext";
import User from "./User";

function List() {
  const { users} = useContext(BackContext);

  return (
    <div className="container list-container">
      <div className="row">
        <div className="col-12 list-form">
          <h2>New User List</h2>
          <div className="list-group">
            <ul className="list-group-item">
              {users
                ? users.map((user) => (
                    <User key={user.id} user={user}></User>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;