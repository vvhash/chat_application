import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useReset from '../../hooks/useReset';
import useNewPassword from '../../hooks/useNewPassword';

const Reset = () => {
    const [inputs, setInputs] = useState({
        username: "",
        key: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [emailSent, setEmailSent] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    const { loading: resetLoading, reset } = useReset(setEmailSent);
    const { loading: newPasswordLoading, resetPassword } = useNewPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailSent) {
            const success = await resetPassword(inputs);
            if (success) setResetSuccess(true);
        } else {
            await reset(inputs);
        }
    };

    if (resetSuccess) {
        return (
            <div className='flex flex-col items-center justify-center min-w-50 mx-auto'>
                <div className='w-128 h-128 p-6 bg-red-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-40 border border-gray-100'>
                    <h1 className='text-3xl font-semibold text-center text-gray-300'>
                        Password Reset Successfully!
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-50 mx-auto'>
            <div className='w-128 h-128 p-6 bg-red-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-40 border border-gray-100'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Reset 
                    <span className='text-blue-500'> Password</span>
                </h1>
                {emailSent ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='label p-2 '>
                                <span className='text-base label-text'>Enter your key</span>
                            </label>
                            <input 
                                type='text' 
                                placeholder='Key' 
                                className='w-full input input-bordered h-10' 
                                value={inputs.key}
                                onChange={(e) => setInputs({ ...inputs, key: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className='label p-2 '>
                                <span className='text-base label-text'>New Password</span>
                            </label>
                            <input 
                                type='password' 
                                placeholder='New Password' 
                                className='w-full input input-bordered h-10' 
                                value={inputs.newPassword}
                                onChange={(e) => setInputs({ ...inputs, newPassword: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className='label p-2 '>
                                <span className='text-base label-text'>Confirm Password</span>
                            </label>
                            <input 
                                type='password' 
                                placeholder='Confirm Password' 
                                className='w-full input input-bordered h-10' 
                                value={inputs.confirmPassword}
                                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                            />
                        </div>
                        <button className='btn btn-block btn-sm mt-2' disabled={newPasswordLoading}>
                            Reset Password
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='label p-2 '>
                                <span className='text-base label-text'>Username</span>
                            </label>
                            <input 
                                type='text' 
                                placeholder='Email' 
                                className='w-full input input-bordered h-10' 
                                value={inputs.username}
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                            />
                        </div>
                        <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                            Remember password? Login here.
                        </Link>
                        <button className='btn btn-block btn-sm mt-2' disabled={resetLoading}>
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Reset;
