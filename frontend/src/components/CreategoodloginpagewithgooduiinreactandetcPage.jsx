jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const LoginForm = styled.form`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  &:hover {
    background-color: #0069d9;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
`;


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    //Simulate API call - replace with actual API call
    try {
      const response = await fetch('/api/login', { //Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Login failed.');
      } else {
        //Successful login - redirect or update state
        console.log('Login successful!');
        // Redirect to the next page, e.g., using useHistory hook from react-router-dom
        //  or updating application state to reflect logged-in status.
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Label htmlFor="username">Username:</Label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Login</Button>
      </LoginForm>
    </Container>
  );
};

export default LoginPage;
