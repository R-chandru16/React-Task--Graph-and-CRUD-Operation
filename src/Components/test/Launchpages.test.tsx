import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { LaunchPage } from '../LaunchPage/LaunchPage'; // Make sure to import the component correctly

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('LaunchPage Component', () => {
  it('renders a user dashboard', () => {
    const data: never[] = []; // Provide mock data here
    const role = 'User'; // Set the user role
    render(<LaunchPage data={data} role={role} />);
    
    // Assert that the user dashboard elements are present
    expect(screen.getByText('User-DashBoard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    // Add more assertions as needed for user dashboard specific elements
  });

  it('renders an admin dashboard', () => {
    const data: never[] = []; // Provide mock data here
    const role = 'Admin'; // Set the admin role
    render(<LaunchPage data={data} role={role} />);
    
    // Assert that the admin dashboard elements are present
    expect(screen.getByText('Admin-DashBoard')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    // Add more assertions as needed for admin dashboard specific elements
  });

  it('opens the modal for adding a user', () => {
    const data: never[] = []; // Provide mock data here
    const role = 'Admin'; // Set the admin role
    render(<LaunchPage data={data} role={role} />);
    
    const addButton = screen.getByText('Create');
    fireEvent.click(addButton);
    
    // Assert that the modal is opened for adding a user
    expect(screen.getByText('Add User')).toBeInTheDocument();
    // Add more assertions to ensure the modal content is rendered as expected
  });

  it('opens the modal for editing a user', () => {
    const data: never[] = []; // Provide mock data here
    const role = 'Admin'; // Set the admin role
    render(<LaunchPage data={data} role={role} />);
    
    // Simulate a click on the "Edit user" button (replace 'user-id' with a valid user ID)
    fireEvent.click(screen.getByText('Edit user'));
    
    // Assert that the modal is opened for editing a user
    expect(screen.getByText('Edit User')).toBeInTheDocument();
    // Add more assertions to ensure the modal content is rendered as expected
  });

 
});
