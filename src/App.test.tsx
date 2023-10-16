import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';



  test("render learn react ",()=>
  {
      render(<App />);
      const linkElement = screen.getByText("Email");
      
      expect (linkElement).toBeInTheDocument();
  });