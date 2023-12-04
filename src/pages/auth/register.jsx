import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/apiCalls/authApiCall';
import Input from '../../components/form/Input';

function Register() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const toPage = location.state?.path || "/";
  const handelLogin =  (e) => {
    e.preventDefault()
    dispatch(registerUser({firstName, lastName, email, password})).then(e => {
      if (e === true) {
        navigate(toPage)
      }
    });
  }

  return (
    <div>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-purple-700">Register</h1>
            <form className="space-y-4" onSubmit={handelLogin}>
                <Input label="First Name" type="text" className="col-span-2" placeholder={'First name'} setData={setFirstName}/>
                <Input label="Last Name" type="text" className="col-span-2" placeholder={'Last name'} setData={setLastName}/>
                <Input label="Email" type="email" className="col-span-2" placeholder={'Email'} setData={setEmail}/>
                <Input label="Password" type="password" className="col-span-2" placeholder={'Password'} setData={setPassword}/>
                <div className='flex justify-center py-2'>
                    <button className='btn btn-primary w-full min-w-xs'>Register</button>
                </div>
                <Link to="/login" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Login ?</Link>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Register