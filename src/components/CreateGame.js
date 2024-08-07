import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

const CreateGame = ({ onGameCreated }) => {
  const [gameData, setGameData] = useState({
    title: '',
    description: '',
    gameType: 'quiz' // Default game type
  });

  const handleChange = (e) => {
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post('http://localhost:3001/games', {
        ...gameData,
        creatorId: userId
      });
      onGameCreated(response.data);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create New Game</h2>
      <Input
        type="text"
        name="title"
        value={gameData.title}
        onChange={handleChange}
        placeholder="Game Title"
        required
      />
      <TextArea
        name="description"
        value={gameData.description}
        onChange={handleChange}
        placeholder="Game Description"
        required
      />
      <select name="gameType" value={gameData.gameType} onChange={handleChange}>
        <option value="quiz">Quiz</option>
        <option value="puzzle">Puzzle</option>
        <option value="adventure">Adventure</option>
      </select>
      <Button type="submit">Create Game</Button>
    </Form>
  );
};

export default CreateGame;