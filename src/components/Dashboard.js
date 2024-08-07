import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  padding: 20px;
`;

const UserProfile = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
`;

const Feed = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
`;

const GameSection = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const CreateGame = ({ onGameCreated }) => {
  const [gameData, setGameData] = useState({
    title: '',
    description: '',
    gameType: 'quiz'
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
    <form onSubmit={handleSubmit}>
      <h2>Create New Game</h2>
      <input
        type="text"
        name="title"
        value={gameData.title}
        onChange={handleChange}
        placeholder="Game Title"
        required
      />
      <textarea
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
    </form>
  );
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);
  const [showCreateGame, setShowCreateGame] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
          setUser(userResponse.data);

          const postsResponse = await axios.get(`http://localhost:3001/posts?userId=${userId}`);
          setPosts(postsResponse.data);

          const gamesResponse = await axios.get(`http://localhost:3001/games?creatorId=${userId}`);
          setGames(gamesResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, []);

  const handleCreateGame = () => {
    setShowCreateGame(true);
  };

  const handleGameCreated = (newGame) => {
    setGames([...games, newGame]);
    setShowCreateGame(false);
  };

  return (
    <DashboardContainer>
      <UserProfile>
        <h2>User Profile</h2>
        {user && (
          <>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </>
        )}
      </UserProfile>

      <Feed>
        <h2>Social Feed</h2>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </Feed>

      <GameSection>
        <h2>My Games</h2>
        {games.map(game => (
          <div key={game.id}>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
          </div>
        ))}
        <Button onClick={handleCreateGame}>Create New Game</Button>
      </GameSection>

      {showCreateGame && (
        <Modal>
          <ModalContent>
            <CreateGame onGameCreated={handleGameCreated} />
            <Button onClick={() => setShowCreateGame(false)}>Cancel</Button>
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;