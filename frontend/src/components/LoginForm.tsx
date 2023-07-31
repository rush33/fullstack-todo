import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface LoginData {
  email: string;
  password: string;
}

const initialLoginData: LoginData = {
  email: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>(initialLoginData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (
      !/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(loginData.email)
    ) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const loginResponse = await axios.post(
        "http://localhost:3000/auth/login",
        JSON.stringify(loginData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (loginResponse.data) {
        const token = loginResponse?.data?.access_token;
        localStorage.setItem("userToken", JSON.stringify(token));

        const profileResponse = await axios.get(
          "http://localhost:3000/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        localStorage.setItem(
          "userId",
          JSON.stringify(profileResponse?.data?.sub)
        );
      }

      navigate("/");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Submit</SubmitButton>
        <div>
          Don't have an account? <Link to="/register">Register</Link> here{" "}
        </div>
      </Form>
    </>
  );
};

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 15px;
  background-color: #1a1918;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  border-radius: 12px;
  border: 2px solid transparent;
  border-color: white;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1918;
  border-color: white;
  cursor: pointer;
  transition: border-color 0.25s;
  color: white;
`;

export default LoginForm;
