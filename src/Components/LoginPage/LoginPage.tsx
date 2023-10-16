import React, { useState, ChangeEvent, FormEvent } from 'react';
import './loginpage.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Userservice from '../Service/Userservice.js';

interface LoginPageProps {
  role: (role: string, data: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ role }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    showLogin: true,
    email: '',
    password: '',
    name: '',
  });

  const toggleForm = () => {
    setFormData((prevState) => ({
      ...prevState,
      showLogin: !prevState.showLogin,
      email: '',
      password: '',
    }));
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlingLoginAction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    const users = Userservice.getUsers();
    const user = users.find((n) => n.EmailId === email && n.password === password);

    if (user) {
      if (user.role === 'Admin' || user.role === 'admin') {
        role(user.role, users);
        navigate('/LaunchPage');
      } else {
        const departmentsCount: Record<string, number> = {};
        const rolesCount: Record<string, number> = {};

        users.forEach((user) => {
          const { department, role } = user;
          departmentsCount[department] = (departmentsCount[department] || 0) + 1;
          rolesCount[role] = (rolesCount[role] || 0) + 1;
        });

        role(user.role, [departmentsCount, rolesCount]);
        navigate('/LaunchPage');
      }
    } else {
      // Display a login failure toast message
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handlingSignupAction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // Create a new user object for signup
    const newUser = {
      id: Userservice.getUsers().length + 1,
      name: name,
      department: 'IT', 
      EmailId: email,
      password: password,
      role: 'User',
      status: 'Active', 
    };

    // Add the new user to the service
    Userservice.addUser(newUser);

    // Assuming you want to log in the user after signup
    role(newUser.role, Userservice.getUsers());
    navigate('/LaunchPage');
  };

  const { showLogin, email, password, name } = formData;

  return (
    <>
      {/* Toast Container */}
      <ToastContainer />

      <div className="navbar">
        <header className="header">
          <h3>DEVELOPER TASK</h3>
        </header>
      </div>
      <div className='container-body'>
        <div className='container'>
          <h2>{showLogin ? 'Login' : 'Signup'}</h2>
          <form onSubmit={showLogin ? handlingLoginAction : handlingSignupAction}>
            {!showLogin && (
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={name}
                  onChange={handleChangeInput}
                  placeholder='Name'
                  required
                />
              </div>
            )}
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={handleChangeInput}
                placeholder='Email'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={handleChangeInput}
                placeholder='Password'
                required
              />
            </div>
            <div className='button-container'>
              <button type='submit' className='submit-button'>
                {showLogin ? 'Login' : 'Signup'}
              </button>
              <button type='button' onClick={toggleForm} className='toggle-button'>
                {showLogin ? 'Switch to Signup' : 'Switch to Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
