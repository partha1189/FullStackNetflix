import { useContext, useState } from "react";
import { loginCall } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({email, password}, dispatch);
  }

  return (
    <div className="login">
      <form className="loginForm">
        <input
          type="text"
          placeholder="Email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" onClick={handleSubmit} disabled={isFetching}>Login</button>
      </form>
    </div>
  );
};

export default Login;
