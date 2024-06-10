import React from 'react'

const NewPassword = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-50 mx-auto'>
 			<div className='w-128 h-128 p-6 bg-red-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-40 border border-gray-100'>
 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
 					Enter 
 					<span className='text-blue-500'> New Password</span>
 				</h1>
                 <form >
 					<div>
 						<label className='label p-2'>
 							<span className='text-base label-text'>Password</span>
 						</label>
 						{/* <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' 
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						/> */}
                        <input type='text' placeholder='Password' className='w-full input input-bordered h-10' />

                        <label className='label p-2'>
 							<span className='text-base label-text'>Confirm Password</span>
 						</label>
 						{/* <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' 
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						/> */}
                        <input type='text' placeholder='Confirm Password' className='w-full input input-bordered h-10' />

 					</div>

                     <button className='btn btn-block btn-sm mt-2'>
							Reset Password
						</button>


                    </form>
            </div>
    </div>
  )
}

export default NewPassword