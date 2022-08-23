import "./Layout.scss";
import "./crud.scss";
import "./App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
import Front from "./Components/Front/Front";
import Back from "./Components/Back/Back";
import { useEffect, useState } from "react";
import { login, logout, authConfig,} from "./Functions/auth";
import axios from "axios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth role="user"><Front/></RequireAuth>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<RequireAuth role="admin"><Back show="admin" /></RequireAuth>} />
        <Route path="/admin/books" element={<RequireAuth role="admin"><Back show="books" /></RequireAuth>
          }
        />
       
      </Routes>
    </BrowserRouter>
  );
}

function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios
      .get("http://localhost:3003/login-check?role=" + role, authConfig())
      .then((res) => {
        if ("ok" === res.data.msg) {
          setView(children);
        } else {
          setView(<Navigate to="/login" replace />);
        }
      });
  }, [children, role]);

  return view;
}

function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const doLogin = () => {
    axios.post("http://localhost:3003/login", { user, pass }).then((res) => {
      console.log(res.data);
      if ("ok" === res.data.msg) {
        login(res.data.key);
        navigate("/", { replace: true });
      }
    });
  };
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-12 login-form">
          <h2>Welcome to Autoservice App</h2>
          <div className="login">
            <div>
              Name:{" "}
              <input
                className="input"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              ></input>
            </div>
            <div>
              Password:{" "}
              <input
                className="input"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              ></input>
            </div>
            <button className="btn buttons" onClick={doLogin}>
              Log in
            </button>
            <small>name: admin, password: 123</small>
            <br></br>
            <small>name: user, password: 123</small>
          </div>
          <div className='main-link'>
          <Link
          to='/register'
          className='link'>
          Create Account
        </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

//////////////////REGISTER PAGE////////////
function RegisterPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');

  const doRegister = () => {
    axios.post("http://localhost:3003/register", { user, email, pass }).then((res) => {
      
      if ("ok" === res.data.msg) {
        login(res.data.key);
        navigate("/", { replace: true });
      }
    });
  };
  return (
    <>
      <div className="container login-container">
      <div className="row">
        <div className="col-12 login-form">
        <h2 className='heading'>CREATE ACCOUNT</h2>
        <div>
              Name:{" "}
              <input
                className="input"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              ></input>
            </div>
        <div>
          Email:{' '}
          <input
          className="input"
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          Password:
          <input
          className="input"
            type='password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <button
        className="btn buttons"
          onClick={doRegister}>
          Register
        </button>
        <div className='main-link'>
        <Link 
          to='/login'
          className='link'>
          Login
        </Link>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}


function LogoutPage() {
  useEffect(() => logout(), []);
  return <Navigate to="/login" replace />;
}







export default App;
