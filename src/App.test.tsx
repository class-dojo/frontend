import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders learn react link', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const uploadButton = screen.getByText('TRY NOW');
  expect(uploadButton).toBeInTheDocument();
});
