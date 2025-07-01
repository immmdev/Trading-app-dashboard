import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

function SignupPage() {
    const [name, setName] = useState('');
    const [username, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handleClick = async (e) => {
        e.preventDefault();

        // Optional: Basic form validation
        if (!name || !username || !email || !password) {
            alert("Please fill in all the fields.");
            return;
        }

        await signup(name, username, email, password);
    };

    return (
       <div className=" w-100 h-100 container-fluid d-flex justify-content-center m-0  row  rounded overflow-hidden w-75 " style={{ maxWidth: "900px", minHeight: "500px" }}>

                {/* Left Section */}
                <div className="col-md-6 p-0">
                    <div className="d-flex flex-column justify-content-center align-items-center text-white p-4" style={{ backgroundColor: "#1c2f51", borderRadius: "10px", borderTopRightRadius: "10px" }}>
                         <h2 className="fw-bold mb-3">Welcome</h2>
                        <p className="text-center">Join Zerodha’s ecosystem and start your investment journey today.</p>
                    </div>
                </div>
                

                {/* Right Section - Form */}
                <div className="col-md-6 bg-white p-5">
                    <h3 className="fw-bold mb-3" style={{ color: "#387ed1" }}>Register</h3>
                    <p className="text-muted mb-4">Create your account. It’s free and only takes a minute.</p>

                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control mb-3" placeholder="Name" onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control mb-3" placeholder="Username" onChange={e => setuserName(e.target.value)} />
                        </div>
                    </div>
                    <input type="email" className="form-control mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    <input type="password" className="form-control mb-3" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <button
                        type="submit"
                        onClick={handleClick}
                        className="btn w-100 text-white mb-2"
                        style={{ backgroundColor: "#387ed1" }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register Now"}
                    </button>

                    {error && <div className='alert alert-danger mt-2'>{error}</div>}

                    <p className="text-center mt-4">
                        Already have an account? <Link to='/login'>Login</Link>
                    </p>
                </div>
            </div>
    
    );
}

export default SignupPage;
