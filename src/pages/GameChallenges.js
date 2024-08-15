import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaTrophy, FaClock, FaMedal, FaSearch, FaPlus, FaGamepad } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background-color: #f0f2f5;
    color: #1c1e21;
  }
`;

const GameChallengesWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1877f2;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CreateChallengeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #166fe5;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: #1c1e21;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`;

const ChallengesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ChallengeCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ChallengeName = styled.h3`
  color: #1c1e21;
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`;

const ChallengeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #65676b;
  font-size: 14px;
  margin-bottom: 4px;
`;

const JoinButton = styled.button`
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  margin-top: 12px;

  &:hover {
    background-color: #166fe5;
  }
`;

const GameChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const generateMockChallenges = useCallback(() => {
    return [
      { id: 1, name: 'Speed Run Challenge', game: 'Adventure Quest', timeLeft: '2 days', reward: '1000 coins' },
      { id: 2, name: 'High Score Challenge', game: 'Puzzle Mania', timeLeft: '1 week', reward: 'Exclusive Avatar' },
      { id: 3, name: 'Multiplayer Tournament', game: 'Strategy Master', timeLeft: '3 days', reward: 'Champion Trophy' },
      { id: 4, name: 'Boss Rush Challenge', game: 'Epic RPG', timeLeft: '5 days', reward: 'Legendary Weapon' },
      { id: 5, name: 'Time Attack Mode', game: 'Racing Fever', timeLeft: '4 days', reward: 'Custom Car Skin' },
      { id: 6, name: 'Survival Challenge', game: 'Zombie Outbreak', timeLeft: '6 days', reward: 'Unique Character' },
      { id: 7, name: 'Puzzle Master', game: 'Brain Teasers', timeLeft: '1 day', reward: '500 gems' },
      { id: 8, name: 'PvP Arena', game: 'Battle Royale', timeLeft: '2 weeks', reward: 'Rare Weapon Skin' },
      { id: 9, name: 'Endless Runner', game: 'Jungle Dash', timeLeft: '3 days', reward: 'Double XP Boost' },
      { id: 10, name: 'Treasure Hunt', game: "Pirate's Quest", timeLeft: '5 days', reward: 'Golden Compass' },
      { id: 11, name: 'Tower Defense', game: 'Kingdom Guard', timeLeft: '1 week', reward: 'Legendary Tower' },
      { id: 12, name: 'Stealth Mission', game: 'Shadow Ops', timeLeft: '4 days', reward: 'Invisibility Cloak' },
      { id: 13, name: 'Ultimate Speed Run', game: 'Cyber Quest', timeLeft: '3 days', reward: '5000 coins' },
      { id: 14, name: 'Combo Master Challenge', game: 'Fighter Arena', timeLeft: '2 days', reward: 'Exclusive Fighter Skin' },
      { id: 15, name: 'Mega Boss Fight', game: 'Monster Hunter', timeLeft: '1 week', reward: 'Epic Sword' },
      { id: 16, name: 'Endurance Race', game: 'Super Racer', timeLeft: '4 days', reward: 'Nitro Boost' },
      { id: 17, name: 'Treasure Hoard', game: 'Dragon’s Den', timeLeft: '5 days', reward: 'Dragon Egg' },
      { id: 18, name: 'Survival Mode', game: 'Alien Invasion', timeLeft: '6 days', reward: 'Plasma Cannon' },
      { id: 19, name: 'Mind Bender Challenge', game: 'Mystery Puzzles', timeLeft: '2 days', reward: '1000 gems' },
      { id: 20, name: 'King of the Hill', game: 'Battle Zone', timeLeft: '1 week', reward: 'Crown of Glory' },
      { id: 21, name: 'Speed Demon', game: 'Turbo Drift', timeLeft: '3 days', reward: 'Supercar' },
      { id: 22, name: 'Warrior’s Gauntlet', game: 'Ancient Battles', timeLeft: '5 days', reward: 'Warrior’s Shield' },
      { id: 23, name: 'Sniper Challenge', game: 'Sharp Shooter', timeLeft: '4 days', reward: 'Golden Rifle' },
      { id: 24, name: 'Dungeon Crawl', game: 'Cave Explorer', timeLeft: '3 days', reward: 'Treasure Map' },
      { id: 25, name: 'Defense Strategy', game: 'Fortress Builder', timeLeft: '1 week', reward: 'Ultimate Tower' },
      { id: 26, name: 'Arena Showdown', game: 'Gladiator Wars', timeLeft: '2 weeks', reward: 'Champion’s Helmet' },
      { id: 27, name: 'Escape the Maze', game: 'Labyrinth Escape', timeLeft: '3 days', reward: 'Compass of Truth' },
      { id: 28, name: 'Hero’s Journey', game: 'Epic Quest', timeLeft: '5 days', reward: 'Hero’s Medal' },
      { id: 29, name: 'Nightmare Mode', game: 'Horror Tales', timeLeft: '6 days', reward: 'Fearless Badge' },
      { id: 30, name: 'Puzzle Genius', game: 'Mind Games', timeLeft: '2 days', reward: '2000 gems' },
      { id: 31, name: 'Time Traveler', game: 'Chrono Quest', timeLeft: '1 week', reward: 'Temporal Artifact' },
      { id: 32, name: 'Battle Royale', game: 'Warzone Alpha', timeLeft: '2 weeks', reward: 'Victory Crown' },
      { id: 33, name: 'Climbing Challenge', game: 'Mountain Climber', timeLeft: '3 days', reward: 'Summit Flag' },
      { id: 34, name: 'Space Explorer', game: 'Galactic Odyssey', timeLeft: '5 days', reward: 'Space Helmet' },     
      // ... (add more mock challenges as needed)
    ];
  }, []);

  useEffect(() => {
    setChallenges(generateMockChallenges());
  }, [generateMockChallenges]);

  const handleJoinChallenge = useCallback((challengeId) => {
    console.log(`Joined challenge ${challengeId}`);
    // Implement join challenge logic here
  }, []);

  const handleCreateChallenge = useCallback(() => {
    console.log('Create new challenge');
    // Implement challenge creation logic here
  }, []);

  const filteredChallenges = useMemo(() => 
    challenges.filter(challenge =>
      (challenge.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.game?.toLowerCase().includes(searchTerm.toLowerCase())) ?? false
    ),
    [challenges, searchTerm]
  );

  return (
    <>
      <GlobalStyle />
      <GameChallengesWrapper>
        <Header>
          <FaTrophy />
          Game Challenges
        </Header>
        <ActionsBar>
          <CreateChallengeButton onClick={handleCreateChallenge}>
            <FaPlus /> Create New Challenge
          </CreateChallengeButton>
          <SearchBar>
            <FaSearch color="#65676b" />
            <SearchInput
              type="text"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </ActionsBar>
        <ChallengesGrid>
          {filteredChallenges.map(challenge => (
            <ChallengeCard key={challenge.id}>
              <ChallengeName>{challenge.name}</ChallengeName>
              <ChallengeInfo>
                <FaGamepad /> {challenge.game}
              </ChallengeInfo>
              <ChallengeInfo>
                <FaClock /> {challenge.timeLeft} left
              </ChallengeInfo>
              <ChallengeInfo>
                <FaMedal /> Reward: {challenge.reward}
              </ChallengeInfo>
              <JoinButton onClick={() => handleJoinChallenge(challenge.id)}>
                Join Challenge
              </JoinButton>
            </ChallengeCard>
          ))}
        </ChallengesGrid>
      </GameChallengesWrapper>
    </>
  );
};

export default GameChallenges;