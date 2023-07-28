import axios from "axios";
import React from "react";
import styled from "styled-components";

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

interface Props {
  data: Todo[];
  onDelete: (id: number) => void;
}

const markComplete = async (id: number) => {
  try {
    await axios.patch(`http://localhost:3000/todos/markcomplete/${id}`);
    alert("Todo status updated.");
  } catch (error) {
    console.log(error);
  }
};

const TodoList: React.FC<Props> = ({ data, onDelete }) => {
  return (
    <Wrapper>
      <List>
        {data.map((todo) => (
          <ListItem key={todo.id}>
            <span>{todo.title}</span>
            <span>
              {todo.completed ? (
                <input type="checkbox" checked />
              ) : (
                <input type="checkbox" onClick={() => markComplete(todo.id)} />
              )}
            </span>
            <Button onClick={() => onDelete(todo.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 4px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;

  span:first-child {
    flex: 1;
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

export default TodoList;
