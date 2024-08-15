import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaGem, FaStar, FaLock, FaSearch, FaFilter, FaPlus } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background-color: #f0f2f5;
    color: #1c1e21;
  }
`;

const CollectiblesWrapper = styled.div`
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

const CreateCollectibleButton = styled.button`
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

const FilterSelect = styled.select`
  padding: 8px 16px;
  border: 1px solid #dddfe2;
  border-radius: 6px;
  background-color: #ffffff;
  color: #1c1e21;
  font-size: 14px;
  margin-left: 10px;
`;

const CollectibleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CollectibleCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  text-align: center;
  position: relative;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const CollectibleIcon = styled.div`
  font-size: 2rem;
  color: ${({ obtained }) => obtained ? '#1877f2' : '#65676b'};
  margin-bottom: 8px;
`;

const CollectibleName = styled.h3`
  color: #1c1e21;
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
`;

const CollectibleRarity = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  color: #f1c40f;
`;

const LockedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const GameCollectibles = () => {
  const [collectibles, setCollectibles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const generateMockCollectibles = useCallback(() => {
    // This function will be replaced with actual API call when connecting to a real server
    return [
      { id: 1, name: 'Golden Sword', rarity: 5, obtained: true },
      { id: 2, name: 'Magic Amulet', rarity: 4, obtained: true },
      { id: 3, name: 'Dragon Egg', rarity: 5, obtained: false },
      { id: 4, name: 'Ancient Scroll', rarity: 3, obtained: true },
      { id: 5, name: 'Mystic Orb', rarity: 4, obtained: false },
      { id: 6, name: 'Phoenix Feather', rarity: 5, obtained: false },
      { id: 7, name: 'Enchanted Bow', rarity: 4, obtained: true },
      { id: 8, name: 'Wizard Staff', rarity: 5, obtained: false },
      { id: 9, name: 'Invisibility Cloak', rarity: 5, obtained: true },
      { id: 10, name: 'Healing Potion', rarity: 2, obtained: true },
      { id: 11, name: 'Dragonscale Armor', rarity: 5, obtained: false },
      { id: 12, name: 'Flaming Sword', rarity: 4, obtained: true },
      { id: 13, name: 'Ice Crown', rarity: 5, obtained: false },
      { id: 14, name: 'Shadow Dagger', rarity: 4, obtained: true },
      { id: 15, name: 'Philosopher Stone', rarity: 5, obtained: false },
      { id: 16, name: 'Winged Boots', rarity: 3, obtained: true },
      { id: 17, name: 'Cursed Ring', rarity: 4, obtained: false },
      { id: 18, name: 'Mermaid Pearl', rarity: 4, obtained: true },
      { id: 19, name: 'Unicorn Horn', rarity: 5, obtained: false },
      { id: 20, name: 'Goblin Gold', rarity: 3, obtained: true },
      { id: 21, name: 'Fairy Dust', rarity: 3, obtained: true },
      { id: 22, name: 'Titan Gauntlet', rarity: 5, obtained: false },
      { id: 23, name: 'Elven Locket', rarity: 4, obtained: true },
      { id: 24, name: 'Dwarven Hammer', rarity: 4, obtained: false },
      { id: 25, name: 'Siren Flute', rarity: 4, obtained: true },
      { id: 26, name: 'Pegasus Feather', rarity: 5, obtained: false },
      { id: 27, name: 'Vampire Fang', rarity: 3, obtained: true },
      { id: 28, name: 'Werewolf Claw', rarity: 3, obtained: false },
      { id: 29, name: 'Gorgon Eye', rarity: 5, obtained: false },
      { id: 30, name: 'Phoenix Ash', rarity: 4, obtained: true },
    ];
  }, []);

  useEffect(() => {
    setCollectibles(generateMockCollectibles());
  }, [generateMockCollectibles]);

  const handleCreateCollectible = useCallback(() => {
    console.log('Create new collectible');
    // Implement collectible creation logic here
  }, []);

  const filteredCollectibles = useMemo(() => 
    collectibles.filter(collectible => 
      collectible.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === 'all' || (filter === 'obtained' && collectible.obtained) || (filter === 'locked' && !collectible.obtained))
    ),
    [collectibles, searchTerm, filter]
  );

  return (
    <>
      <GlobalStyle />
      <CollectiblesWrapper>
        <Header>
          <FaGem />
          Game Collectibles
        </Header>
        <ActionsBar>
          <CreateCollectibleButton onClick={handleCreateCollectible}>
            <FaPlus /> Create New Collectible
          </CreateCollectibleButton>
          <SearchBar>
            <FaSearch color="#65676b" />
            <SearchInput
              type="text"
              placeholder="Search collectibles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Collectibles</option>
              <option value="obtained">Obtained</option>
              <option value="locked">Locked</option>
            </FilterSelect>
          </SearchBar>
        </ActionsBar>
        <CollectibleGrid>
          {filteredCollectibles.map((collectible) => (
            <CollectibleCard key={collectible.id}>
              <CollectibleIcon obtained={collectible.obtained}>
                <FaGem />
              </CollectibleIcon>
              <CollectibleName>{collectible.name}</CollectibleName>
              <CollectibleRarity>
                {[...Array(collectible.rarity)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </CollectibleRarity>
              {!collectible.obtained && (
                <LockedOverlay>
                  <FaLock size={24} color="white" />
                </LockedOverlay>
              )}
            </CollectibleCard>
          ))}
        </CollectibleGrid>
      </CollectiblesWrapper>
    </>
  );
};

export default GameCollectibles;