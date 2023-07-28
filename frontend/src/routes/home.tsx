import axios from "axios";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styled from "styled-components";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";

interface TodoData {
  title: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
}

const initialTodoData: TodoData = {
  title: "",
};

const API_BASE_URL = "http://localhost:3000/todos";
const userId: number = 3;

const Home = () => {
  const navigate = useNavigate();
  const [todoData, setTodoData] = useState<TodoData>(initialTodoData);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (todoData.title === "") return;
    try {
      await axios.post(`${API_BASE_URL}/${userId}`, todoData);
      console.log("Todo added successfully.");
      setTodoData(initialTodoData);
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      fetchTodos();
      console.log("Todo Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all/${userId}`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("userToken"); // Clear the token from local storage
    navigate("/login"); // Redirect to the login page
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="title"
            value={todoData.title}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Add</Button>
      </Form>

      {todos.length === 0 ? (
        <Span>No Todos</Span>
      ) : (
        <TodoList data={todos} onDelete={handleDelete} />
      )}
      <Center>
        <Button onClick={logout}>Logout</Button>
      </Center>
    </div>
  );
};

const Span = styled.span`
  margin-top: 1rem;
  font-weight: 500;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 15px;
  background-color: #1a1918;
  display: flex;
  justify-content: space-evenly;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;

  &:focus {
    outline: 5px;
    border-color: #0000ff;
  }
`;

const Button = styled.button`
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
  height: 35px;
`;

// const Button = styled.button`
//   border-radius: 12px;
//   border: 2px solid transparent;
//   border-color: white;
//   padding: 0.6em 1.2em;
//   font-size: 1em;
//   font-weight: 500;
//   font-family: inherit;
//   background-color: #1a1918;
//   border-color: white;
//   cursor: pointer;
//   transition: border-color 0.25s;
//   color: white;
//   height: 35px;
//   margin: auto;
//   margin-top: 10px;
// `;

export default Home;
