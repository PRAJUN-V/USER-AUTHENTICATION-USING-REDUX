import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { signupUser } from '../features/auth/authActions';

const Add_user = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        username: '',
        email: '',
        password: ''

    });

    const handleChange = (event) =>{
        const {name,value} = event.target;
        setFormData((prevFormData) =>({
            ...prevFormData,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signupUser(formData))
          .then(() => {
            navigate('/dashboard');
          });
      };

  return (
    <div>
     <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
           
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      
    </div>
  )
}

export default Add_user
