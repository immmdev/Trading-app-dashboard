import { useState } from "react";
import { Link } from 'react-router-dom';
import { useLogin } from "../hooks/useLogin";

const LoginPage=() => {
  const [username, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (

      <div className=" w-100 h-100 container-fluid d-flex justify-content-center m-0  row  rounded overflow-hidden w-75 " style={{ maxWidth: "900px", minHeight: "500px" }}>

        {/* Left Section */}
        <div className="col-md-6 p-0">
          <div className="d-flex flex-column justify-content-center align-items-center text-white p-4" style={{ backgroundColor: "#1c2f51", borderRadius:"10px",borderTopRightRadius:"10px"  }}>
            <h2 className="fw-bold mb-3">Welcome Back</h2>
            <p className="text-center">Access your dashboard, view your portfolio, and manage your investments in one place.</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6 bg-white p-5">
          <h3 className="fw-bold mb-3" style={{ color: "#387ed1" }}>Login</h3>
          <p className="text-muted mb-4">Enter your credentials to access your account.</p>

          <form onSubmit={handleSubmit}>
            <input type="text" className="form-control mb-3" placeholder="Username" onChange={e => setuserName(e.target.value)} />
            <input type="password" className="form-control mb-4" placeholder="Password" onChange={e => setPassword(e.target.value)} />

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label className="form-check-label" htmlFor="remember">Remember me</label>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ backgroundColor: "#387ed1" }}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <p  className="text-center mt-4">
            Don't have an account? <Link to='/signup' style={{textDecoration:"none"}}>Sign Up</Link>
          </p>
        </div>
      </div>
  );
};

export default LoginPage;
