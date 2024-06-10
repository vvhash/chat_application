import React from 'react'
import { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState(new Array(6).fill("")); // Array to hold each digit
    const inputsRef = useRef([]); // Refs for input elements
	const correctCode = "000000"; // Define the correct code for comparison
	const [error, setError] = useState(""); // State for storing error message


	const { loading, login, showPopup, handlePopupClose, mfaCode } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	const handleCodeInput = (value, index) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        setError(""); // Clear error message when user starts typing

        // Move focus to next input if there is a next input and the current one is filled
        if (index < 5 && value) {
            inputsRef.current[index + 1].focus();
        }
    };

	const handleVerify = () => {
		//console.log("Attempting to verify code. Expected:", mfaCode, "Entered:", code.join(""));
		if (code.join("") === mfaCode.toString()) {
			handlePopupClose(); // If correct, close the popup
		} else {
			setError("Invalid code");
			setCode(new Array(6).fill("")); // Clear the inputs on error
		}
	};


	return (
        <div className="relative min-w-50 mx-auto">
            <div className={`${showPopup ? 'blur-sm' : ''}`}>
                <div className='w-128 h-128 p-6 bg-red-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-40 border border-gray-100'>
                    <h1 className='text-3xl font-semibold text-center text-gray-300'>
                        Login<span className='text-blue-500'> ChatApp</span>
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='label p-2'>
                                <span className='text-base label-text'>Username</span>
                            </label>
                            <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' 
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div>
                            <label className='label'>
                                <span className='text-base label-text'>Password</span>
                            </label>
                            <input type='password' placeholder='Enter Password' className='w-full input input-bordered h-10'
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Link to={'/signup'} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                            {"Don't"} have an account?
                        </Link>
                        <Link to={'/reset'} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                            {"Forgot"} Password?
                        </Link>
                        <div>
                            <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                                {loading ? <span className='loading loading-spinner'></span> : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showPopup && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='w-144 h-144 p-8 bg-red-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 border border-gray-100'>
                        <h1>Enter the 6 digit code</h1>
                        <div className='flex justify-center space-x-2'>
                            {code.map((value, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    className="w-8 h-8 text-center form-control m-2"
                                    maxLength="1"
                                    value={value}
                                    ref={el => inputsRef.current[idx] = el}
                                    onChange={e => handleCodeInput(e.target.value, idx)}
                                    style={{ maxWidth: "40px" }}
                                />
                            ))}
                        </div>
                        {error && <div className="text-blue-500 text-center mt-2">{error}</div>}
                        <div className="flex justify-center mt-4">
                            <button onClick={handleVerify} className='btn' disabled={code.join("").length !== 6}>
                                Verify
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;