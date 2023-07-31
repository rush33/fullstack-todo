import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialSignUpData: SignUpData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState<SignUpData>(initialSignUpData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form data.
    if (signUpData.firstName.length === 0) {
      alert("Please enter your first name.");
      return;
    }

    if (signUpData.lastName.length === 0) {
      alert("Please enter your last name.");
      return;
    }

    if (
      !/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(signUpData.email)
    ) {
      alert("Please enter a valid email address.");
      return;
    }

    // Submit the form data to the server
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        signUpData
      );

      if (response.data) {
        console.log(response?.data);
        localStorage.setItem("userId", JSON.stringify(response?.data?.id));
        alert("User created successfully")
      }
      navigate("/");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="firstName">First Name:</Label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          value={signUpData.firstName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="lastName">Last Name:</Label>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          value={signUpData.lastName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={signUpData.email}
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
          value={signUpData.password}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <SubmitButton type="submit">Submit</SubmitButton>
      <div>
        Have an account? <Link to="/login">Login</Link> here{" "}
      </div>
    </Form>
  );
};

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
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

export default SignUpForm;
