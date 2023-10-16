import React from 'react';
import { render, fireEvent, getByText, getAllByPlaceholderText, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from '../LoginPage/LoginPage';

const users = [
    { EmailId: 'chan@gmail.com', password: 'Admin@1234', role: 'Admin' },
    { EmailId: 'arun@gmail.com', password: 'Arun@1234', role: 'User' },
  ];
  
describe('LoginPage Component', () => {
    it('renders the Login form by default', () => {
      const { getByText, getByPlaceholderText } = render(<LoginPage role={() => {}} />);
  
      
      expect(getByPlaceholderText('Email')).toBeInTheDocument();
      expect(getByPlaceholderText('Password')).toBeInTheDocument();

      expect(getByText('Switch to Signup')).toBeInTheDocument();
    });
  
   
  });
  
  it('renders the Signup form when the "Switch to Signup" button is clicked', () => {
    const { getByText, getByPlaceholderText } = render(<LoginPage role={() => {}} />);
    const switchButton = getByText('Switch to Signup');

    fireEvent.click(switchButton);

    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  
    expect(getByText('Switch to Login')).toBeInTheDocument();
  });
  
 
  it('calls the handlingLoginAction function when the Login form is submitted with valid credentials', async () => {
    const roleMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(<LoginPage role={roleMock} />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'chan@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Admin@123' } });

 
    
  });
    
  it('displays an error message when login is attempted with invalid credentials', async () => {
    const roleMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(<LoginPage role={roleMock} />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Login');
  
    fireEvent.change(emailInput, { target: { value: 'invalid@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
  
    fireEvent.click(submitButton);
  
    // You can assert that an error message element is displayed here.
    expect(getByText('Invalid credentials. Please try again.')).toBeInTheDocument();
  });
  
    
  it('switches from Login to Signup form when "Switch to Signup" is clicked', () => {
    const { getByText, getByPlaceholderText } = render(<LoginPage role={() => {}} />);
    const switchButton = getByText('Switch to Signup');
  
    fireEvent.click(switchButton);
  
    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByText('Switch to Login')).toBeInTheDocument();
  });
  
  it('switches from Signup to Login form when "Switch to Login" is clicked', () => {
    const { getByText, getByPlaceholderText } = render(<LoginPage role={() => {}} />);
    const switchButton = getByText('Switch to Signup');
  
    fireEvent.click(switchButton); // Switch to Signup form
    const switchToLoginButton = getByText('Switch to Login');
  
    fireEvent.click(switchToLoginButton);
  
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Switch to Signup')).toBeInTheDocument();
  });
  
    
  
  
